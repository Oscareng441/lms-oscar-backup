<?php

namespace App\Http\Controllers;

use App\Models\Problem;
use App\Models\ProblemHint;
use App\Models\Lesson;
use App\Models\LessonSet;
use App\Models\Course;
use App\Models\AnswerSet;
use App\Models\SourceReference;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use App\Helpers\OmniHelper;
use App\Http\Requests\ProblemUpdateRequest;
use Illuminate\Support\Facades\Storage;

class ProblemController extends Controller
{
    public function saveProblem(ProblemUpdateRequest $request)
    {
        $user = $request->user();
            OmniHelper::log("saveProblem, user " . $user->name);
        if (!$user->isAdmin() && !$user->isTeacher()) {
            // abort(403);
            OmniHelper::log("403 error bypassed, user " . $user->name);
        }
        $data = $request->all();

        $p = $data['problem'];
        if (empty($p['display_type'])) {
            $p['display_type'] = 'latex';
        }
        if (empty($p['active'])) {
            $p['active'] = 0;
        }
        if (!empty($p['id'])) {
            $problem = Problem::find($p['id']);
        } else {
            $problem = new Problem();
        }

        //*** VALIDATION HERE
        $request->validate([
            'problem.problem_text' => 'required|string',
            'answers' => [
                'required',
                'array', 
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->problem['problem_type_id'] == 4 && count($value) > 1) {
                        $fail("No puede haber más que una respuesta con tipo numérico.");
                    }
                },
            ],
        ],[
            'problem.problem_text.required' => ' El texto del problema no puede estar vacío. ',
            'answers.required' => ' Tiene que haber a lo menos una respuesta. ',
        ]);

        $problem->name = '';
        $problem->lesson_id = $p['lesson_id'];
        $problem->problem_type_id = $p['problem_type_id'];
        $problem->display_type = $p['display_type'];
        $problem->sequence_id = $p['sequence_id'];
        $problem->problem_text = $p['problem_text'];
        $problem->credit_id = $p['credit_id'];
        $problem->active = $p['active'];
        $problem->save();
        $answers = $data['answers'];
        switch ($problem->problem_type_id) {
            case 1:
            case 2:
                $problem->deleteAnswers();
                foreach ($answers as $a) {
                    $answer = new AnswerSet();
                    $answer->problem_id = $problem->id;
                    $answer->display_type = $a['display_type'];
                    $answer->is_correct = $a['is_correct'];
                    $answer->answer_text = $a['answer_text'];
                    $answer->save();
                }
                break;
            case 3:
                $problem->saveOpenAlphaAnswers($answers);
                break;
            case 4:
                $problem->saveOpenAnswer($answers[0]);
                break;
            default:
                throw new \Exception("unknown answer type in save prob");
        }
        $problem->deleteHints();
        $hints = $data['hints'];
        foreach ($hints as $h) {
            $hint = new ProblemHint();
            $hint->problem_id = $problem->id;
            $hint->sequence_id = $h['sequence_id'];
            $hint->hint = $h['hint'];
            $hint->save();
        }

        return redirect()->route(
            'problem.edit', ['id' => $problem->id]
        );
    }

    public function duplicateProblem(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->isAdmin() && !$user->isTeacher()) {
            abort(403);
        }
        $p1 = Problem::find($id);
        $p = new Problem();
        $p->name = '';
        $p->lesson_id = $p1->lesson_id;
        $p->problem_type_id = $p1->problem_type_id;
        $p->sequence_id = $p1->sequence_id;
        $p->problem_text = $p1->problem_text;
        $p->display_type = $p1->display_type;
        $answers = $p1->getAnswers();
        $hints = $p1->getHints();
        $courses = Course::where(['active' => 1])->get(); 
        extract($this->getHierarchy($p->lesson_id));
        $chapterId = $lesson->lesson_set_id;
        $courseId = $chapter->course_id;
        $filePaths = Storage::disk('public')->files($courseId . '/thumbs');
        $sources = SourceReference::where(['active' => 1])->get();
        $imageUrls = [];
        foreach ($filePaths as $path) {
            $imageUrls[] = '/storage/' . $path;
        }
        return Inertia::render('Problems/Edit', ['origProblem' => $p, 'origAnswers' => $answers, 'origHints' => $hints, 'courses' => $courses, 'origCourseId' => $courseId, 'origChapterId' => $chapterId, 'origLessonId' => $p->lesson_id, 'lesson' => $lesson, 'chapter' => $chapter, 'course' => $course, 'images' => $imageUrls, 'credits' => $sources]);
    }
    
    public function show(Request $request, $id)
    {
        $prob = Problem::find($id);
        $answers = $prob->getAnswers();
        shuffle($answers);
        $hints = $prob->getHints();
        extract($this->getHierarchy($prob->lesson_id));
        $lessonIds = $lesson->getNeighboringLessonIds();
        $problemIds = $prob->getNeighboringProblemIds($request->user()->id);
        $numCorr = 0;
        foreach($answers as $a) {
            if ($a->is_correct) {
                $numCorr++;
            }
        }
        $score = $prob->getUserScore($request->user()->id);

        return Inertia::render('Problems/Show', ['prob' => $prob, 'answers' => $answers, 'hints' => $hints, 'lesson' => $lesson, 'problemIds' => $problemIds, 'lessonIds' => $lessonIds, 'chapter' => $chapter, 'course' => $course, 'numberCorrect' => $numCorr, 'score' => $score]);
    }

    public function editProblem(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->isAdmin() && !$user->isTeacher()) {
            abort(403);
        }
        $p = Problem::find($id);
        if ($p === null) {
            $p = new Problem();
            $p->name = '';
            $p->lesson_id = 0;
            $p->problem_type_id = 1;
            $p->sequence_id = 10;
            $p->problem_text = '';            
            $p->save();
            $courseId = 0;
            $chapterId = 0;
            $lessonId = 0;
            $course = null;
            $chapter = null;
            $lesson = null;
        } else {
            extract($this->getHierarchy($p->lesson_id));
            $lessonId = $p->lesson_id;
            $chapterId = $lesson->lesson_set_id;
            $courseId = $chapter->course_id;
        }
        $answers = $p->getAnswers();
        $hints = $p->getHints();
        $courses = Course::where(['active' => 1])->get();
        $sources = SourceReference::where(['active' => 1])->get();
        $filePaths = Storage::disk('public')->files($courseId . '/thumbs');
        $imageUrls = [];
        foreach ($filePaths as $path) {
            $imageUrls[] = '/storage/' . $path;
        }
        return Inertia::render('Problems/Edit', ['origProblem' => $p, 'origAnswers' => $answers, 'origHints' => $hints, 'courses' => $courses, 'origCourseId' => $courseId, 'origChapterId' => $chapterId, 'origLessonId' => $lessonId, 'lesson' => $lesson, 'chapter' => $chapter, 'course' => $course, 'images' => $imageUrls, 'credits' => $sources]);
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

    public function publish(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->isAdmin() && !$user->isTeacher()) {
            abort(403);
        }
        $p = Problem::find($id);
        $unPublish = $request->get('deactivate');
        $p->active = !$unPublish;
        $p->save();

        return redirect()->back()->with(['success' => 'Success',]);
    }

    public function delete(Request $request, $id)
    {
        $user = $request->user();
        if (!$user->isAdmin() && !$user->isTeacher()) {
            abort(403);
        }
        $p = Problem::find($id);

        $okToDelete = $p->okToDelete();
        $msg = 'no se puede';
        $cat = 'error';
        if ($okToDelete) {
            $cat = 'success';
            $msg = 'exitoso';
            $lessonId = $p->lesson_id;
            $p->delete();
            return to_route('problemset.edit', ['id' => $lessonId]);
            // return redirect()->route('problemset.edit', ['id' => $lessonId]);
        }

        $request->session()->flash($cat, $msg);

        return redirect()->back()->with([$cat => $msg]);
    }
}
