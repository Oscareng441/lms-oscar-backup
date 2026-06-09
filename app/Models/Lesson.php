<?php

namespace App\Models;

use App\Models\LessonSet;
use App\Models\Problem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Lesson extends Model
{
    protected $fillable = [
        'name',
        'short_name',
        'lesson_type',
        'lesson_text',
        'lesson_page',
        'lesson_set_id',
        'sequence_id',
        'active',
    ];

    /**
     * Relationship: Parent lesson set for this lesson.
     * Supports eager-loading sidebar optimization (Phase 1).
     */
    public function lessonSet()
    {
        return $this->belongsTo(LessonSet::class, 'lesson_set_id');
    }

    /**
     * Relationship: Active problems in this lesson.
     * Used by eager-loading sidebar optimization (Phase 1, 2026-06-08).
     * Filters to active=1 and orders by sequence_id, then id.
     * Essential for reducing N+1 queries in sidebar generation.
     */
    public function problems()
    {
        return $this->hasMany(Problem::class, 'lesson_id')
            ->where('active', 1)
            ->orderBy('sequence_id')
            ->orderBy('id');
    }

    function getNeighboringLessonIds()
    {
        $sql = 'SELECT id FROM lessons WHERE (sequence_id > ? OR sequence_id = ? AND id > ?) AND lesson_set_id = ? and active = 1 ORDER BY sequence_id, id';
        $rec = DB::select($sql, [$this->sequence_id, $this->sequence_id, $this->id, $this->lesson_set_id]);
        $nextLessonId = empty($rec) ? null :  $rec[0]->id;
        $sql = 'SELECT id FROM lessons WHERE (sequence_id < ? OR sequence_id = ? AND id < ?) AND lesson_set_id = ? and active = 1 ORDER BY sequence_id desc, id desc';
        $rec = DB::select($sql, [$this->sequence_id, $this->sequence_id, $this->id, $this->lesson_set_id]);
        $previousLessonId = empty($rec) ? null : $rec[0]->id;

        return ['anterior' => $previousLessonId, 'siguiente' => $nextLessonId];
    }

    function videos()
    {
        $sql = 'SELECT * FROM videos WHERE lesson_id = ?';
        $vids = DB::select($sql, [$this->id]);
        return $vids;
    }

    public function saveVideos($videos)
    {
        $tbl = 'z_videos_'.rand();

        $sql = '
        CREATE TABLE '.$tbl.' (
          `id` bigint unsigned NOT NULL AUTO_INCREMENT,
          `video_id` bigint DEFAULT NULL,
          `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
          `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
          `lesson_id` bigint unsigned NOT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB;';

        DB::statement($sql);

        if (!empty($videos)) {

            $placeholders = [];
            $params = [];

            foreach ($videos as $video) {
                $placeholders[] = '(?,?,?,?)';
                $params[] = str_contains($video['id'], 'T') ? NULL : $video['id'];
                $params[] = $video['name'];
                $params[] = $video['url'];
                $params[] = $video['lesson_id'];
            }

            $sql = '
            INSERT INTO '.$tbl.'
            (`video_id`,`name`,`url`,`lesson_id`)
            VALUES
            ' . implode(',', $placeholders);

            DB::insert($sql, $params);

            $sql = '
            INSERT INTO videos
            (`id`,`name`,`url`,`lesson_id`)
            SELECT `video_id`,`name`,`url`,`lesson_id`
            FROM ' . $tbl . '
            ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            url = VALUES(url),
            lesson_id = VALUES(lesson_id)';

            DB::insert($sql);
        }

        $sql = '
        DELETE V FROM videos V
        LEFT JOIN ' . $tbl . ' T ON V.lesson_id = T.lesson_id AND V.name = T.name
        WHERE T.id IS NULL';

        DB::delete($sql);

        $sql = '
        DROP TABLE IF EXISTS ' . $tbl;

        DB::statement($sql);        
    }

    public function saveKeywords($kw)
    {
        preg_match_all('/\w+|"[^"]+"/', $kw, $arr);
        $placeholders = [];
        foreach ($arr[0] as $a) {
            $placeholders[] = '(?,?)';
            $params[] = $a;
            $params[] = $this->id;
        }

        if (!empty($placeholders)) {
            $sql = '
            DELETE FROM lesson_keywords WHERE lesson_id = ?';

            DB::delete($sql, [$this->id]);
        }

        if (!empty($placeholders)) {
            $sql = '
            INSERT IGNORE INTO lesson_keywords
            (keyword, lesson_id)
            VALUES
            ' . implode(', ', $placeholders);

            DB::insert($sql, $params);
        }
    }

    public function getMyKeywords()
    {
        $sql = 'SELECT * FROM lesson_keywords where lesson_id = ? ORDER BY keyword';
        $recs = DB::select($sql, [$this->id]);
        $ret = [];
        foreach ($recs as $rec) {
            $ret[] = $rec->keyword;
        }

        return $ret;
    }

    public function okToDelete()
    {
        $sql = '
        SELECT count(*) as ct
        from results R
        INNER JOIN problems P ON R.problem_id = P.id
        WHERE P.lesson_id = ?';

        $rec = DB::selectOne($sql, [$this->id]);

        return $rec->ct == 0;
    }
}
