import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

const Create = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone_number: '',
    role: '',
    status: '',
    is_superuser: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData(name, type === 'checkbox' ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('users.store'), {
      onSuccess: () => {
        // 
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Create User" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-sm">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 animate-fade-in">
          <h2 className='text-center py-3 font-bold text-xl'>
            <i className="fas fa-user-plus mr-2"></i>
             Ajouter  Utilisateur
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                  <span
                    className="ml-1 text-gray-400 text-xs italic"
                    title="Enter the user's full name"
                  >
                    (e.g., Bouba Ahmed)
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="mt-1 block w-full text-sm border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  placeholder=" Bouba Ahmed"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-2 animate-pulse">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="mt-1 block w-full  text-sm border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  placeholder="user@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-2 animate-pulse">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="mt-1 block w-full text-sm border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  placeholder="At least 8 characters"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-2 animate-pulse">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  onChange={handleChange}
                  className="mt-1 block w-full text-sm border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Re-enter password"
                  required
                />
                {errors.password_confirmation && (
                  <p className="text-red-500 text-xs mt-2 animate-pulse">
                    {errors.password_confirmation}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone_number"
                  value={data.phone_number}
                  onChange={handleChange}
                  className="mt-1 block w-full text-sm border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Optional"
                />
                {errors.phone_number && (
                  <p className="text-red-500 text-xs mt-2 animate-pulse">
                    {errors.phone_number}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  name="role"
                  value={data.role}
                  onChange={handleChange}
                  className="mt-1 block w-full text-sm border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  required
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="designer">Designer</option>
                  <option value="developer">Developer</option>
                  <option value="tester">Tester</option>
                  <option value="manager">Manager</option>
                  <option value="analyst">Analyst</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-2 animate-pulse">
                    {errors.role}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                  className="mt-1 block w-full text-sm border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  required
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-xs mt-2 animate-pulse">
                    {errors.status}
                  </p>
                )}
              </div>

              <div className='inline-flex items-center space-x-2'>
                <label
                  htmlFor="is_superuser"
                  className="block text-sm font-medium text-gray-700"
                >
                  Superuser
                </label>
                <input
                  type="checkbox"
                  name="is_superuser"
                  checked={data.is_superuser}
                  onChange={handleChange}
                  className="mt-1  text-sm rounded"
                />
              </div>
            </div>

            <div className="mt-6 text-end ">
              <button
                type="submit"
                className="w- text-sm mx-auto px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-transform duration-300 transform hover:scale-105"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Creating User...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus mr-2"></i>
                    Create User
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;
