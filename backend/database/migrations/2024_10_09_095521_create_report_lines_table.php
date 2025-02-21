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
        Schema::create('report_lines', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->text('line');
            $table->string('image')->nullable();
            $table->enum('problem', ['no', 'yes', 'critical'])->default('no');
            
            $table->unsignedBigInteger('report');
            $table->foreign('report')->references('id')->on('reports')->onDelete('cascade');

            $table->unsignedBigInteger('author');
            $table->foreign('author')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_lines');
    }
};
