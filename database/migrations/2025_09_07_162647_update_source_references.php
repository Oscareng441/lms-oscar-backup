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
        Schema::table('source_references', function (Blueprint $table) {
            $table->string('author')->after('name')->default('');
            $table->string('source_name')->after('author')->default('');
            $table->string('source_date')->after('author')->default('');
            $table->boolean('active')->after('source_name')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        
    }
};
