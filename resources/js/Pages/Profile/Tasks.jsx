import Messages from "@/Components/Messages";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

const Tasks = ({ tasks }) => {
  console.log(tasks);
  const { patch } = useForm();

  const updateTaskStatus = (assignmentId, status) => {
    patch(`/assignments/${assignmentId}/${status}`);
  };

  const markAsCompleted = (assignmentId) => {
    updateTaskStatus(assignmentId, 'complete');
  };

  const markAsCancelled = (assignmentId) => {
    updateTaskStatus(assignmentId, 'cancel');
  };

  const markAsProgressing = (assignmentId) => {
    updateTaskStatus(assignmentId, 'progress');
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mes Tâches</h2>}
    >
      <Head title="Mes Tâches" />

      <div className="container mt-4 mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-xl">
        <h2 className="font-bold text-lg">Vous avez {tasks.length} tâches non déterminées :</h2>
        <div className="w-full p-6 animate-fade-in">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48">
              <p className="text-gray-500 text-lg">Vous n'avez aucune tâche assignée.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="relative p-4 bg-white hover:cursor-pointer hover:bg-slate-200 hover:shadow-lg transform hover:scale-105 transition duration-300 rounded-lg shadow hover:shadow-lg transition-shadow group"
                >
                  <p className={`absolute top-0 right-0 
                      bg-${task.status==='completed' ? 'green-500' : 
                        task.status==='in-progress' ? 'indigo-500' : 
                        task.status==='cancelled' ? 'cyan-600' :  
                        task.status==='pending' ? 'yellow-600' : ''
                      } text-gray-100 py-1 px-2 rounded-tl-lg rounded-br-lg text-sm`}> 
                    {task.status}
                  </p>
                  <h2 className="text-xl font-bold text-gray-800 mt-3 truncate underline"><span className="text-indigo-500 ">
                    Projet :
                    </span>
                      {task.task.project.name && task.task.project.name.length > 15
                              ? `${task.task.project.name.slice(0, 15)}...` 
                              : task.task.project.name || ''
                        }
                  </h2>
                  <h2 className="text-lg font-semibold text-gray-800 mt-1 truncate">
                        {task.task.name && task.task.name.length > 15
                              ? `${task.task.name.slice(0, 15)}...` 
                              : task.task.name || ''
                        }
                  </h2> 
                  <p className="text-gray-500 mt-2 text-sm">
                    <strong>Priorité :</strong> {task.task.priority}
                  </p>
                  <p className="text-gray-500 mt-2 text-sm">
                    <strong>Date de début :</strong> {new Date(task.task.start_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 mt-2 text-sm">
                    <strong>Date de fin :</strong> {new Date(task.task.end_date).toLocaleDateString()}
                  </p>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="inline-flex space-x-4">
                      {task.status === "in-progress" && (
                        <button
                          className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
                          onClick={() => markAsCompleted(task.id)}
                        >
                          Terminer
                        </button>
                      )}

                      {task.status !== "cancelled" && task.status !== "completed" && (
                        <button
                          className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                          onClick={() => markAsCancelled(task.id)}
                        >
                          Annuler
                        </button>
                      )}

                      {(task.status === "completed" || task.status === "cancelled" || task.status === "pending") && (
                        <button
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          onClick={() => markAsProgressing(task.id)}
                        >
                          Reprendre
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    <Messages/>

    </AuthenticatedLayout>
  );
};

export default Tasks;
