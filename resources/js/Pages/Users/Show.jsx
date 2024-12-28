import React from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show() {
    const { user } = usePage().props;

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Details</h2>}
        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <div className="user-details mb-6">
                            <h3 className="text-lg font-semibold mb-4">User Information</h3>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone Number:</strong> {user.phone_number || 'N/A'}</p>
                            <p><strong>Role:</strong> {user.role}</p>
                            <p><strong>Status:</strong> {user.status}</p>
                            <p><strong>Superuser:</strong> {user.is_superuser ? 'Yes' : 'No'}</p>
                        </div>
                        <hr className="my-6" />
                        <div className="projects mb-6">
                            <h3 className="text-lg font-semibold mb-4">Projects</h3>
                            {user.projects.length > 0 ? (
                                <ul className="list-disc list-inside">
                                    {user.projects.map((project) => (
                                        <li key={project.id}>
                                            <strong>{project.name}</strong> - {project.status}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No projects assigned.</p>
                            )}
                        </div>
                        <hr className="my-6" />
                        <div className="tasks">
                            <h3 className="text-lg font-semibold mb-4">Tasks</h3>
                            {user.tasks?.length > 0 ? (
                                <ul className="list-disc list-inside">
                                    {user.tasks.map((task) => (
                                        <li key={task.id}>
                                            <strong>{task.name}</strong> - {task.status} (Due: {task.end_date || 'N/A'})
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No tasks assigned.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.history.back()}>
                        Close
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
