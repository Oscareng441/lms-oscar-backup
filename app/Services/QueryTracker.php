<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * QueryTracker - Local-only performance instrumentation
 * 
 * This class tracks database queries during request execution.
 * It is ONLY active when APP_ENV=local to measure performance
 * without impacting production environments.
 * 
 * Key metrics tracked:
 * - sidebar_query_count: Expected to be exactly 4 after eager-loading refactor
 *   (1 for courses, 1 for lesson_sets, 1 for lessons, 1 for problems)
 * - sidebar_execution_time_ms: Time spent in sidebar data generation
 * - total_queries: Overall query count per request
 * 
 * This class prevents duplicate DB::listen registrations which can
 * cause overhead or double-counting if not carefully managed.
 */
class QueryTracker
{
    private static $queries = [];
    private static $startMemory = 0;
    private static $sidebarQueryCount = 0;
    private static $sidebarExecutionTime = 0;
    private static $listenerRegistered = false;

    /**
     * Start tracking queries for this request.
     * Local environment only. Zero overhead in production.
     */
    public static function start()
    {
        if (!app()->environment('local')) {
            return;
        }

        self::$queries = [];
        self::$startMemory = memory_get_usage(true);

        // Prevent duplicate DB::listen registrations.
        // DB::listen is a global handler; registering it multiple times
        // would cause the same query to be logged multiple times, inflating
        // query counts and execution time metrics.
        if (!self::$listenerRegistered) {
            DB::listen(function ($query) {
                self::$queries[] = [
                    'sql' => $query->sql,
                    'time' => $query->time,
                ];
            });
            self::$listenerRegistered = true;
        }
    }

    /**
     * Mark the start of sidebar data generation.
     * Clears query buffer to isolate sidebar queries from request queries.
     */
    public static function markSidebarStart()
    {
        if (!app()->environment('local')) {
            return;
        }
        self::$queries = [];
    }

    /**
     * Mark the end of sidebar data generation.
     * Captures exact count and execution time for sidebar-specific metrics.
     * After Phase 1 eager-loading refactor, sidebar_query_count should be exactly 4.
     */
    public static function markSidebarEnd()
    {
        if (!app()->environment('local')) {
            return;
        }
        self::$sidebarQueryCount = count(self::$queries);
        self::$sidebarExecutionTime = array_sum(array_column(self::$queries, 'time'));
    }

    /**
     * Log request performance metrics to laravel.log in JSON format.
     * Only logs when APP_ENV=local.
     * 
     * Metrics logged:
     * - total_queries: Number of DB queries executed
     * - total_execution_time_ms: Cumulative query time
     * - sidebar_query_count: Queries during sidebar generation (expect 4 after refactor)
     * - sidebar_execution_time_ms: Time spent building sidebar
     * - memory_used_mb: RAM consumed during request
     * - slowest_queries: Top 3 queries by execution time (truncated SQL)
     */
    public static function log($label = 'Request Complete')
    {
        if (!app()->environment('local')) {
            return;
        }

        $endMemory = memory_get_usage(true);
        $memoryUsed = ($endMemory - self::$startMemory) / 1024 / 1024;

        $totalTime = array_sum(array_column(self::$queries, 'time'));
        $totalQueries = count(self::$queries);

        // Sort by time to find slowest
        $sorted = self::$queries;
        usort($sorted, fn($a, $b) => $b['time'] <=> $a['time']);
        $slowest = array_slice($sorted, 0, 3);

        $logData = [
            'label' => $label,
            'total_queries' => $totalQueries,
            'total_execution_time_ms' => round($totalTime, 2),
            'sidebar_query_count' => self::$sidebarQueryCount,
            'sidebar_execution_time_ms' => round(self::$sidebarExecutionTime, 2),
            'memory_used_mb' => round($memoryUsed, 2),
            'slowest_queries' => array_map(function ($q) {
                return [
                    'sql' => self::truncateSql($q['sql']),
                    'time_ms' => round($q['time'], 2),
                ];
            }, $slowest),
        ];

        Log::channel('single')->info('PERFORMANCE_METRICS', $logData);
    }

    /**
     * Truncate SQL to safe log length to prevent log bloat.
     * @param string $sql Raw SQL query
     * @param int $maxLength Maximum length (default 300 chars)
     * @return string Normalized and truncated SQL
     */
    private static function truncateSql($sql, $maxLength = 300)
    {
        // Normalize whitespace
        $sql = preg_replace('/\s+/', ' ', trim($sql));
        
        // Truncate if too long
        if (strlen($sql) > $maxLength) {
            $sql = substr($sql, 0, $maxLength) . '...';
        }
        
        return $sql;
    }

    public static function reset()
    {
        self::$queries = [];
        self::$sidebarQueryCount = 0;
        self::$sidebarExecutionTime = 0;
        self::$listenerRegistered = false;
    }
}
