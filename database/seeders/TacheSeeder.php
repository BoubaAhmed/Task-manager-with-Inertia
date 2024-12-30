<?php

namespace Database\Seeders;

use App\Models\Tache;
use Illuminate\Database\Seeder;

class TacheSeeder extends Seeder
{
    /**
     * Exécuter le seeder.
     *
     * @return void
     */
    public function run()
    {
        // Créer 50 tâches pour chaque projet existant
        Tache::factory(50)->create();
    }
}
