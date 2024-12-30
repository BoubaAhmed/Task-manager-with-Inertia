<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User; // Assurez-vous que le modèle User est importé
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProjectFactory extends Factory
{
    /**
     * Le nom du modèle associé à la factory.
     *
     * @var string
     */
    protected $model = Project::class;

    /**
     * Définir l'état par défaut du projet.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->company, // Nom du projet, généré aléatoirement
            'description' => $this->faker->text, // Description générée aléatoirement
            'start_date' => $this->faker->date(), // Date de début générée aléatoirement
            'end_date' => $this->faker->date(), // Date de fin générée aléatoirement
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']), // Priorité générée aléatoirement
            'status' => $this->faker->randomElement(['pending']), // Statut généré aléatoirement
            'user_id' => User::factory(), // ID de l'utilisateur, référence une factory d'utilisateur
        ];
    }
}
