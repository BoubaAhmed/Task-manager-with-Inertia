<?php

namespace Database\Factories;

use App\Models\Tache;
use App\Models\Project; // Assurez-vous d'importer le modèle Project
use Illuminate\Database\Eloquent\Factories\Factory;

class TacheFactory extends Factory
{
    /**
     * Le nom du modèle associé à la factory.
     *
     * @var string
     */
    protected $model = Tache::class;

    /**
     * Définir l'état par défaut de la tâche.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word, // Nom de la tâche
            'description' => $this->faker->sentence, // Description de la tâche
            'status' => $this->faker->randomElement(['pending']), // Statut de la tâche
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']), // Priorité de la tâche
            'start_date' => $this->faker->date(), // Date de début
            'end_date' => $this->faker->date(), // Date de fin
            'project_id' => Project::factory(), // Référence à un projet existant (via la factory Project)
        ];
    }
}
