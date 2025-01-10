import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; 
import { Inertia } from '@inertiajs/inertia';
import { Head, useForm } from '@inertiajs/react';

const Edit = ({ user }) => {

  const { data, setData, put, processing, errors } = useForm({
      name: user.name || '',
      email: user.email || '',
      password: '',
      password_confirmation: '',
      phone_number: user.phone_number || '',
      role: user.role || '',
      status: user.status || '',
      is_superuser: user.is_superuser || false,
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setData(name, type === 'checkbox' ? checked : value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      put(route('users.update', user.id),data);
    };

  return (
    <AuthenticatedLayout>
      <Head title="Modifier User" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-sm">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 animate-fade-in">
          <h2 className="text-center py-3 font-bold text-xl">Edit User</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="mt-1 block w-full text-sm border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
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
                  className="mt-1 block w-full text-sm border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
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
                  Password (Leave blank to keep current)
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="mt-1 block w-full text-sm border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
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
                />
                {errors.password_confirmation && (
                  <p className="text-red-500 text-xs mt-2 animate-pulse">
                    {errors.password_confirmation}
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-xs mt-2 animate-pulse">
                    {errors.status}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone_number"
                  value={data.phone_number}
                  onChange={handleChange}
                  className="mt-1 block w-full  text-sm border-gray-300 rounded-md"
                  placeholder="Optional"
                />
                {errors.phone_number && (
                  <p className="text-red-500 text-xs mt-2 animate-pulse">
                    {errors.phone_number}
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
              {errors.is_superuser && (
                  <p className="text-red-500 text-xs mt-2 animate-pulse">
                    {errors.is_superuser}
                  </p>
                )}
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
                  Updating User...
                </>
              ) : (
                <>
                  <i className="fas fa-edit mr-2"></i>
                  Update User
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

export default Edit;
