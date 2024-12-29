import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';

// Registering components for Chart.js
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
);

// Reusable Card Component
const StatCard = ({ title, children }) => (
    <div className="bg-white p-6 shadow rounded-lg">
        <h4 className="text-xl font-semibold mb-4">{title}</h4>
        {children}
    </div>
);

export default function Dashboard({
    usersCount, 
    activeUsersCount, 
    projectsCount, 
    completedProjectsCount, 
    tasksCount, 
    completedTasksCount, 
    inProgressTasksCount, 
    overdueTasksCount, 
    projectsByStatus, 
    tasksOverTime,     
    tasksStatusBreakdown, 
    projectsOverTime,
}) {
    // Chart.js data for Projects by Status
    const projectsStatusData = {
        labels: Object.keys(projectsByStatus),
        datasets: [{
            data: Object.values(projectsByStatus),
            backgroundColor: ['#06D001', '#E88D67', '#3357FF'],
            hoverOffset: 4,
        }],
    };

    const tasksOverTimeData = {
        labels: tasksOverTime.map(item => new Date(0, item.month - 1).toLocaleString('default', { month: 'long' })).reverse(),
        datasets: [{
            label: 'Tasks Created',
            data: tasksOverTime.map(item => item.task_count).reverse(),
            borderColor: '#433878',
            backgroundColor: '#6EC207',
            fill: true,
            tension: 0.4,
        }],
    };
    // Chart.js data for Task Status Breakdown
    const tasksStatusData = {
        labels: Object.keys(tasksStatusBreakdown),
        datasets: [{
            data: Object.values(tasksStatusBreakdown),
            backgroundColor: ['#5A639C', '#FFC300', '#33FF57'],
            hoverOffset: 4,
        }],
    };

    // Chart.js data for Projects Over Time
    const projectsOverTimeData = {
        labels: projectsOverTime.map(item => new Date(0, item.month - 1).toLocaleString('default', { month: 'long' })).reverse(),
        datasets: [{
            label: 'Projects Created',
            data: projectsOverTime?.map(item => item.project_count),
            borderColor: '#F14A00',
            backgroundColor: '#6439FF',
            fill: true,
            tension: 0.4,
        }],
    };

    // Chart.js data for Tasks Overview (Bar Chart)
    const tasksBarChartData = {
        labels: ['total', 'completed', 'in-progress', 'overdue'],
        datasets: [{
            label: 'Tasks Overview',
            data: [tasksCount, completedTasksCount, inProgressTasksCount, overdueTasksCount],
            backgroundColor: ['#6439FF', '#624E88', '#399918', '#FF7F3E'],
            borderWidth: 1,
        }],
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard Overview</h2>}
        >
            <Head title="Dashboard" />

            <div className="">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                <StatCard title="Tasks Overview">
                                    <Bar 
                                        data={tasksBarChartData} 
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: { display: false },
                                            },
                                            scales: {
                                                x: { title: { display: false, text: 'Task Status' } },
                                                y: { beginAtZero: true, title: { display: false, text: 'Count' } },
                                            },
                                        }} 
                                    />
                                </StatCard>
                                <StatCard title="Tasks Over Time">
                                    <Line
                                        data={tasksOverTimeData}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                tooltip: {
                                                    callbacks: {
                                                        label: (context) => `${context.raw} tasks created`,
                                                    },
                                                },
                                            },
                                            scales: {
                                                x: {
                                                    title: {
                                                        display: false,
                                                        text: 'Months',
                                                    },
                                                },
                                                y: {
                                                    beginAtZero: true, // Ensure y-axis starts from 0
                                                    title: {
                                                        display: false,
                                                        text: 'Number of Tasks',
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </StatCard>
                                <StatCard title="Projects Over Time">
                                    <Line data={projectsOverTimeData} />
                                </StatCard>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            <StatCard title="Projects by Status">
                                <div style={{ margin: '0 auto' , width:'70%' }} className=''>
                                <Doughnut
                                    data={projectsStatusData} 
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'bottom', 
                                            },
                                        },
                                    }} 
                                />
                                </div>
                            </StatCard>
                                <StatCard title="Tasks Status Breakdown">
                                <div style={{ margin: '0 auto' , width:'70%' }} className=''>
                                    <Doughnut
                                        data={tasksStatusData} 
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'bottom', 
                                                },
                                            },
                                        }}
                                    />
                                </div>
                                </StatCard>

                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
