import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = ({ projects }) => {
  const { data, setData, post, processing, errors } = useForm({
    project_id: '',
    name: '',
    description: '',
    status: 'pending',
    priority: 'low',
    start_date: '',
    end_date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('tasks.store'));
  };

  return (
    <AuthenticatedLayout>
      <Head title="Créer une tâche" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-sm">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-5 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Titre du formulaire */}
          <div className="col-span-2 text-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <i className="fas fa-tasks text-blue-500"></i> Ajouter une tâche
            </h2>
            <p className="text-gray-500 text-sm">Remplissez le formulaire ci-dessous pour créer une nouvelle tâche.</p>
          </div>

          {/* Projet */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Projet</label>
            <div className="relative">
              <i className="fas fa-project-diagram absolute left-3 top-2.5 text-fuchsia-400"></i>
              <select
                value={data.project_id}
                onChange={(e) => setData('project_id', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 text-sm px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Sélectionnez un projet</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.project_id && <div className="text-red-500 text-xs">{errors.project_id}</div>}
          </div>

          {/* Nom de la tâche */}
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
            <div className="relative">
              <i className="fas fa-tag absolute left-3 top-2.5 text-fuchsia-400"></i>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 text-sm px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Entrez le nom de la tâche"
              />
            </div>
            {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
          </div>
          
          {/* Priorité */}
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">Priorité</label>
            <div className="relative">
              <i className="fas fa-flag absolute left-3 top-2.5 text-blue-600"></i>
              <select
                value={data.priority}
                onChange={(e) => setData('priority', e.target.value)}
                className="shadow appearance-none border rounded w-full text-sm py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
              </select>
            </div>
            {errors.priority && <div className="text-red-500 text-xs">{errors.priority}</div>}
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              className="shadow appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Entrez la description de la tâche"
            />
            {errors.description && <div className="text-red-500 text-xs">{errors.description}</div>}
          </div>

          {/* Date de début */}
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">Date de début</label>
            <input
              type="date"
              value={data.start_date}
              onChange={(e) => setData('start_date', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.start_date && <div className="text-red-500 text-xs">{errors.start_date}</div>}
          </div>

          {/* Date de fin */}
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">Date de fin</label>
            <input
              type="date"
              value={data.end_date}
              onChange={(e) => setData('end_date', e.target.value)}
              className="shadow appearance-none border rounded w-full text-sm py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.end_date && <div className="text-red-500 text-xs">{errors.end_date}</div>}
          </div>

          {/* Boutons de soumission et d'annulation */}
          <div className="flex items-center justify-end col-span-2 gap-4">
            <button
              type="submit"
              disabled={processing}
              className="bg-green-500 hover:bg-green-700 text-sm text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline flex items-center gap-2 transition-transform duration-200 ease-in-out transform hover:scale-105"
            >
              <i className="fas fa-save"></i> Enregistrer
            </button>
            <Link
              href={route('tasks.index')}
              className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white text-sm font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline flex items-center gap-2 transition-transform duration-200 ease-in-out transform hover:scale-105"
            >
              <i className="fas fa-times"></i> Annuler
            </Link>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;
