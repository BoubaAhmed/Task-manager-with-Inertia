import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Tasks = ({ tasks }) => {
  console.log(tasks);
  const { patch } = useForm();
  const { flash } = usePage().props;
  const [message, setMessage] = useState({ success: null, error: null });

  useEffect(() => {
    if (flash.success) {
      setMessage({ success: flash.success, error: null });
    } else if (flash.error) {
      setMessage({ success: null, error: flash.error });
    }
  }, [flash]);

  const markAsCompleted = (assignmentId) => {
    patch(`/assignments/${assignmentId}/complete`, {
      onSuccess: () => {
        setMessage({ success: "Assignment marked as completed!", error: null });
      },
      onError: (errors) => {
        setMessage({ success: null, error: "Failed to mark assignment as completed." });
      },
    });
  };

  const markAsCancelled = (assignmentId) => {
    patch(`/assignments/${assignmentId}/cancel`, {
      onSuccess: () => {
        setMessage({ success: "Assignment marked as Cancelled!", error: null });
      },
      onError: (errors) => {
        setMessage({ success: null, error: "Failed to mark assignment as cancelled." });
      },
    });
  };

  const markAsProgressing = (assignmentId) => {
    patch(`/assignments/${assignmentId}/progress`, {
      onSuccess: () => {
        setMessage({ success: "Assignment marked as Progressing!", error: null });
      },
      onError: (errors) => {
        setMessage({ success: null, error: "Failed to mark assignment as progressing." });
      },
    });
  };

  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mes Taches</h2>}
    >
      <Head title="Mes Taches" />

      <div className="container mt-4 mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-screen-xl">
        <h2 className="font-bold text-lg">You have {tasks.length} tasks non-determined:</h2>
        <div className="w-full p-6 animate-fade-in">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48">
              <p className="text-gray-500 text-lg">You have no tasks assigned.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="relative p-4 bg-white hover:cursor-pointer hover:bg-slate-200 hover:shadow-lg transform hover:scale-105 transition duration-300 rounded-lg shadow hover:shadow-lg transition-shadow group"
                >
                  <p className={`absolute top-0 right-0 
                      bg-${task.status==='completed' ? 'lime-500' : 
                        task.status==='in-progress' ? 'indigo-500' : 
                        task.status==='cancelled' ? 'yellow-600' :  'gray-500'
                      } text-gray-100 py-1 px-2 rounded-tl-lg rounded-br-lg text-sm`}> 
                    {task.status}
                  </p>
                  <h2 className="text-xl font-bold text-gray-800 mt-3 truncate underline"><span className="text-indigo-500 ">Project : </span>{task.task.project.name}</h2>
                  <h2 className="text-lg font-semibold text-gray-800 mt-1 truncate">{task.task.name}</h2>
                  <p className="text-gray-500 mt-2 text-sm">
                    <strong>Priority:</strong> {task.task.priority}
                  </p>
                  <p className="text-gray-500 mt-2 text-sm">
                    <strong>Start Date:</strong> {new Date(task.task.start_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 mt-2 text-sm">
                    <strong>End Date:</strong> {new Date(task.task.end_date).toLocaleDateString()}
                  </p>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="inline-flex space-x-4">
                      {/* Show "Terminate" button only if the task is in-progress */}
                      {task.status === "in-progress" && (
                        <button
                          className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
                          onClick={() => markAsCompleted(task.id)}
                        >
                          Terminate
                        </button>
                      )}

                      {/* Show "Cancel" button only if the task is not cancelled or completed */}
                      {task.status !== "cancelled" && task.status !== "completed" && (
                        <button
                          className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                          onClick={() => markAsCancelled(task.id)}
                        >
                          Cancel
                        </button>
                      )}

                      {/* Show "Return to Progress" button only if the task is completed or cancelled */}
                      {(task.status === "completed" || task.status === "cancelled") && (
                        <button
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          onClick={() => markAsProgressing(task.id)}
                        >
                          Return to Progress
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

      <div>
        {message.error && (
          <div className="fixed bottom-4 left-4 w-full max-w-xs z-50">
            <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg flex justify-between items-center opacity-100 transition-opacity duration-500 ease-in-out">
              <p>{flash.error}</p>
              <button
                className="text-white"
                onClick={() => setMessage({ ...message, error: null })}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}
        {message.success && (
          <div className="fixed bottom-4 left-4 w-full max-w-xs z-50">
            <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg flex justify-between items-center opacity-100 transition-opacity duration-500 ease-in-out">
              <p>{flash.success}</p>
              <button
                className="text-white"
                onClick={() => setMessage({ ...message, success: null })}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
};

export default Tasks;
