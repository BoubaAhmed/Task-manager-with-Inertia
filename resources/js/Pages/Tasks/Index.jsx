import { useEffect, useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ taches, projects }) => {
    const { delete: deleteRequest } = useForm();
    const projectsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [showTaskModal, setShowTaskModal] = useState(false); // State for task details modal
    const [taskToShow, setTaskToShow] = useState(null);
    const { flash , auth } = usePage().props;
    const [message, setMessage] = useState({ success: null, error: null });

    useEffect(() => {
        if (flash.success) {
        setMessage({ success: flash.success, error: null });
        } else if (flash.error) {
        setMessage({ success: null, error: flash.error });
        }
    }, [flash]);
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage({ success: null, error: null });
        }, 5000);
    }, [message]);

  // Filter logic
  const filteredTaches = taches.filter((tache) => {
    return (
      (selectedProject ? String(tache.project_id) === String(selectedProject) : true) &&
      (selectedStatus ? tache.status === selectedStatus : true) &&
      (tache.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentTaches = filteredTaches.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredTaches.length / projectsPerPage);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Show modal for delete confirmation
  const openDeleteModal = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };
  const handleDelete = () => {
    if (taskToDelete) {
      deleteRequest(`/tasks/${taskToDelete}`, {
        onSuccess: () =>  closeDeleteModal(),
        onError: () =>  closeDeleteModal(),
      });
    }
  };

  // Handle filter change
  const handleFilterChange = (type, value) => {
    if (type === 'project') {
      setSelectedProject(value);
    } else if (type === 'status') {
      setSelectedStatus(value);
    }
  };

  // Open Task Info Modal
  const openTaskModal = (tache) => {
    setTaskToShow(tache);
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setShowTaskModal(false);
    setTaskToShow(null);
  };

return (
    <AuthenticatedLayout
        header={
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold leading-tight text-gray-900 flex items-center gap-2">
                    <i className="fas fa-tasks text-indigo-600"></i> Tâches
                </h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Rechercher des tâches..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-1 border-2 border-indigo-600 rounded text-sm shadow-xl "
                    />
                    <select
                        value={selectedProject}
                        onChange={(e) => handleFilterChange('project', e.target.value)}
                        className="px-4 py-1 border rounded border-2 border-indigo-600 text-sm"
                    >
                        <option value="">Filtrer par projet</option>
                        {projects?.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name} - {project.id}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedStatus}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="px-8 py-1 border rounded border-2 border-indigo-600 text-sm"
                    >
                        <option value="">Filtrer par statut</option>
                        <option value="completed">Complété</option>
                        <option value="in-progress">En cours</option>
                        <option value="pending">En attente</option>
                    </select>
                    {auth.is_superuser &&  
                    <Link
                        href={route('tasks.create')}
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
                    }
                    <Link href={route('mytasks')} 
                            className="group relative inline-flex items-center overflow-hidden rounded border-0 shadow-lg text-stone-200 border-current px-4 py-2 bg-green-600 focus:outline-none focus:ring active:text-indigo-500">
                            <span className="absolute -end-full transition-all group-hover:end-1">
                                    <i className="fas fa-tasks"></i>
                            </span>
                            <span className="text-xs font-medium transition-all group-hover:me-2">
                            Mes Tâches
                        </span>
                    </Link>
                </div>
            </div>
        }
    >
        <Head title="Tâches" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-xl">
            <div className="inline-flex rounded w-full items-center justify-between gap-3 mt-4">
                    <div>
                    <p className="text-md font-bold leading-tight text-gray-900">
                        Il y a {taches.length} tâches disponibles :
                    </p>
                    </div>
                    <div className='inline-flex rounded items-center'>
                            <a
                                    href="#"
                                    className="inline-flex size-8 me-2 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                                    onClick={handlePreviousPage}
                            >
                                    <span className="sr-only">Page précédente</span>
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
                                    className="inline-flex size-8 ms-2 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                                    onClick={handleNextPage}
                            >
                                    <span className="sr-only">Page suivante</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {currentTaches?.map((tache) => (
                    <div key={tache.id} className="relative bg-white p-6 rounded-lg shadow-md hover:cursor-pointer hover:bg-slate-200 transition hover:scale-110 hover:shadow-xl group">
                        <span
                            className={`absolute top-0 left-0 bg-${
                                tache.status === 'completed'
                                    ? 'green-500'
                                    : tache.status === 'in-progress'
                                    ? 'blue-600'
                                    : 'black'
                            } text-white text-xs font-bold px-3 py-1 rounded-tr-lg rounded-bl-lg`}
                        >
                            {tache.status}
                        </span>
                        <span
                            className={`absolute top-0 right-0 bg-${
                                tache.completion_percentage === '100'
                                    ? 'green-500'
                                    : tache.completion_percentage === '50'
                                    ? 'blue-600'
                                    : 'black'
                            } text-white text-xs font-bold px-3 py-1 rounded-tr-lg rounded-bl-lg`}
                        >
                            {tache.completion_percentage} %
                        </span>
                        

                        <p className="mt-2 font-bold text-pink-700 ">{tache.project.name}</p>
                        <h2 className="text-lg font-semibold mb-2">{tache.name}</h2>
                        <p className="text-gray-700 text-center mb-4">
                            {tache.description && tache.description.length > 50 
                                    ? `${tache.description.slice(0, 50)}...` 
                                    : tache.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
                        </p>
                        <p className="text-gray-700 text-sm font-bold mb-3 absolute bottom-0 mt-2">
                            <strong>Limite :</strong> {new Date(tache.end_date).toLocaleDateString()}
                        </p>
                        <div className="absolute inset-0 flex items-center bg-gray-600 bg-opacity-70 rounded-lg justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="inline-flex rounded-lg  border border-gray-100 bg-gray-100 p-1">
                                    {auth.is_superuser &&  
                                    <Link href={route('tasks.edit', tache.id)}
                                            className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-gray-500 hover:text-gray-700 focus:relative"
                                    >
                                         <i className="fas fa-edit"></i>
                                         Modifier
                                    </Link>
                                    }

                                    <button onClick={() => openTaskModal(tache)}
                                            className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-gray-500 hover:text-gray-700 focus:relative"
                                    >
                                            
                                            <i className="fas fa-eye"></i> Voir
                                    </button>
                                    {auth.is_superuser &&  
                                    <button onClick={() => openDeleteModal(tache.id)}
                                            className="inline-flex items-center gap-2 rounded-md bg-white px-2 py-1 text-sm text-red-500 shadow-sm focus:relative"
                                    >
                                            <i className="fas fa-trash-alt"></i>
                                            Supprimer
                                    </button>
                                    }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {showTaskModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Détails de la tâche</h3>
                </div>
                <div className="flex flex-col">
                        <div className="relative w-full h-5 bg-gray-200 rounded-full mt-2">
                        <div  className={`absolute top-0 left-0 h-full rounded-full ${taskToShow?.completion_percentage === 100 ? 'bg-green-500' : 'bg-indigo-500'}`}
                                style={{ width: `${taskToShow?.completion_percentage}%` }}
                        ></div>
                        <span
                                className={`absolute top-0 left-0 right-0 bottom-0  flex items-center justify-center ${taskToShow?.completion_percentage === 100 ? 'text-gray-10' : 'text-gray-800'}  text-xs font-bold px-1 py-0.5 rounded-tr-lg rounded-bl-lg`}
                        >
                                {taskToShow?.completion_percentage}%
                        </span>
                        </div>
                </div>
                </div>

                        {/* Grid Layout for the Task Information (3 columns) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                <div>
                                        <p className="font-medium text-gray-600">Projet :</p>
                                        <p className="text-gray-800">{taskToShow?.project?.name}</p>
                                </div>
                                <div>
                                        <p className="font-medium text-gray-600">Nom de la tâche :</p>
                                        <p className="text-gray-800">{taskToShow?.name}</p>
                                </div>
                                <div>
                                        <p className="font-medium text-gray-600">Description :</p>
                                        <p className="text-gray-800">{taskToShow?.description}</p>
                                </div>
                                <div>
                                        <p className="font-medium text-gray-600">Priorité :</p>
                                        <p className="text-gray-800">{taskToShow?.priority}</p>
                                </div>
                                <div>
                                        <p className="font-medium text-gray-600">Statut :</p>
                                        <p className={`text-${taskToShow?.status === 'Completed' ? 'green' : 'yellow'}-500`}>
                                                {taskToShow?.status}
                                        </p>
                                </div>
                                <div>
                                        <p className="font-medium text-gray-600">Date de début :</p>
                                        <p className="text-gray-800">{new Date(taskToShow?.start_date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                        <p className="font-medium text-gray-600">Date de fin :</p>
                                        <p className="text-gray-800">{new Date(taskToShow?.end_date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                        <p className="font-medium text-gray-600">Créé le :</p>
                                        <p className="text-gray-800">{new Date(taskToShow?.created_at).toLocaleDateString()}</p>
                                </div>
                                <div>
                                        <p className="font-medium text-gray-600">Mis à jour le :</p>
                                        <p className="text-gray-800">{new Date(taskToShow?.updated_at).toLocaleDateString()}</p>
                                </div>

                                {/* Display Assigned Users */}
                        <div className="col-span-3">
                                        <p className="font-medium text-gray-600">Utilisateurs assignés :</p>
                                        <div className="space-y-2">
                                                {taskToShow?.assignments?.length > 0 ? (
                                                        <table className="w-full table-auto">
                                                                <tbody>
                                                                        {taskToShow.assignments.map((assign, index) => (
                                                                                <tr key={index} className="border-b">
                                                                                        <td className="px-4 py-2 text-gray-800">{assign.user.name}</td>
                                                                                        <td className="px-4 py-2 text-sm text-gray-600">{assign.user.email}</td>
                                                                                        <td className="px-4 py-2 text-xs text-gray-500">{assign.user.role} - {assign.user.status}</td>
                                                                                </tr>
                                                                        ))}
                                                                </tbody>
                                                        </table>
                                                ) : (
                                                        <p className="text-gray-500">Aucun utilisateur assigné</p>
                                                )}
                                        </div>
                                </div>
                        </div>

                        {/* Close Button */}
                        <div className="mt-6 flex justify-end">
                                <button
                                        onClick={closeTaskModal}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                                >
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
