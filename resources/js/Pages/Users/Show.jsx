import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show() {
    const { user } = usePage().props;
    const [activeTab, setActiveTab] = useState('projects');

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{user.name}</h2>}
        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4 flex gap-6">
                <div className="w-1/4 bg-white shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Informations sur l'utilisateur</h3>
                    <div className="space-y-2">
                        <p><strong>Nom Complete:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Tel:</strong> {user.phone_number || 'N/A'}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Status:</strong> {user.status}</p>
                        <p><strong>Admin:</strong> {user.is_superuser ? 'Yes' : 'No'}</p>
                    </div>
                </div>

                <div className="w-3/4 bg-white shadow-sm sm:rounded-lg">
                    <div className="border-b flex">
                        <button
                            className={`px-4 py-2 w-1/4 text-center flex items-center justify-center gap-2 ${
                                activeTab === 'projects' ? 'bg-green-600 text-white rounded-tl-lg' : 'hover:bg-gray-100'
                            }`}
                            onClick={() => setActiveTab('projects')}
                        >
                            <i className="fas fa-clipboard-list"></i>
                            Projets
                        </button>

                        <button
                            className={`px-4 py-2 w-1/4 text-center flex items-center justify-center gap-2 ${
                                activeTab === 'tasks' ? 'bg-green-600 text-white' : 'hover:bg-gray-100'
                            }`}
                            onClick={() => setActiveTab('tasks')}
                        >
                            <i className="fas fa-tasks"></i>
                            Taches
                        </button>

                        <div className="ml-auto">
                            <Link
                                className="hover:bg-yellow-500 text-dark px-4 py-2 rounded  flex items-center gap-2"
                                href={`/users`}
                            >
                                Quitter
                                <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>


                    <div className="p-6">
                        {activeTab === 'projects' && (
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Projets</h3>
                                {user.projects.length > 0 ? (
                                    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {user.projects.map((project) => (
                                            <div key={project.id} className="relative bg-gray-100 hover:cursor-pointer hover:bg-slate-200 hover:shadow-lg transform  opacity-75 hover:opacity-100 hover:scale-105 transition duration-300 shadow rounded-lg p-4">
                                                <span
                                                    className={`absolute top-0 right-0 bg-${
                                                        project.status === 'completed'
                                                            ? 'green-500'
                                                            : project.status === 'in-progress'
                                                            ? 'blue-600'
                                                            : 'black'
                                                    } text-white text-xs font-bold px-3 py-1 rounded-lg`}
                                                >
                                                    {project.status}
                                                </span>
                                                <h4 className="text-md font-bold mb-2">{project.name}</h4>
                                                <p><strong>Priorité :</strong> {project.priority}</p>
                                                <p><strong>début:</strong> {new Date(project.start_date).toLocaleDateString()}</p>
                                                <p><strong>fin:</strong> {new Date(project.end_date).toLocaleDateString()}</p>
                                                <p><strong>Description:</strong> {project.description || 'N/A'}</p>
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                                    <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                                                        <Link href={`/projects`} className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-gray-500 hover:text-gray-700">
                                                            <i className="fas fa-eye"></i> Voir
                                                        </Link>
                                                    </div>
                                                </div>
                                                </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>Aucun projet attribué.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'tasks' && (
                           <div>
                                <h3 className="text-lg font-semibold mb-4">Tâches</h3>
                                {user.tasks?.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {user.tasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className="relative bg-gray-100 hover:cursor-pointer hover:bg-slate-200 hover:shadow-lg transform opacity-75 hover:opacity-100 hover:scale-105 transition duration-300 shadow rounded-lg p-4"
                                            >
                                                <span
                                                    className={`absolute top-0 right-0 bg-${
                                                        task.status === 'completed'
                                                            ? 'green-500'
                                                            : task.status === 'in-progress'
                                                            ? 'blue-600'
                                                            : 'black'
                                                    } text-white text-xs font-bold px-3 py-1 rounded-lg`}
                                                >
                                                    {task.status}
                                                </span>
                                                <h4 className="text-md font-bold mb-2">{task.name}</h4>
                                                <p><strong>Priorité:</strong> {task.priority}</p>
                                                <p><strong>début:</strong> {new Date(task.start_date).toLocaleDateString()}</p>
                                                <p><strong>fin:</strong> {task.end_date ? new Date(task.end_date).toLocaleDateString() : 'N/A'}</p>
                            
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                                    <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                                                        <Link
                                                            href={`/tasks`} 
                                                            className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-gray-500 hover:text-gray-700"
                                                        >
                                                            <i className="fas fa-eye"></i> Voir
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>Aucune tâche affecté.</p>
                                )}
                            </div>
                       
                        )}
                    </div>
                </div>
            </div>            
        </AuthenticatedLayout>
    );
}
