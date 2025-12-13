<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonSet;
use App\Models\Problem;
use App\Models\Course;
use App\Models\SourceReference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Helpers\OmniHelper;
use App\Helpers\UploadHelper;
use Illuminate\Http\File;
use App\Rules\ProblemUploadRule;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Http\Middleware\CheckEditorPermission;

class LessonController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware(CheckEditorPermission::class, except:['show', 'showStudentProblemSet', 'videos', 'getHierarchy']),
        ];
    }

    public function show(Request $request, $id)
    {
        extract($this->getHierarchy($id));
        $problemSet = Problem::where(['lesson_id' => $id, 'active' => 1])->get();
        if (!$problemSet || $problemSet->count() < 1) {
            $problemSet = null;
        }
        $pageAssets = [];
        if ($lesson->lesson_type === 'pdf') {
            $pageAssets = ['pdf' => $lesson->lesson_page];
        }

        $lessonIds = $lesson->getNeighboringLessonIds();

        return Inertia::render('Lessons/Show', ['lesson' => $lesson, 'chapter' => $chapter, 'course' => $course, 'lessonIds' => $lessonIds, 'problemSet' => $problemSet, 'pageAssets' => $pageAssets]);
    }

    public function showEditProblemSet(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->isAdmin() && !$user->isTeacher()) {
            abort(403);
        }
        $problems = Problem::where(['lesson_id' => $id,])->orderBy('sequence_id')->get();
        $lesson = Lesson::find($id);
        $problems->shuffle();
        $answers = [];
        foreach ($problems as $p) {
            $answers[$p->id] = $p->getAnswers();
        }
        $hints = [];
        foreach ($problems as $p) {
            $hints[$p->id] = $p->getHints();
        }

        return Inertia::render('ProblemSets/EditProblemSet', ['problems' => $problems, 'lesson' => $lesson, 'answers' => $answers, 'hints' => $hints]);
    }

    public function showStudentProblemSet(Request $request, $id)
    {
        $problems = Problem::where(['lesson_id' => $id])->get();
        extract($this->getHierarchy($id));
        $answers = [];
        $hints = [];
        $userScores = [];
        foreach ($problems as $p) {
            $answers[$p->id] = $p->getAnswers();
            $hints[$p->id] = $p->getHints();
            $userScores[$p->id] = $p->getUserScore($request->user()->id);
        }

        return Inertia::render('ProblemSets/StudentProblemSet', ['problems' => $problems, 'lesson' => $lesson, 'chapter' => $chapter, 'course' => $course, 'answers' => $answers, 'hints' => $hints, 'userScores' => $userScores]);
    }

    public function videos(Request $request, $id)
    {
        return Lesson::find($id)->videos();
    }

    public function addProblem(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->isAdmin() && !$user->isTeacher()) {
            abort(403);
        }
        $p = new Problem();
        $p->name = '';
        $p->lesson_id = $id;
        $p->problem_type_id = 1;
        $p->sequence_id = 10;
        $p->problem_text = '';            
        $p->display_type = 'latex';
        $courses = Course::where(['active' => 1])->get(); 
        extract($this->getHierarchy($id));
        $chapterId = $lesson->lesson_set_id;
        $chapter = LessonSet::find($chapterId);
        $courseId = $chapter->course_id;
        $sources = SourceReference::where(['active' => 1])->get();
        return Inertia::render('Problems/Edit', ['origProblem' => $p, 'origAnswers' => [], 'origHints' => [], 'courses' => $courses, 'origCourseId' => $courseId, 'origChapterId' => $chapterId, 'origLessonId' => $id, 'lesson' => $lesson, 'chapter' => $chapter, 'course' => $course, 'images' => [], 'credits' => $sources]);
    }

    public function uploadProblem(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->isAdmin() && !$user->isTeacher()) {
            abort(403);
        }
        $lesson = Lesson::find($id);
        if ($request->method() === 'GET') {
            extract($this->getHierarchy($id));
            return Inertia::render('Problems/Upload', ['lesson' => $lesson, 'chapter' => $chapter, 'course' => $course]);
        }
        $request->validate([
            'problem' => ['required', new ProblemUploadRule()],
        ]);
        $p = new Problem();
        $p->name = '';
        $p->lesson_id = $id;
        $p->sequence_id = 10;
        $p->display_type = 'latex';
        $h = new UploadHelper($request->problem);
        $p = $h->build($p);

        return redirect()->route('problem.edit', ['id' => $p->id]);
    }

    public function editLesson(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->isAdmin() && !$user->isTeacher()) {
            abort(403);
        }
        // $lesson = Lesson::find($id);
        extract($this->getHierarchy($id));
        if ($lesson === null) {
            $lesson = new Lesson();
            $lesson->name = '';
        }

        return Inertia::render('Lessons/Edit', ['origLesson' => $lesson ,'chapter' => $chapter, 'course' => $course]);
    }

    public function saveLesson(Request $request)
    {
        if (!$request->user()->isAdmin() && !$request->user()->isTeacher()) {
            abort(403);
        }
        $data = $request->all();
        $c = $data['lesson'];
        if (empty($c['id'])) {
            $lesson = new lesson();
        } else {
            $lesson = Lesson::find($c['id']);
        }
        if (!empty($c['lesson_page'])) {
            $f = $data['file'];
            if ($f) {
                $chapter = LessonSet::find($c['lesson_set_id']);
                $courseId = $chapter->course_id;
                $folder = $courseId . "/pdf";
                $path = Storage::disk('public')->putFileAs($folder, new File($f), $c['lesson_page']);
                $lesson->lesson_page = $folder . '/' . str_replace('.pdf', '', $c['lesson_page']);
            }
        }
        $lesson->name = $c['name'];
        $lesson->short_name = $c['short_name'];
        $lesson->lesson_set_id = $c['lesson_set_id'];
        $lesson->lesson_text = !empty($c['lesson_text']) ? $c['lesson_text'] : '';
        $lesson->lesson_type = $c['lesson_type'];
        $lesson->sequence_id = $c['sequence_id'];
        $lesson->active = !empty($c['active']) ? 1 : 0;
        $lesson->save();

        return redirect()->route(
            'lesson.show', ['id' => $lesson->id]
        );
    }

    public function getHierarchy($id) {
            $lesson = Lesson::find($id);
            $chapter = LessonSet::find($lesson->lesson_set_id);
            $course = Course::find($chapter->course_id);

        return [
            'lesson' => $lesson,
            'chapter' => $chapter,
            'course' => $course,
        ];
    }
}
