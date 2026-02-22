<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Helpers\OmniHelper;

class Problem extends Model
{
    protected $fillable = [
        'name',
        'lesson_id',
        'problem_type_id',
        'sequence_id',
        'problem_text',
        'display_type',
        'credit_id',
        'is_premium',
        'active',
    ];

    public function getAnswers()
    {
        switch ($this->problem_type_id) {
            case 1:
            case 2:
                $sql = '
                SELECT * FROM answer_sets
                WHERE problem_id = ? and active = 1';
                break;
            case 3:
                $sql = '
                SELECT id, answer AS answer_text, 1 as is_correct, pct_tolerance, problem_id FROM open_answers_alpha
                WHERE problem_id = ?';
                break;
            case 4:
                $sql = '
                SELECT id, TRIM(TRAILING "0" FROM answer) AS answer_text, 1 as is_correct, pct_tolerance, problem_id FROM open_answers_numeric
                WHERE problem_id = ?';
                break;
            case 5:
                $sql = '
                SELECT problem_id, answer_text, is_correct, position as slot, display_type from ordered_answers
                WHERE problem_id = ?';
                break;
            default:
                throw new Exception("UNKNOWN PROBLEM_TYPE_ID");
            
        }
        $rec = DB::select($sql, [$this->id]);
        if (empty($rec)) {
            return [];
        }

        return $rec;
    }

    public function deleteAnswers()
    {
        $sql = '
        DELETE FROM answer_sets
        WHERE problem_id = ?';
        $rec = DB::delete($sql, [$this->id]);
    }

    public function getHints()
    {
        $sql = '
        SELECT * FROM problem_hints
        WHERE problem_id = ?
        ORDER BY sequence_id, id';
        $rec = DB::select($sql, [$this->id]);
        if (empty($rec)) {
            return [];
        }

        return $rec;
    }

    public function deleteHints()
    {
        $sql = '
        DELETE FROM problem_hints
        WHERE problem_id = ?';
        $rec = DB::delete($sql, [$this->id]);
    }

    public function getUserScore($userId)
    {
        $sql = '
        SELECT * FROM problem_scores
        WHERE problem_id = ? AND user_id = ?';
        $rec = DB::select($sql, [$this->id, $userId]);
        if (empty($rec)) {
            return null;
        }

        return (float)$rec[0]->score;
    }

    public function getLessonTitle()
    {
        $sql = '
        SELECT L.name FROM problems P
        INNER JOIN lessons L ON P.lesson_id = L.id
        WHERE P.id = ?';
        $rec = DB::select($sql, [$this->id]);
        if (empty($rec)) {
            return null;
        }

        return $rec[0]->name;
    }

    public function getNextProblemId()
    {
        $sql = 'SELECT id FROM problems WHERE (sequence_id > ? OR id > ?) AND lesson_id = ? and active = 1 ORDER BY id';
        $rec = DB::select($sql, [$this->sequence_id, $this->id, $this->lesson_id]);
        if (empty($rec)) {
            return null;
        }

        return $rec[0]->id;
    }

    public function getNeighboringProblemIds($userId)
    {
        $sql = '
        SELECT P.id 
        FROM problems P
        LEFT JOIN problem_scores S ON S.problem_id = P.id AND S.user_id = ?
        WHERE S.id IS NULL
            AND (sequence_id > ? OR sequence_id = ? AND P.id > ?) 
            AND lesson_id = ? and active = 1
        ORDER BY sequence_id, id
        ';
        $rec = DB::select($sql, [$userId, $this->sequence_id, $this->sequence_id, $this->id, $this->lesson_id]);
        $nextProblemId = empty($rec) ? null :  $rec[0]->id;

        if (!$nextProblemId) {
            $nextProblemId = $this->getFirstProblemId($userId);
        }
        $sql = '
        SELECT P.id
        FROM problems P
        LEFT JOIN problem_scores S ON S.problem_id = P.id AND S.user_id = ?
        WHERE S.id IS NULL
            AND  (sequence_id < ? OR (sequence_id = ? AND P.id < ?))
            AND lesson_id = ? and active = 1
        ORDER BY sequence_id desc, id desc';
        $rec = DB::select($sql, [$userId, $this->sequence_id, $this->sequence_id, $this->id, $this->lesson_id]);
        $previousProblemId = empty($rec) ? null : $rec[0]->id;

        if (!$previousProblemId) {
            $previousProblemId = $this->getLastProblemId($userId);
        }

        return ['anterior' => $previousProblemId, 'siguiente' => $nextProblemId];
    }

    public function getFirstProblemId($userId)
    {
        $sql = '
        SELECT P.id 
        FROM problems P
        LEFT JOIN problem_scores S ON S.problem_id = P.id AND S.user_id = ?
        WHERE S.id IS NULL
            AND lesson_id = ? and active = 1 AND P.id != ?
        ORDER BY sequence_id, id
        ';
        $rec = DB::select($sql, [$userId, $this->lesson_id, $this->id]);
        return empty($rec) ? null :  $rec[0]->id;
    }

    public function getLastProblemId($userId)
    {
        $sql = '
        SELECT P.id 
        FROM problems P
        LEFT JOIN problem_scores S ON S.problem_id = P.id AND S.user_id = ?
        WHERE S.id IS NULL
            AND lesson_id = ? and active = 1 AND P.id != ?
        ORDER BY sequence_id DESC, id DESC
        ';
        $rec = DB::select($sql, [$userId, $this->lesson_id, $this->id]);
        return empty($rec) ? null :  $rec[0]->id;
    }

