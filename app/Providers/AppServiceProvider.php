<?php

namespace App\Providers;

use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Services\QueryTracker as QueryTrackerService;

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
            /**
             * Sidebar navigation tree built with Eloquent eager loading.
             * 
             * OPTIMIZATION: Phase 1 eager-loading refactor (2026-06-08)
             * Before: N+1 queries using nested DB::select loops
             * After: 4 fixed queries using ->with(['lessonSets.lessons.problems'])
             * 
             * Performance: ~27ms, 4 queries, no N+1 patterns
             * 
             * Structure preserved for React frontend compatibility:
             * - All active courses ordered by name
             * - All active lesson_sets (chapters) per course, ordered by sequence_id, id
             * - All active lessons per chapter, ordered by sequence_id, id
             * - All active problems per lesson, ordered by sequence_id, id
             */
            'sidebarNavigation' => function () {
                QueryTrackerService::markSidebarStart();

                $user = Auth::user();
                if (!$user) {
                    QueryTrackerService::markSidebarEnd();
                    return [];
                }

                $courses = Course::where('active', 1)
                    ->orderBy('name')
                    ->with(['lessonSets.lessons.problems'])
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

                    foreach ($course->lessonSets as $chapter) {
                        $chapterItem = [
                            'id' => 'chapter-' . $chapter->id,
                            'label' => $chapter->name,
                            'route' => 'lessonset.showset',
                            'params' => ['id' => $chapter->id],
                            'children' => [],
                        ];

                        foreach ($chapter->lessons as $lesson) {
                            $lessonItem = [
                                'id' => 'lesson-' . $lesson->id,
                                'label' => $lesson->name,
                                'route' => 'lesson.show',
                                'params' => ['id' => $lesson->id],
                                'children' => [],
                            ];

                            foreach ($lesson->problems as $problem) {
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

                QueryTrackerService::markSidebarEnd();
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
