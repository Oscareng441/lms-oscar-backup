<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('open_answers_alpha', function (Blueprint $table) {
            $table->decimal('pct_tolerance', total: 4, places: 2)->default(0.1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('open_answers_alpha', function (Blueprint $table) {
            $table->dropColumn('pct_tolerance');
        });
    }
};
