import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Messages from '@/Components/Messages';

const Edit = ({ assignment, users, tasks }) => {

  const { data, setData, put, errors } = useForm({
    user_id: assignment.user_id,
    task_id: assignment.task_id,
    assigned_date: assignment.assigned_date,
    status: assignment.status,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/assignments/${assignment.id}`, data);
  };

  return (
    <AuthenticatedLayout>
      <Head title="Edit Assignment" />
      <div className="container mx-auto mt-20  px-4 sm:px-6 lg:px-8 py-8 max-w-screen-sm">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-5 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Form Title */}
          <div className="col-span-2 text-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <i className="fas fa-edit text-blue-500"></i> Modifier une tâche
            </h2>
            <p className="text-gray-500 text-sm">Mettez à jour les informations de l'assignation.</p>
          </div>

          {/* User Selection */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_id">
              Utilisateur
            </label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="task_id">
              Tâche
            </label>
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

          {/* Assigned Date */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assigned_date">
              Date d'assignation
            </label>
            <input
              type="date"
              name="assigned_date"
              id="assigned_date"
              className="shadow appearance-none border rounded w-full py-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={new Date(data.assigned_date).toISOString().split('T')[0]}
              onChange={(e) => setData('assigned_date', e.target.value)}
              required
            />
            {errors.assigned_date && <div className="text-red-500 text-xs">{errors.assigned_date}</div>}
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="shadow appearance-none border rounded w-full py-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.status}
              onChange={(e) => setData('status', e.target.value)}  // Update 'status' instead of 'assigned_date'
              required
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {errors.status && <div className="text-red-500 text-xs">{errors.status}</div>}
          </div>

          <div className="flex items-center justify-end col-span-2 gap-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline flex items-center gap-2 transition-transform duration-200 ease-in-out transform hover:scale-105"
            >
              <i className="fas fa-save"></i> Mettre à jour l'assignation
            </button>
          </div>
        </form>
      </div>
      <Messages />
    </AuthenticatedLayout>
  );
};

export default Edit;
