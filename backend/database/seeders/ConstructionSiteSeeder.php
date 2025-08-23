<?php
namespace Database\Seeders;

use App\Models\ConstructionSite;
use Illuminate\Database\Seeder;

class ConstructionSiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ConstructionSite::insert([
            ['title' => 'Site Title'],
            ['client' => 'Worker'],
            ['location' => 'Manager'],
            ['start_date' => '2023-01-01'],
            ['end_date' => '2027-12-31'],
            ['status' => 'open'],
            ['director' => 1],
        ]);
    }
}
