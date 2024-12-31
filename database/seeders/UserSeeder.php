<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Exécuter le seeder.
     *
     * @return void
     */
    public function run()
    {
        // Crée 10 utilisateurs de test
        User::factory(15)->create();

        // Crée un utilisateur admin spécifique
        User::factory()->admin()->create();
    }
}
