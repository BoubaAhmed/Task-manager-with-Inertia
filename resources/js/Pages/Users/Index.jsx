import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

const Index = ({ users }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [userList, setUserList] = useState(users);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

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

    useEffect(() => {
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setUserList(filteredUsers);
    }, [searchQuery, users]);
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const paginatedUsers = userList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const handleDeleteClick = (projectId) => {
        setUserToDelete(projectId);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        if (userToDelete) {
            deleteRequest(`/projects/${projectToDelete}`, {
            onSuccess: () => setShowModal(false),
            onError: () => setShowModal(false),
            });
        }
    };

    const handleUserInfoClick = (user) => {
        setSelectedUser(user);
        setShowUserModal(true);
    };
    

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold leading-tight text-gray-900 flex items-center gap-2">
                        <i className="fas fa-tasks text-indigo-600"></i> Utilisateurs
                    </h2>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Rechercher des utilisateurs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-4 py-1 border-2 border-indigo-600 rounded text-sm shadow-xl"
                        />
                        {auth.is_superuser && (
                            <Link
                                href={route('users.create')}
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
            <Head title="Utilisateurs" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-xl">
                <div className="flex justify-between mb-2">
                    <p className="text-md font-bold leading-tight text-gray-900">
                        There are {users.length} users available except admins :
                    </p>    
                    <div className="flex justify-end">
                        {Array.from({ length: Math.ceil(userList.length / itemsPerPage) }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-3 py-1/2 rounded-md mx-1 ${currentPage === index + 1 ? 'bg-white text-dark' : 'bg-gray-200'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-500 text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                                    <i className="fas fa-user mr-2 text-blue-500"></i> Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                                    <i className="fas fa-envelope mr-2 text-green-500"></i> Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                                    <i className="fas fa-briefcase mr-2 text-yellow-500"></i> Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                                    <i className="fas fa-check-circle mr-2 text-red-500"></i> Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider">
                                    <i className="fas fa-cogs mr-2 text-purple-500"></i> Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                                    <td className={`px-4 py-2 whitespace-nowrap text-sm text-gray-500`}>
                                    <span className={`flex items-center gap-2 ${user.status === 'active' ? 'text-green-400 font-bold' :
                                            user.status === 'inactive' ? 'font-bold text-blue-400' :
                                            user.status === 'pending' ? ' font-bold text-yellow-500' : 'font-bold text-purple-800'
                                        } text-white px-3 rounded-full`}>
                                        <i className={`fas ${
                                            user.status === 'active' ? 'fa-check-circle' :
                                            user.status === 'inactive' ? 'fa-ban' :
                                            user.status === 'pending' ? 'fa-hourglass-half' : 'fa-question-circle'
                                        }`}></i>
                                        {user.status}
                                    </span>
                                    </td>
                                    <td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                                        <div className="inline-flex rounded-lg  p-1">
                                            {auth.is_superuser &&  
                                            <Link href={`/users/${user.id}/edit`}
                                            className="inline-block rounded-md px-4  text-sm text-gray-500 hover:text-gray-700 focus:relative"
                                            >
                                            <i className="fas fa-edit"></i>
                                            </Link>
                                            }
                    
                                            <Link href={`/users/${user.id}`}
                                            className="inline-block rounded-md px-4  hover:bg-green-500  text-sm text-gray-500 hover:text-gray-200 focus:relative"
                                            >
                                            <i className="fas fa-eye "></i>
                                            </Link>
                    
                                            {auth.is_superuser &&  
                                            <button onClick={() => handleDeleteClick(user.id)}
                                            className="inline-block rounded-md px-4  text-sm text-purple-500 hover:text-red-600 shadow-sm focus:relative"
                                            >
                                            <i className="fas fa-trash-alt"></i>
                                            </button>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


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

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
                closeable={true}
            >
            <div className="p-4">
                <h3 className="text-lg font-semibold">Are you sure you want to delete this user?</h3>
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
            
            <Modal show={showUserModal} onClose={() => setShowUserModal(false)} closeable={true}>
            {selectedUser && (
                <div className="p-6 bg-white rounded-lg shadow-lg transition-all transform duration-300 ease-in-out">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">User Information</h3>
               
                </div>
            )}
            </Modal>
            
        </AuthenticatedLayout>
    );
};

export default Index;
