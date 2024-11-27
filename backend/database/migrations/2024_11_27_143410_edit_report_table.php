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
        Schema::table('reports', function (Blueprint $table) {
            $table->dropColumn('sending_check');
            $table->dropColumn('sending_date');

            $table->text('description');
            $table->boolean('problem')->default(false);
            $table->boolean('critical')->default(false);
            $table->text('problem_description')->nullable();
            $table->text('solution')->nullable();
            $table->string('image_path')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
