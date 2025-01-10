import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ErrorPage() {
    return (
        <AuthenticatedLayout>
            <Head title="Error" />

            <div className="flex items-center justify-center mt-40 bg-gray-100 py-12">
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold text-red-500 animate-pulse">404</h1>
                        <h2 className="mt-4 text-2xl font-semibold text-gray-800">Page non trouvée</h2>
                        <p className="mt-2 text-gray-600">Désolé, la page que vous recherchez n'existe pas.</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}