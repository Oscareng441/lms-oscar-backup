<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\LessonSet;
use App\Models\Lesson;
use App\Models\StudentGroup;
use App\Models\User;
use App\Helpers\OmniHelper;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function groupReport(Request $request, $groupId, $unit, $unitId, $agg, $studentId)
    {
        $user = $request->user();
        if (!$user->canAccessGroup($groupId)) {
            abort(403);
        }
        $group = StudentGroup::find($groupId);
        $course = Course::find($group->course_id);
        $chapter = null;
        $lesson = null;
        switch($unit) {
            case 'chapter':
                $chapter = LessonSet::find($unitId);
                // $scores = $group->getScores($studentId);
                break;
            case 'lesson':
                $lesson = Lesson::find($unitId);
                $chapter = LessonSet::find($lesson->lesson_set_id);
                // $scores = $lesson->getScores($studentId);
                break;
            default:
                // $scores = $group->getScores($studentId);
                // $unit = $studentId ? 'chapter' : 'course';

        }
        $scores = $group->getScores(['studentId' => $studentId, 'unit' => $unit, 'unitId' => $unitId, 'agg' => $agg, ]);
        $students = $group->getGroupMembers();

        return Inertia::render('Reports/Report', ['course' => $course, 'group' => $group, 'scores' => $scores, 'students' => $students, 'unit' => $unit, 'unitId' => $unitId, 'agg' => $agg, 'studentId' => $studentId]);
    }

    public function exportCsv(Request $request)
    {
        $tp = $request->get('type');
        $agg = $request->get('agg');
        $studentId = $request->get('s');
        $groupId = $request->get('g');
        $headers = [
            'Content-Type' => 'text/csv',
            // 'Content-Disposition' => 'attachment; filename="test.csv"',
        ];

        $filename = $tp.$groupId.$agg.$studentId.'.csv';
        $group = StudentGroup::find($groupId);
        $course = Course::find($group->course_id);
        $scores = $group->getScores(['studentId' => $studentId, 'unit' => 'C', 'unitId' => $group->course_id, 'agg' => $agg, ]);
        $path = public_path('storage/tmp/' . $filename);
        $file = fopen($path, 'w');
        $columns = [
            [
                'title' => 'Estudiante',
                'field' => 'userName',
            ],
            [
                'title' => 'Unidad',
                'field' => 'unit',
            ],
            [
                'title' => '# Problemas',
                'field' => 'numProblems',
            ],
            [
                'title' => '# Contestado',
                'field' => 'problemsDone',
            ],
            [
                'title' => '% Correcto',
                'field' => 'userScore',
            ],
        ];
        if ($agg === 'P') {
            $columns[1]['title'] = 'id de Problema';
            $columns[1]['field'] = 'unitId';
            unset($columns[3]);
            unset($columns[2]);
        }
        $cols = [];
        $rows = [];
        foreach ($columns as $c) {
            $cols[] = $c['title'];
        }
        foreach ($scores as $s) {
            $r = [];
            foreach ($columns as $c) {
                $r[] = $s->{$c['field']};
            }
            // $rows[] = implode(',', $r);
            $rows[] = $r;
        }
        fputcsv($file, $cols); // headers
        foreach ($rows as $row) {
            fputcsv($file, $row);
        }
        fclose($file);

        return response()->download($path, $filename, $headers);
    }
}
