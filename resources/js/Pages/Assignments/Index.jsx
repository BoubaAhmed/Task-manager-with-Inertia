import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Assuming you have a layout file for authenticated users
import { usePage } from '@inertiajs/react';  // To access authentication info (auth) and other props

const Index = ({ assignments, users, tasks, projects }) => {
  const { delete: deleteRequest} = useForm();
  const { auth , flash} = usePage().props; // Access authentication status
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [page, setPage] = useState(1);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignToShow, setAssignToShow] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignToDelete, setAssignToDelete] = useState(null);
  const [message, setMessage] = useState({ success: null, error: null });

  useEffect(() => {
      if (flash.success) {
      setMessage({ success: flash.success, error: null });
      } else if (flash.error) {
      setMessage({ success: null, error: flash.error });
      }
  }, [flash]);

  const filteredTasks = selectedProject
    ? tasks.filter(task => task.project_id === parseInt(selectedProject))
    : tasks;


    const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearchQuery = assignment.task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUser = selectedUser ? assignment.user.id === parseInt(selectedUser) : true;
    const matchesTask = selectedTask ? assignment.task.id === parseInt(selectedTask) : true;

    return matchesSearchQuery && matchesUser && matchesTask;
  });

  const assignmentsPerPage = 10; 
  const totalPages = Math.ceil(filteredAssignments.length / assignmentsPerPage);
  const paginatedAssignments = filteredAssignments.slice((page - 1) * assignmentsPerPage, page * assignmentsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };


  const openDeleteModal = (assignId) => {
    setAssignToDelete(assignId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setAssignToDelete(null);
  };
  const handleDelete = () => {
    if (assignToDelete) {
      deleteRequest(`/assignments/${assignToDelete}`, {
        onSuccess: () =>  closeDeleteModal(),
        onError: () =>  closeDeleteModal(),
      });
    }
  };

  const openAssignModal = (assign) => {
    setAssignToShow(assign);
    setShowAssignModal(true);
  };

  const closeAssignModal = () => {
    setShowAssignModal(false);
    setAssignToShow(null);
  };
  
  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 flex items-center gap-2">
            <i className="fas fa-tasks text-indigo-600"></i> Assignments :
          </h2>
          <div className="flex gap-4">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="px-6 py-1 border rounded border-1 border-indigo-600 text-sm"
            >
              <option value="">Filtrer par utilisateur</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              className="px-6 py-1 border rounded border-1 border-indigo-600 text-sm"
            >
              <option value="">Filtrer par tâche</option>
              {filteredTasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.name}
                </option>
              ))}
            </select>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="px-6 py-1 border rounded border-1 border-indigo-600 text-sm"
            >
              <option value="">Filtrer par projet</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            {auth && (
              <Link
                href={route('assignments.create')}
                className="group relative inline-flex items-center overflow-hidden rounded border-2 border-current px-4 py-2 text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              >
                <span className="absolute -end-full transition-all group-hover:end-2">
                  <svg
                    className="h-4 w-4 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <span className="text-xs font-medium transition-all group-hover:me-2">
                  Ajouter
                </span>
              </Link>
            )}
          </div>
        </div>
      }
    >
      <Head title="Assignments" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-xl">
        <div className="flex mb-3 justify-between gap-4">
            <p className="text-md font-bold leading-tight text-gray-900">
              There are {assignments.length} assignments available:
            </p>
            <input
              type="text"
              placeholder="Rechercher des tâches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-6 py-2 border-2 border-zinc-400 rounded text-sm shadow-xl"
            />
        </div>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-sky-600 text-gray-100">
              <tr>
                <th className="px-6 py-3 text-left uppercase text-sm font-medium ">
                  <i className="fas fa-user text-rose-400 mr-2"></i>User
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium ">
                  <i className="fas fa-user-tag text-orange-500 mr-2"></i>User Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium ">
                  <i className="fas fa-tasks text-yellow-400 mr-2"></i>Task
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium ">
                  <i className="fas fa-exclamation-circle text-green-500 mr-2"></i>Priority
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium ">
                  <i className="fas fa-flag text-rose-400 mr-2"></i>Task Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium ">
                  <i className="fas fa-flag text-rose-400 mr-2"></i>Assign Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium ">
                  <i className="fas fa-calendar-alt text-sky-300 mr-2"></i>Assigned Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium ">
                  <i className="fas fa-tools text-lime-300 mr-2"></i>Actions
                </th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-800">
              {paginatedAssignments.map((assignment) => (
                <tr key={assignment.id} className="border-t">
                  <td className="px-6 py-3">{assignment.user.name}</td>
                  <td className="px-6 py-3">{assignment.user.role}</td>
                  <td className="px-6 py-3">{assignment.task.name}</td>
                  <td className="px-6 py-3">{assignment.task.priority}</td>
                  <td className="px-6 py-3">{assignment.task.status}</td>
                  <td className="px-6 py-3">
                  <span className={`flex items-center gap-2 ${assignment.status === 'completed' ? 'text-green-400 font-bold' :
                            assignment.status === 'in-progress' ? 'font-bold text-blue-400' :
                            assignment.status === 'pending' ? ' font-bold text-yellow-500' : 'font-bold text-purple-800'
                        } text-white px-3 rounded-full`}>
                        <i className={`fas ${
                            assignment.status === 'completed' ? 'fa-check-circle' :
                            assignment.status === 'cancelled' ? 'fa-ban' :
                            assignment.status === 'in-progress' ? 'fa-hourglass-half' : 'fa-question-circle'
                        }`}></i>
                        {assignment.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">{new Date(assignment.assigned_date).toLocaleDateString()}</td>
                  <td className="px-6 py-3">
                    <span className="inline-flex overflow-hidden rounded-md  bg-white">
                    {auth.is_superuser && ( 
                      <Link href={route('assignments.edit', assignment.id)}
                        className="inline-block p-2 text-purple-700 hover:bg-gray-50 focus:relative"
                        title="Edit "
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                    )}
                      <button  onClick={() => openAssignModal(assignment)}
                        className="inline-block  px-2 text-blue-700 hover:bg-gray-50 focus:relative"
                        title="View "
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    {auth.is_superuser && (
                      <button onClick={() => openDeleteModal(assignment.id)}
                        className="inline-block px-2 text-pink-700 hover:bg-gray-50 focus:relative"
                        title="Delete "
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className="inline-flex items-center w-full  mt-2 justify-end gap-3">
          <a
            href="#"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
          >
            <span className="sr-only">Prev Page</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <p className="text-xs text-gray-900">
             {page}  
            <span className="mx-0.25 px-2">of</span>
            {totalPages}
          </p>

          <a
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            href="#"
            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
          >
            <span className="sr-only">Next Page</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>


      
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-xl max-w-lg w-full transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Détails de l'Assignment</h3>

            {/* Compact Assignment Details */}
            <div className="text-sm text-gray-700">
              <p><strong>Assigned Date:</strong> {new Date(assignToShow.assigned_date).toLocaleDateString()}</p>
              <p><strong>Created At:</strong> {new Date(assignToShow.created_at).toLocaleDateString()}</p>
              <p><strong>Updated At:</strong> {new Date(assignToShow.updated_at).toLocaleDateString()}</p>
            </div>

            {/* Compact Task Details */}
            <div className="mt-3 text-sm text-gray-700">
              <p><strong>Task Name:</strong> {assignToShow.task.name}</p>
              <p><strong>Description:</strong> {assignToShow.task.description}</p>
              <p><strong>Priority:</strong> {assignToShow.task.priority}</p>
              <p><strong>Status:</strong> {assignToShow.task.status}</p>
            </div>

            <div className="mt-3">
              <table className="table-auto w-full text-sm text-gray-700">
                <strong>User :</strong>
                <tbody>
                    <tr className="border-b">
                      <td className="px-2 py-1">{assignToShow.user.name}</td>
                      <td className="px-2 py-1">{assignToShow.user.email}</td>
                      <td className="px-2 py-1">{assignToShow.user.role}</td>
                      <td className="px-2 py-1">{assignToShow.user.status}</td>
                    </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={closeAssignModal} className="bg-blue-600 text-white px-4 py-1 rounded shadow-md hover:bg-blue-700 transition-all duration-300">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}


      {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                  <h3 className="text-lg font-semibold mb-4">Êtes-vous sûr de vouloir supprimer cette tâche ?</h3>
                  <div className="flex justify-end">
                      <button
                          onClick={closeDeleteModal}
                          className="px-4 py-2 text-white bg-gray-600 rounded mr-2"
                      >
                          Annuler
                      </button>
                      <button
                          onClick={handleDelete}
                          className="px-4 py-2 text-white bg-red-600 rounded"
                      >
                          Supprimer
                      </button>
                  </div>
              </div>
          </div>
      )}
      <div>
        {message.error && (
                <div className="fixed bottom-4 left-4 w-full max-w-xs z-50">
                        <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg flex justify-between items-center opacity-100 transition-opacity duration-500 ease-in-out">
                                <p>{flash.error}</p>
                                <button className="text-white" onClick={() => setMessage({ ...message, error: null })}>
                                        <i className="fas fa-times"></i>
                                </button>
                        </div>
                </div>
        )}
        {message.success && (
                <div className="fixed bottom-4 left-4 w-full max-w-xs z-50">
                        <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg flex justify-between items-center opacity-100 transition-opacity duration-500 ease-in-out">
                                <p>{flash.success}</p>
                                <button className="text-white" onClick={() => setMessage({ ...message, success: null })}>
                                        <i className="fas fa-times"></i>
                                </button>
                        </div>
                </div>
        )}
      </div>

    </AuthenticatedLayout>
  );
};

export default Index;