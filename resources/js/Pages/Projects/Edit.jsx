import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Edit = ({ users, project }) => {
  const { data, setData, put, processing, errors } = useForm({
    name: project.name || '',
    description: project.description || '',
    start_date: project.start_date || '',
    end_date: project.end_date || '',
    priority: project.priority || 'medium',
    status: project.status || 'pending',
    user_id: project.user_id || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/projects/${project.id}`);
  };

  return (
    <AuthenticatedLayout>
      <Head title="Modifier un projet" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-sm">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-5 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Titre du formulaire */}
          <div className="col-span-2 text-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <i className="fas fa-project-diagram text-blue-500"></i> Modifier le projet
            </h2>
            <p className="text-gray-500 text-sm">Mettez à jour les informations du projet ci-dessous.</p>
          </div>

          {/* Nom */}
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
            <div className="relative">
              <i className="fas fa-tag absolute left-3 top-2.5 text-fuchsia-400"></i>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 text-sm px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Entrez le nom du projet"
              />
            </div>
            {errors.name ? <div className="text-red-500 text-xs">{errors.name}</div> : <p className="text-gray-500 text-xs mt-1">Ceci est le nom de votre projet.</p>}
          </div>

          {/* Chef de Projet */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Chef de Projet</label>
            <div className="relative">
              <i className="fas fa-user absolute left-3 top-2.5 text-purple-400"></i>
              <select
                value={data.user_id}
                onChange={(e) => setData('user_id', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 text-sm px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Sélectionnez un utilisateur</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.user_id && <div className="text-red-500 text-xs">{errors.user_id}</div>}
          </div>

          {/* Dates */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Date de début</label>
            <input
              type="date"
              value={new Date(data.start_date).toISOString().split('T')[0]}
              onChange={(e) => setData('start_date', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.start_date && <div className="text-red-500 text-xs">{errors.start_date}</div>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Date de fin</label>
            <input
              type="date"
              value={new Date(data.end_date).toISOString().split('T')[0]}
              onChange={(e) => setData('end_date', e.target.value)}
              className="shadow appearance-none border rounded w-full text-sm py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.end_date && <div className="text-red-500 text-xs">{errors.end_date}</div>}
          </div>

          {/* Priorité */}
          <div>
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

          {/* Statut */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Statut</label>
            <div className="relative">
              <i className="fas fa-tasks absolute left-3 top-2.5 text-green-500"></i>
              <select
                value={data.status}
                onChange={(e) => setData('status', e.target.value)}
                className="shadow appearance-none border rounded w-full text-sm py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="pending">En attente</option>
                <option value="completed">Terminé</option>
                <option value="cancelled">Annulé</option>
                <option value="in-progress">En cours</option>
              </select>
            </div>
            {errors.status && <div className="text-red-500 text-xs">{errors.status}</div>}
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              className="shadow appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Entrez la description du projet"
            />
            {errors.description ? <div className="text-red-500 text-xs">{errors.description}</div> : <p className="text-gray-500 text-xs mt-1">Fournissez une description détaillée du projet.</p>}
          </div>

          {/* Boutons */}
          <div className="flex items-center justify-end col-span-2 gap-4">
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline flex items-center gap-2 transition-transform duration-200 ease-in-out transform hover:scale-105"
            >
              <i className="fas fa-save"></i> Mettre à jour
            </button>
            <Link
              href={route('projects.index')}
              className="border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white text-sm font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline flex items-center gap-2 transition-transform duration-200 ease-in-out transform hover:scale-105"
            >
              <i className="fas fa-times"></i> Annuler
            </Link>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
