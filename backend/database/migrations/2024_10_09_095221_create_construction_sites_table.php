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
        Schema::create('construction_sites', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title');
            $table->string('client');
            $table->string('location');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->enum('status', ['not_started', 'open', 'closed'])->default('not_started');

            $table->unsignedBigInteger('director');
            $table->foreign('director')->references('id')->on('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('construction_sites');
    }
};
