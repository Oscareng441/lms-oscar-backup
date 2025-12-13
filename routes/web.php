<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProblemSetController;
use App\Http\Controllers\ProblemController;
use App\Http\Controllers\LessonSetController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SourceController;
use App\Http\Controllers\SchoolController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/', [CourseController::class, 'all'])->name('course.all');
    Route::get('/dashboard', [CourseController::class, 'all'])->name('home');
    Route::get('/courses/all', [CourseController::class, 'all'])->name('dashboard');
    Route::get('/courses', [CourseController::class, 'courses'])->name('course.ajax');
    Route::get('/course/{id}/groups', [CourseController::class, 'groups'])->name('course.groups');
    Route::get('/course/{id}/group/add', [CourseController::class, 'addGroup'])->name('course.addGroup');
    Route::get('/group/{groupId}', [CourseController::class, 'groupShow'])->name('course.groupShow');
    Route::get('/enroll/{id}', [CourseController::class, 'enroll'])->name('course.enroll');
    Route::get('/enroll-action/{id}', [CourseController::class, 'enrollAction'])->name('course.enrollaction');
    Route::get('/upgrade/{id}', [CourseController::class, 'upgrade'])->name('course.upgrade');
    Route::get('/lesson-sets', [LessonSetController::class, 'all'])->name('lessonset.all');
    Route::get('/course/{id}', [LessonSetController::class, 'index'])->name('lessonset.index');
    Route::get('/chapter/{id}', [LessonSetController::class, 'showSet'])->name('lessonset.showset');
    Route::get('/lesson/{id}', [LessonController::class, 'show'])->name('lesson.show');
    Route::get('/problem-set/{id}/edit', [LessonController::class, 'showEditProblemSet'])->name('problemset.edit');
    Route::get('/problem-set/{id}', [LessonController::class, 'showStudentProblemSet'])->name('problemset.student');
    Route::get('/problem/{id}', [ProblemController::class, 'show'])->name('problem.show');
    Route::get('/problem/{id}/edit', [ProblemController::class, 'editProblem'])->name('problem.edit');
    Route::get('/chapter/{id}/edit', [LessonSetController::class, 'editChapter'])->name('chapter.edit');
    Route::get('/course/{id}/edit', [CourseController::class, 'editCourse'])->name('course.edit');
    Route::get('/lesson/{id}/edit', [LessonController::class, 'editLesson'])->name('lesson.edit');
    Route::get('/lesson/{id}/videos', [LessonController::class, 'videos'])->name('lesson.videos');
    Route::get('/lesson/{id}/add-problem', [LessonController::class, 'addProblem'])->name('lesson.addProblem');
    Route::get('/lesson/{id}/upload-problem', [LessonController::class, 'uploadProblem'])->name('lesson.uploadProblem');
    Route::post('/lesson/{id}/upload-problem', [LessonController::class, 'uploadProblem'])->name('lesson.uploadProblem');
    Route::get('/problem/{id}/duplicate', [ProblemController::class, 'duplicateProblem'])->name('problem.duplicate');
    Route::post('/problem/save-seq-id', [ProblemController::class, 'recordSeqId'])->name('problem.recordSeqId');
    Route::get('/report/{groupId}/{unit}/{unitId}/{agg}/{studentId}', [ReportController::class, 'groupReport'])->name('group.report');
    Route::get('/export-csv', [ReportController::class, 'exportCsv'])->name('exportCsv');
    Route::post('/problem/save', [ProblemController::class, 'saveProblem'])->name('problem.save');
    Route::post('/image/upload', [CourseController::class, 'uploadImage'])->name('image.upload');
    Route::post('/course/save', [CourseController::class, 'saveCourse'])->name('course.save');
    Route::post('/chapter/save', [LessonSetController::class, 'saveChapter'])->name('chapter.save');
    Route::post('/lesson/save', [LessonController::class, 'saveLesson'])->name('lesson.save');
    Route::post('/group/save', [CourseController::class, 'saveGroup'])->name('group.save');
    Route::post('/admin/user/save', [AdminController::class, 'userSave'])->name('user.save');
    Route::get('/problems', [ProblemController::class, 'home'])->name('problem.home');
    Route::get('/course/{id}/chapters', [CourseController::class, 'chapters'])->name('course.chapters');
    Route::get('/chapter/{id}/lessons', [LessonSetController::class, 'lessons'])->name('chapter.lessons');
    Route::get('/record-answer', [ResultController::class, 'recordAnswer'])->name('results.recordanswer');
    Route::get('/reset/{lessonId}', [ResultController::class, 'reset'])->name('results.reset');
    Route::get('/admin/users', [AdminController::class, 'users'])->name('admin.users');
    Route::get('/admin/groups', [AdminController::class, 'groups'])->name('admin.groups');
    Route::get('/admin/user/{id}', [AdminController::class, 'userEdit'])->name('user.edit');
    Route::get('/problem/{id}/publish', [ProblemController::class, 'publish'])->name('problem.publish');
    Route::get('/problem/{id}/delete', [ProblemController::class, 'delete'])->name('problem.delete');
    Route::get('/sources', [SourceController::class, 'index'])->name('source.index');
    Route::get('/source/{id}', [SourceController::class, 'destroy'])->name('source.destroy');
    Route::post('/source/save', [SourceController::class, 'store'])->name('source.save');
    Route::get('/schools', [SchoolController::class, 'index'])->name('school.index');
    Route::get('/school/{id}/users', [SchoolController::class, 'users'])->name('school.users');
    Route::post('/school/save', [SchoolController::class, 'store'])->name('school.save');
    Route::get('/school/{id}', [SchoolController::class, 'destroy'])->name('school.destroy');
});

require __DIR__.'/auth.php';
