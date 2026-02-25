<?php

namespace App\Models;

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
