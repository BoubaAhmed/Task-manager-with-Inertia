import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Edit = ({ tache, projects }) => {
  const { data, setData, put,processing, errors } = useForm({
    project_id: tache.project_id || '',
    name: tache.name || '',
    description: tache.description || '',
    status: tache.status || '',
    priority: tache.priority || '',
    start_date: tache.start_date || '',
    end_date: tache.end_date || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('tasks.update', tache.id));
  };

  return (
    <AuthenticatedLayout>
      <Head title="Edit Task" />
      <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-8 max-w-screen-sm">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-5 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="col-span-2 text-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <i className="fas fa-tasks text-blue-500"></i> Edit Task
            </h2>
            <p className="text-gray-500 text-sm">Update the task details below.</p>
          </div>

          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">Project</label>
            <div className="relative">
              <i className="fas fa-clipboard-list absolute left-3 top-2.5 text-purple-400"></i>
              <select
                value={data.project_id}
                onChange={(e) => setData('project_id', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 text-sm px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.project_id && <div className="text-red-500 text-xs">{errors.project_id}</div>}
          </div>

          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">Task Name</label>
            <div className="relative">
              <i className="fas fa-tag absolute left-3 top-2.5 text-fuchsia-400"></i>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 text-sm px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter task name"
              />
            </div>
            {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
          </div>

          <div className="col-span-2 mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              className="shadow appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter task description"
            />
            {errors.description && <div className="text-red-500 text-xs">{errors.description}</div>}
          </div>

          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
            <div className="relative">
              <i className="fas fa-tasks absolute left-3 top-2.5 text-green-500"></i>
              <select
                value={data.status}
                onChange={(e) => setData('status', e.target.value)}
                className="shadow appearance-none border rounded w-full text-sm py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            {errors.status && <div className="text-red-500 text-xs">{errors.status}</div>}
          </div>

          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">Priority</label>
            <div className="relative">
              <i className="fas fa-flag absolute left-3 top-2.5 text-blue-600"></i>
              <select
                value={data.priority}
                onChange={(e) => setData('priority', e.target.value)}
                className="shadow appearance-none border rounded w-full text-sm py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            {errors.priority && <div className="text-red-500 text-xs">{errors.priority}</div>}
          </div>

          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
            <input
              type="date"
              value={new Date(data.start_date).toISOString().split('T')[0]}
              onChange={(e) => setData('start_date', e.target.value)}
              className="shadow appearance-none border rounded w-full text-sm py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.start_date && <div className="text-red-500 text-xs">{errors.start_date}</div>}
          </div>

          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
            <input
              type="date"
              value={new Date(data.end_date).toISOString().split('T')[0]}
              onChange={(e) => setData('end_date', e.target.value)}
              className="shadow appearance-none border rounded w-full text-sm py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.end_date && <div className="text-red-500 text-xs">{errors.end_date}</div>}
          </div>

          <div className="flex items-center justify-end col-span-2 gap-4">
            <button
              type="submit"
              disabled={processing}
              className="bg-green-500 hover:bg-green-700 text-sm text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline flex items-center gap-2 transition-transform duration-200 ease-in-out transform hover:scale-105"
            >
              <i className="fas fa-save"></i> Save Changes
            </button>

            <Link
              href={route('tasks.index')}
              className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white text-sm font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline flex items-center gap-2 transition-transform duration-200 ease-in-out transform hover:scale-105"
            >
              <i className="fas fa-times"></i> Cancel
            </Link>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
