import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import logo from '../../assets/images/logo2.png'

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                <div className='flex justify-center'>
                    <ApplicationLogo imageSrc={logo} className="block h-14 w-auto my-10 text-center fill-current text-gray-800" />
                </div>
                {children}
            </div>
        </div>
    );
}
