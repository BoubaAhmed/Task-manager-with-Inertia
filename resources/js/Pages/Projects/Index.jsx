import React, { useEffect, useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';

const Index = ({ projects }) => {
  const { delete: deleteRequest } = useForm();
  const { flash , auth } = usePage().props;
  const [message, setMessage] = useState({ success: null, error: null });

  useEffect(() => {
    if (flash.success) {
      setMessage({ success: flash.success, error: null });
    } else if (flash.error) {
      setMessage({ success: null, error: flash.error });
    }
  }, [flash]);

  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // State for user info modal
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Calculate current projects
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteClick = (projectId) => {
    setProjectToDelete(projectId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      deleteRequest(`/projects/${projectToDelete}`, {
        onSuccess: () => setShowModal(false),
        onError: () => setShowModal(false),
      });
    }
  };

  const handleProjectInfoClick = (user) => {
    setSelectedProject(user);
    setShowProjectModal(true);
  };

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 flex items-center gap-2">
            <i className="fas fa-folder-open text-indigo-600"></i> Projects
          </h2>
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
          {/* {auth.is_superuser &&  */}
          <Link
            href="/projects/create"
            className="group relative inline-flex items-center overflow-hidden rounded border border-current px-4 py-2 text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
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
            <span className="text-xs font-medium transition-all group-hover:me-2">Ajouter</span>
          </Link>
          {/* }*/}
        </div>
      }
    >
      <Head title="Projects" />

      {/* Delete Confirmation Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        closeable={true}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold">Are you sure you want to delete this project?</h3>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      <Modal show={showProjectModal} onClose={() => setShowProjectModal(false)} closeable={true}>
        {selectedProject && (
          <div className="p-6 bg-white rounded-lg shadow-lg transition-all transform duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Project Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Project Name */}
              <div className="flex flex-col">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="text-lg text-gray-800">{selectedProject.name}</span>
              </div>

              {/* Project Status */}
              <div className="flex flex-col">
                <span className="text-gray-600 font-medium">Status:</span>
                <span
                  className={`text-lg font-semibold ${selectedProject.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}
                >
                  {selectedProject.status}
                </span>
              </div>

              {/* Project Priority */}
              <div className="flex flex-col">
                <span className="text-gray-600 font-medium">Priority:</span>
                <span className={`text-lg text-${selectedProject.priority === 'high' ? 'red' : selectedProject.priority === 'medium' ? 'yellow' : 'green'}-600`}>
                  {selectedProject.priority}
                </span>
              </div>

              {/* Start and End Dates */}
              <div className="flex flex-col">
                <span className="text-gray-600 font-medium">Start Date:</span>
                <span className="text-lg text-gray-800">
                  {new Date(selectedProject.start_date).toLocaleDateString()}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-600 font-medium">End Date:</span>
                <span className="text-lg text-gray-800">
                  {new Date(selectedProject.end_date).toLocaleDateString()}
                </span>
              </div>

              {/* Project Description */}
              <div className="flex flex-col col-span-2">
                <span className="text-gray-600 font-medium">Description:</span>
                <span className="text-lg text-gray-800">{selectedProject.description}</span>
              </div>

              {/* Tasks */}
              <div className="flex flex-col col-span-2">
                <span className="text-gray-600 font-medium">Tasks:</span>
                {selectedProject.tasks.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {selectedProject.tasks.map((task, index) => (
                      <li key={task.id} className="text-gray-800">
                        <span className="font-medium">Task {index + 1}: </span>
                        {task.name} - <span className={`${task.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>{task.status}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-500">No tasks available.</span>
                )}
              </div>

              {/* User Information */}
              <div className="flex flex-col col-span-2">
                <span className="text-gray-600 font-medium">User:</span>
                <p className="text-lg text-gray-800">Name: {selectedProject.user.name}</p>
                <p className="text-lg text-gray-800">Email: {selectedProject.user.email}</p>
                <p className="text-lg text-gray-800">Role: {selectedProject.user.role}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-xl">
        <p className="text-md font-bold leading-tight text-gray-900">
          There are {projects.length} projects available:
        </p>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <i className="fas fa-user mr-2 text-blue-500"></i> Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <i className="fas fa-info-circle mr-2 text-green-500"></i> Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <i className="fas fa-flag mr-2 text-red-500"></i> Priority
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <i className="fas fa-check-circle mr-2 text-green-300"></i> Progress
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <i className="fas fa-calendar-alt mr-2 text-yellow-500"></i> Start
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <i className="fas fa-calendar-check mr-2 text-teal-500"></i> End
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <i className="fas fa-user-circle mr-2 text-cyan-400"></i> Manager
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <i className="fas fa-cog mr-2 text-purple-500"></i> Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-100">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{project.name}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{project.status}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{project.priority}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="relative pt-1">
                      <div className="flex mb-2">
                        <div className={`w-full ${project.completion_percentage === 0 ? ' bg-red-500' : ' bg-gray-200' } rounded-full h-3.5`}>
                          <div
                            className={`h-3.5 rounded-full ${project.completion_percentage === 100 ? 'bg-green-500' : project.completion_percentage === 0 ? 'bg-red-500' : 'bg-blue-600'}`}
                            style={{ width: `${project.completion_percentage.toFixed(2)}%` }}
                          >
                            <span className="absolute left-1/2 transform -translate-x-1/2 text-xs font-semibold text-white">
                              {project.completion_percentage.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(project.start_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(project.end_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{project.user.name}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                      <Link  href={`/projects/${project.id}/edit`}
                        className="inline-block rounded-md px-4 py-1 text-sm text-gray-500 hover:text-gray-700 focus:relative"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>

                      <button onClick={() => handleProjectInfoClick(project)}
                        className="inline-block rounded-md px-4 py-1 text-sm text-gray-500 hover:text-gray-700 focus:relative"
                      >
                        <i className="fas fa-eye mr-2"></i>
                      </button>

                      <button onClick={() => handleDeleteClick(project.id)}
                        className="inline-block rounded-md bg-white px-4 py-1 text-sm text-blue-500 shadow-sm focus:relative"
                      >
                        <i className="fas fa-trash-alt"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="inline-flex items-center justify-center gap-3 mt-4">
          <a
            href="#"
            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                paginate(currentPage - 1);
              }
            }}
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
            {currentPage} <span className="mx-0.25">/</span> {totalPages}
          </p>

          <a
            href="#"
            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                paginate(currentPage + 1);
              }
            }}
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
    </AuthenticatedLayout>
  );
};

export default Index;
