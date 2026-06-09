<?php

namespace App\Models;

use App\Models\LessonSet;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Helpers\OmniHelper;

class Course extends Model
{
    protected $fillable = [
        'name',
        'short_name',
        'description',
        'active',
    ];

    /**
     * Relationship: Active lesson sets for this course.
     * Used by eager-loading sidebar optimization (Phase 1, 2026-06-08).
     * Filters to active=1 and orders by sequence_id, then id.
     * Essential for reducing N+1 queries in sidebar generation.
     */
    public function lessonSets()
    {
        return $this->hasMany(LessonSet::class, 'course_id')
            ->where('active', 1)
            ->orderBy('sequence_id')
            ->orderBy('id');
    }

    public function getMyChapters($activeOnly = true)
    {
        $activeClause = $activeOnly ? 'and active = 1' : '';
        $sql = 'SELECT * FROM lesson_sets where course_id = ? ' . $activeClause;
        $recs = DB::select($sql, [$this->id]);
        return $recs;
    }

    public function getMyKeywords()
    {
        $sql = 'SELECT * FROM course_keywords where course_id = ? ORDER BY keyword';
        $recs = DB::select($sql, [$this->id]);
        $ret = [];
        foreach ($recs as $rec) {
            $ret[] = $rec->keyword;
        }

        return $ret;
    }

    public function getGroups($userId = null)
    {
        $userFilter = $userId ? ' AND owner_id = ? ' : '';
        $args = [$this->id];
        if ($userId) {
            $args[] = $userId;
        }
        $sql = '
        SELECT * FROM student_groups 
        WHERE course_id = ? ' . $userFilter .'
        ORDER BY name desc
        ';

        $recs = DB::select($sql, $args);

        return $recs;
    }

    public function getGroupsAndStudents($userId = null)
    {
        $userFilter = $userId ? ' AND owner_id = ? ' : '';
        $args = [$this->id];
        if ($userId) {
            $args[] = $userId;
        }
        $sql = '
        SELECT G.* FROM student_groups G
        LEFT JOIN student_group_user U ON U.student_group_id = G.id
        WHERE G.course_id = ? ' . $userFilter .'
        ORDER BY name desc
        ';

        $recs = DB::select($sql, $args);

        return $recs;
    }

    public function getStudentScores($groupId, $studentId)
    {
        $whereUser = $studentId ? 'AND U.id = ?' : '';
        $params = [$this->id, $groupId];
        if ($studentId) {
            $params[] = $studentId;
        }
        $sql = '
        SELECT LS.name as chapterName, LS.id as chapterId, U.id as userId, U.name as userName, avg(score) as userScore, sum(IF(S.id IS NULL, 0, 1)) as problemsDone, count(P.id) as numProblems, LS.sequence_id + LS.id / 10000 as sortKey
        FROM users U
        CROSS JOIN courses C
        INNER JOIN lesson_sets LS ON C.id = LS.course_id
        INNER JOIN lessons L ON LS.id = L.lesson_set_id
        INNER JOIN problems P ON L.id = P.lesson_id
        INNER JOIN student_group_user SGU ON SGU.user_id = U.id
        INNER JOIN student_groups SG ON SG.id = SGU.student_group_id
        LEFT JOIN problem_scores S ON S.problem_id = P.id AND S.user_id = U.id
        WHERE C.id = ? ' . $whereUser . ' AND SG.id = ? AND P.active = 1 AND LS.active = 1 AND L.active = 1
        GROUP BY LS.id, U.id';

        $recs = DB::select($sql, $params);

        return $recs;
    }

    public static function getSearchResults($srch)
    {
        preg_match_all('/[^\s]+|"[^"]+"/', $srch, $tokens);
        $params = [];
        $p = []; // temp param holder
        $wi = []; // where inner
        $wo = []; // where outer
        $finalWhere = [];
        $cats = [
            'course' => ['name', 'description'],
            'kcourse' => ['keyword'],
            'chapter' => ['name', 'short_name'],
            'kchapter' => ['keyword'],
            'lesson' => ['name', 'short_name'],
            'klesson' => ['keyword'],
            'problem' => ['name'],
            'kproblem' => ['keyword'],
        ];
        foreach ($cats as $k => $dummy) {
            $wo[$k] = [];
            $p[$k] = [];
        }
        foreach ($tokens[0] as $token) {
            $token = str_replace('"', '', $token);
            foreach ($cats as $k => $cols) {
                $wi[$k] = [];
                foreach ($cols as $col) {
                    $wi[$k][] = $col.' LIKE ?';
                    $p[$k][] = '%'.$token.'%';
                }
            }
            foreach ($cats as $k => $dummy) {
                $wo[$k][] = '('.implode(' OR ', $wi[$k]).')';
            }
        }

        foreach ($cats as $k => $dummy) {
            $finalWhere[$k] = '('.implode(' AND ', $wo[$k]).')';
            $params = array_merge($params, $p[$k]);
        }

        $sql = '
        SELECT id, name, description, "course" AS link_type FROM courses WHERE active = 1 AND ' . $finalWhere['course'] . '
        UNION
        SELECT course_id AS id, name, description, "course" AS link_type FROM course_keywords K INNER JOIN courses C ON C.id = K.course_id WHERE active = 1 AND ' . $finalWhere['kcourse'] . '
        UNION
        SELECT id, name, "" as description, "chapter" AS link_type FROM lesson_sets WHERE active = 1 AND ' . $finalWhere['chapter'] . '
        UNION
        SELECT chapter_id AS id, name, "" AS description, "chapter" AS link_type FROM chapter_keywords K INNER JOIN lesson_sets C ON C.id = K.chapter_id WHERE active = 1 AND ' . $finalWhere['kchapter'] . '
        UNION
        SELECT id, name, "" as description, "lesson" AS link_type FROM lessons WHERE active = 1 AND ' . $finalWhere['lesson'] . '
        UNION
        SELECT lesson_id AS id, name, "" AS description, "lesson" AS link_type FROM lesson_keywords K INNER JOIN lessons C ON C.id = K.lesson_id WHERE active = 1 AND ' . $finalWhere['klesson'] . '
        UNION
        SELECT id, name, "" as description, "problem" AS link_type FROM problems WHERE active = 1 AND ' . $finalWhere['problem'] . '
        UNION
        SELECT problem_id AS id, name, "" AS description, "problem" AS link_type FROM problem_keywords K INNER JOIN problems C ON C.id = K.problem_id WHERE active = 1 AND ' . $finalWhere['kproblem'] . '
        ';

        return DB::select($sql, $params);
    }

    public function saveKeywords($kw)
    {
        preg_match_all('/\w+|"[^"]+"/', $kw, $arr);
        OmniHelper::log($arr);
        $placeholders = [];
        foreach ($arr[0] as $a) {
            $placeholders[] = '(?,?)';
            $params[] = $a;
            $params[] = $this->id;
        }

        if (!empty($placeholders)) {
            $sql = '
            DELETE FROM course_keywords WHERE course_id = ?';

            DB::delete($sql, [$this->id]);
        }

        if (!empty($placeholders)) {
            $sql = '
            INSERT IGNORE INTO course_keywords
            (keyword, course_id)
            VALUES
            ' . implode(', ', $placeholders);

            DB::insert($sql, $params);
        }
    }
}
