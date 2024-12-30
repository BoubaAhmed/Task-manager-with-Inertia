<?php

namespace Database\Factories;

use App\Models\Assignment;
use App\Models\Tache;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AssignmentFactory extends Factory
{
    /**
     * Le nom du modèle associé à la factory.
     *
     * @var string
     */
    protected $model = Assignment::class;

    /**
     * Définir l'état par défaut de l'assignation.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,  
            'task_id' => Tache::inRandomOrder()->first()->id, 
            'assigned_date' => $this->faker->date(),         
            'status' => $this->faker->randomElement(['pending']), 
        ];
    }
}