    public function ensureUserInCourse($userId)
    {
        $missingEnrollment = false;

        $sql = '
        SELECT C.id as course_id FROM problems P
        INNER JOIN lessons L ON P.lesson_id = L.id
        INNER JOIN lesson_sets LS ON L.lesson_set_id = LS.id
        INNER JOIN courses C ON LS.course_id = C.id
        WHERE P.id = ?';
        $rec = DB::select($sql, [$this->id]);
        $courseId = $rec[0]->course_id;

        $sql = '
        SELECT count(*) as ct FROM enrollments
        WHERE course_id = ? AND user_id = ?';
        $rec = DB::select($sql, [$courseId, $userId]);

        if (empty($rec) || $rec[0]->ct < 1) {
            Enrollment::enroll($userId, $courseId);
        }
    }

    public function saveOpenAnswer($ans)
    {
        if (!array_key_exists('pct_tolerance', $ans)) {
            $ans['pct_tolerance'] = .05;
        }

        $sql = '
        INSERT INTO open_answers_numeric
        (problem_id, answer, pct_tolerance)
        VALUES 
        (?, ?, ?)
        ON DUPLICATE KEY UPDATE
        answer = VALUES(answer),
        pct_tolerance = VALUES(pct_tolerance)
        ;';

        DB::insert($sql, [$this->id, $ans['answer_text'], $ans['pct_tolerance']]);
    }

    public function saveOpenAlphaAnswers($answers)
    {
        $sql = '
        DELETE FROM open_answers_alpha
        WHERE problem_id = ?';
        $rec = DB::delete($sql, [$this->id]);

        $params = [];
        $placeholders = [];
        $placeholder = '(?,?,?)';

        foreach ($answers as $ans) {
            if (!array_key_exists('pct_tolerance', $ans)) {
                $ans['pct_tolerance'] = .25;
            }
            $placeholders[] = $placeholder;
            $params[] = $this->id;
            $params[] = $ans['answer_text'];
            $params[] = $ans['pct_tolerance'];
        }

        $sql = '
        INSERT INTO open_answers_alpha
        (problem_id, answer, pct_tolerance)
        VALUES ' .
        implode(',', $placeholders) . ';';

        DB::insert($sql, $params);
    }

    public function saveSlotsAnswers($answers)
    {
        $sql = '
        DELETE FROM ordered_answers
        WHERE problem_id = ?';
        $rec = DB::delete($sql, [$this->id]);

        $params = [];
        $placeholders = [];
        $placeholder = '(?,?,?,?,?)';

        foreach ($answers as $ans) {
            $placeholders[] = $placeholder;
            $params[] = $this->id;
            $params[] = $ans['answer_text'];
            $params[] = $ans['is_correct'];
            $params[] = empty($ans['slot']) ? 0 : $ans['slot'];
            $params[] = $ans['display_type'];
        }

        $sql = '
        INSERT INTO ordered_answers
        (problem_id, answer_text, is_correct, position, display_type)
        VALUES ' .
        implode(',', $placeholders) . ';';

        DB::insert($sql, $params);
    }

    public function okToDelete()
    {
        $sql = '
        SELECT count(*) as ct
        from results
        WHERE problem_id = ?';

        $recs = DB::select($sql, [$this->id]);

        return $recs[0]->ct == 0;
    }

    public static function getStudentProblemSet($lessonId, $user)
    {
        $whereUser = "WHERE 1";
        $isPremium = 1;
        $params = [];
        // NEED TO FIX THIS
        // if (!$user->isAdmin() && !$user->isTeacher()) {
        //     $whereUser = "WHERE CU.user_id = ?";
        //     $params[] = $user->id;
        //     $isPremium = "CU.is_premium";
        // }
        $params[] = $lessonId;
        $sql = '
        SELECT P.id, P.name, P.lesson_id, P.problem_type_id, P.sequence_id, P.problem_text, P.display_type, P.credit_id, P.is_premium, P.active, ' . $isPremium . ' AS has_access
        FROM problems P
        INNER JOIN lessons L ON L.id = P.lesson_id
        INNER JOIN lesson_sets LS ON LS.id = L.lesson_set_id
        INNER JOIN courses C ON C.id = LS.course_id
        LEFT JOIN courses_users CU ON CU.course_id = C.id
        ' . $whereUser . '
        AND L.id = ?
        ORDER BY P.sequence_id, P.id
        ';

        return DB::select($sql, $params);
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
            DELETE FROM problem_keywords WHERE problem_id = ?';

            DB::delete($sql, [$this->id]);
        }

        if (!empty($placeholders)) {
            $sql = '
            INSERT IGNORE INTO problem_keywords
            (keyword, problem_id)
            VALUES
            ' . implode(', ', $placeholders);

            DB::insert($sql, $params);
        }
    }

    public function getMyKeywords()
    {
        $sql = 'SELECT * FROM problem_keywords where problem_id = ? ORDER BY keyword';
        $recs = DB::select($sql, [$this->id]);
        $ret = [];
        foreach ($recs as $rec) {
            $ret[] = $rec->keyword;
        }

        return $ret;
    }
}
