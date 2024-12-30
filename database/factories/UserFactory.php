<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * Le nom du modèle associé à la factory.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Définir l'état par défaut de l'utilisateur.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => bcrypt('password'), // mot de passe par défaut
            'phone_number' => $this->faker->phoneNumber(),
            'role' => $this->faker->randomElement(['designer', 'developer', 'tester', 'manager', 'analyst']),
            'status' => $this->faker->randomElement(['active', 'inactive', 'pending', 'suspended']),
            'is_superuser' => $this->faker->boolean(),
        ];
    }

    /**
     * Définir un utilisateur avec un rôle spécifique.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function admin()
    {
        return $this->state([
            'role' => 'developer',
            'is_superuser' => false,
        ]);
    }

    /**
     * Définir un utilisateur inactif.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function inactive()
    {
        return $this->state([
            'status' => 'inactive',
        ]);
    }
}
