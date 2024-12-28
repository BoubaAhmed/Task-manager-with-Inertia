import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = ({ users, tasks }) => {
  const { data, setData, post, errors } = useForm({
    user_id: '',
    task_id: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/assignments', data);
  };

  return (
    <AuthenticatedLayout>
      <Head title="Create Assignment" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-sm">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-5 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Form Title */}
          <div className="col-span-2 text-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <i className="fas fa-tasks text-blue-500"></i> Ajouter une tâche
            </h2>
            <p className="text-gray-500 text-sm">Remplissez le formulaire ci-dessous pour attribuer une tâche à un utilisateur.</p>
          </div>

          {/* User Selection */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_id">Utilisateur</label>
            <div className="relative">
              <i className="fas fa-user absolute left-3 top-2.5 text-fuchsia-400"></i>
              <select
                name="user_id"
                id="user_id"
                className="shadow appearance-none border rounded w-full py-2 text-sm px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.user_id}
                onChange={(e) => setData('user_id', e.target.value)}
                required
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

          {/* Task Selection */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="task_id">Tâche</label>
            <div className="relative">
              <i className="fas fa-clipboard-list absolute left-3 top-2.5 text-fuchsia-400"></i>
              <select
                name="task_id"
                id="task_id"
                className="shadow appearance-none border rounded w-full py-2 text-sm px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data.task_id}
                onChange={(e) => setData('task_id', e.target.value)}
                required
              >
                <option value="">Sélectionnez une tâche</option>
                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.task_id && <div className="text-red-500 text-xs">{errors.task_id}</div>}
          </div>
          {/* Submit Button */}
          <div className="flex items-center justify-end col-span-2 gap-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-sm text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline flex items-center gap-2 transition-transform duration-200 ease-in-out transform hover:scale-105"
            >
              <i className="fas fa-save"></i> Enregistrer l'assignation
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;