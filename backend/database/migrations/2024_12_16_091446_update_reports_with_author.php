<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //Update existing records
        DB::table('reports')->update(['author' => 25]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
