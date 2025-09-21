<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class School extends Model
{
    protected $fillable = [
        'name',
        'active',
    ];

    public function allUsers($role = 'student')
    {
        $sql = '
        SELECT T.name, T.user_id as id, is_member
        FROM (
            SELECT U.name, U.id as user_id, S.id as school_id, COALESCE(SU.role_id, U.role_id) AS role_id, IFNULL(SU.user_id, 0) AS is_member
            FROM (
                SELECT U.name, U.id, IFNULL(RU.role_id, 2) AS role_id
                FROM users U 
                LEFT JOIN role_user RU ON RU.user_id = U.id
            ) U
            CROSS JOIN schools S
            LEFT JOIN school_user SU ON SU.user_id = U.id AND SU.school_id = S.id
            WHERE S.id = ?
        ) T
        INNER JOIN roles R ON R.id = T.role_id
        WHERE role = ?
        ';

        $recs = DB::select($sql, [$this->id, $role]);

        return $recs;
    }

    public function saveStudents($arr)
    {
        $vals = [];
        foreach($arr as $student) {
            $vals[] = "({$this->id}, {$student['id']}, 2)";
        }
        $valuesClause = implode(",", $vals);
        $sql = "DELETE FROM school_user WHERE school_id = ? AND role_id = 2";
        DB::delete($sql, [$this->id]);
        if (!empty($arr)) {
            $sql = "INSERT IGNORE INTO school_user (school_id, user_id, role_id) VALUES {$valuesClause}";
                DB::insert($sql, []);
        }
    }

    public function saveTeachers($arr)
    {
        $vals = [];
        foreach($arr as $teacher) {
            $vals[] = "({$this->id}, {$teacher['id']}, 3)";
        }
        $valuesClause = implode(",", $vals);
        $sql = "DELETE FROM school_user WHERE school_id = ? AND role_id = 3";
        DB::delete($sql, [$this->id]);
        if (!empty($arr)) {
            $sql = "INSERT IGNORE INTO school_user (school_id, user_id, role_id) VALUES {$valuesClause}";
                DB::insert($sql, []);
        }
    }
}
