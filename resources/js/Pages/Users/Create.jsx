import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Adjust the import based on your file structure
import { useForm } from '@inertiajs/react';

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
        // Optionally handle success, like clearing the form or redirecting
      },
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Create New User
          </h2>
        </div>
      }
    >
      <div className="flex items-center justify-center min-h-screen bg-gray-100 py-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
                required
              />
              {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
                required
              />
              {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
                required
              />
              {errors.password_confirmation && <p className="text-red-500 text-xs mt-2">{errors.password_confirmation}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={data.phone_number}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
                placeholder="Optional"
              />
              {errors.phone_number && <p className="text-red-500 text-xs mt-2">{errors.phone_number}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={data.role}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
                required
              >
                <option value="designer">Designer</option>
                <option value="developer">Developer</option>
                <option value="tester">Tester</option>
                <option value="manager">Manager</option>
                <option value="analyst">Analyst</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-2">{errors.role}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={data.status}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              {errors.status && <p className="text-red-500 text-xs mt-2">{errors.status}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="is_superuser" className="block text-sm font-medium text-gray-700">
                Superuser
              </label>
              <input
                type="checkbox"
                name="is_superuser"
                checked={data.is_superuser}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.is_superuser && <p className="text-red-500 text-xs mt-2">{errors.is_superuser}</p>}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
              disabled={processing}
            >
              {processing ? 'Creating User...' : 'Create User'}
            </button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;
