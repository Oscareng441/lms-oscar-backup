<?php

namespace App\Providers;

use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Inertia::share([
            'sidebarNavigation' => function () {
                $user = Auth::user();
                if (!$user) {
                    return [];
                }

                $courses = Course::where('active', 1)
                    ->orderBy('name')
                    ->get();

                $data = [];
                foreach ($courses as $course) {
                    $courseItem = [
                        'id' => 'course-' . $course->id,
                        'label' => $course->name,
                        'route' => 'lessonset.index',
                        'params' => ['id' => $course->id],
                        'children' => [],
                    ];

                    $chapters = DB::select(
                        'SELECT id, name, sequence_id FROM lesson_sets WHERE course_id = ? AND active = 1 ORDER BY sequence_id, id',
                        [$course->id]
                    );

                    foreach ($chapters as $chapter) {
                        $chapterItem = [
                            'id' => 'chapter-' . $chapter->id,
                            'label' => $chapter->name,
                            'route' => 'lessonset.showset',
                            'params' => ['id' => $chapter->id],
                            'children' => [],
                        ];

                        $lessons = DB::select(
                            'SELECT id, name, sequence_id FROM lessons WHERE lesson_set_id = ? AND active = 1 ORDER BY sequence_id, id',
                            [$chapter->id]
                        );

                        foreach ($lessons as $lesson) {
                            $lessonItem = [
                                'id' => 'lesson-' . $lesson->id,
                                'label' => $lesson->name,
                                'route' => 'lesson.show',
                                'params' => ['id' => $lesson->id],
                                'children' => [],
                            ];

                            $problems = DB::select(
                                'SELECT id, name, sequence_id FROM problems WHERE lesson_id = ? AND active = 1 ORDER BY sequence_id, id',
                                [$lesson->id]
                            );

                            foreach ($problems as $problem) {
                                $lessonItem['children'][] = [
                                    'id' => 'problem-' . $problem->id,
                                    'label' => $problem->name,
                                    'route' => 'problem.show',
                                    'params' => ['id' => $problem->id],
                                ];
                            }

                            $chapterItem['children'][] = $lessonItem;
                        }

                        $courseItem['children'][] = $chapterItem;
                    }

                    $data[] = $courseItem;
                }

                return $data;
            },
            'currentRouteName' => function () {
                return Route::currentRouteName();
            },
            'currentRouteParams' => function () {
                $r = request()->route();
                return $r ? $r->parameters() : [];
            },
        ]);
    }
}
