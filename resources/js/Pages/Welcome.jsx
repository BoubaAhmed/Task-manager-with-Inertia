import { Head, Link } from '@inertiajs/react';
import image from '../../assets/images/logo2.png'
import me from '../../assets/images/userProfile.jpg'
import './Welcome.css'
import laravelLogo from '../../assets/images/laravel.svg'
import logo_react from '../../assets/images/logo_react.svg'
import tailwindlogo from '../../assets/images/tailwind.png'
import MySQLogo from '../../assets/images/MySQL.jpeg'


export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-10 text-black/50 dark:bg-black dark:text-white/50">
                {/* <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[777px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                /> */}
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className=" grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <img src={image} alt="" width={150} />
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-2 text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                                    >
                                        <span className="absolute -end-full transition-all group-hover:end-2">
                                        <svg
                                            className="size-5 rtl:rotate-180"
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
                                        Dashboard
                                    </Link>                                    
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="group inline-block rounded bg-gradient-to-r me-2 from-indigo-700  to-green-600 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                                        >
                                            <span className="block rounded-sm bg-white px-5 py-2 text-sm font-medium group-hover:bg-transparent">
                                                Se connecter
                                            </span>
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="group inline-block rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-zinc-600 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                                        >
                                            <span  className="block rounded bg-white px-5 py-2 text-sm font-medium group-hover:bg-transparent">
                                                Registre
                                            </span>                                            
                                        </Link>
                                    </>
                                )}
                                
                            </nav>
                        </header>

                        <main className="mt-20">
                            <div className="relative z-10 max-w-8xl px-6 mx-auto">
                                <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
                                    <div class="shadow-circle absolute rounded-full  shadow-2xl"></div>
                                    <div class="shadow-circle absolute rounded-full bg-transparent shadow-lg"></div>
                                    <div class="shadow-circle absolute rounded-full bg-transparent shadow-lg"></div>
                                </div>
                                <section id="introduction" className='max-w-2xl m-10 mx-auto text-center '>
                                    <h3 className="font-semibold text-6xl leading-6 text-black dark:text-white">Bienvenue sur <span className='text-10xl text-indigo-500'>Task-y</span></h3>
                                    <p className="mt-20 text-base text-black dark:text-white">
                                        Gérez vos tâches sans effort avec <span className='bg-yellow-500 rounded px-2 py-1 font-bold'>Task-y</span>. Suivez vos projets, attribuez des tâches, définissez des échéances et restez organisé avec une interface conviviale.
                                    </p>
                                </section>

  

                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-24">
                                    <section id="key-features" className='bg-white rounded p-6 shadow-lg border-0 m-2 mt-24'>
                                        <h3 className="font-semibold text-xl leading-6 text-black dark:text-white">Fonctionnalités principales</h3>
                                        <ul className="mt-4 list-inside text-base text-black dark:text-white">
                                            <li>✔ Créez, attribuez et gérez les tâches facilement.</li>
                                            <li>✔ Suivez l'état des tâches, les échéances et les niveaux de priorité.</li>
                                            <li>✔ Collaborez avec les membres de l'équipe et suivez les progrès en temps réel.</li>
                                            <li>✔ Interface conviviale avec des outils puissants de gestion des tâches.</li>
                                        </ul>
                                    </section>

                                    {/* Introduction personnelle (À propos de moi) */}
                                    <section id="developer-introduction" className='bg-white rounded p-6 shadow-lg border-0 m-2 mt-24'>
                                        <h3 className="font-semibold text-xl leading-6 text-black dark:text-white">À propos du développeur</h3>
                                        <div className="flex items-center mt-4">
                                            <img
                                                id="developer-image"
                                                className="h-20 w-20 rounded border-2 border-black dark:border-white"
                                                src={me} alt="Développeur"
                                            />
                                            <div className="ml-4">
                                                <h4 className="text-lg font-medium text-black dark:text-white">Bonjour, je suis Bouba Ahmed</h4>
                                                <p className="text-base text-black dark:text-white">
                                                    J'ai créé cette application de gestion des tâches pour aider les gens à rester organisés et améliorer leur productivité. En tant que développeur passionné par le développement logiciel, je pense que cette application facilitera la gestion des tâches pour tout le monde !
                                                </p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Appel à l'action */}
                                    <section id="cta" className='bg-white rounded p-6 shadow-lg border-0 m-2 mt-24'>
                                        <h3 className="font-semibold text-xl leading-6 text-black dark:text-white">Commencez maintenant</h3>
                                        <p className="mt-4 text-base text-black dark:text-white">
                                            Prêt à gérer vos tâches ?  Commencez dès aujourd'hui en vous inscrivant !
                                        </p>
                                        <Link
                                            href={route('login')}
                                            className="group me-3 mt-5 inline-block rounded bg-gradient-to-r from-green-500 via-indigo-500 to-blue-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                                        >
                                            <span className="block rounded-sm bg-white px-8 py-2 text-sm font-medium group-hover:bg-transparent">
                                                Registre
                                            </span>
                                        </Link>
                                    </section>

                                    <section id="technologies" className='bg-white rounded p-6 shadow-lg border-0 m-2 mt-24'>
                                        <h3 className="font-semibold text-xl leading-6 text-black dark:text-white">Technologies utilisées</h3>
                                        <p className="mt-4 text-base text-black dark:text-white">
                                            Développé avec React.js, Laravel et MySQL pour une expérience fluide de gestion des tâches.
                                        </p>
                                        <div className="flex mt-4">
                                            <img src={logo_react} alt="React" className="h-6 w-6 mr-2" />
                                            <img src={laravelLogo} alt="Laravel" className="h-6 w-6 mr-2" />
                                            <img src={MySQLogo} alt="Laravel" className="h-7 w-8 mr-2" />
                                            <img src={tailwindlogo} alt="MySQL" className="h-5 w-8" />
                                        </div>
                                    </section>

                                </div>
                            </div>
                        </main>


                        {/* Footer */}
                        <footer className=" text-black py-4 mt-24">
                            <div className="text-center mt-24">
                                <p>© 2025 Tasky. All rights reserved.</p>
                                <div className="mt-2">
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="mr-4">LinkedIn</a>
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="mr-4">GitHub</a>
                                    <a href="mailto:developer@yourapp.com" className="mr-4">Contact</a>
                                </div>
                            </div>
                        </footer>

                    </div>
                </div>
            </div>
        </>
    );
}
