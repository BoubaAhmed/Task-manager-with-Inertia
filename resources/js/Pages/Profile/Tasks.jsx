import React from 'react';

const Tasks = ({tasks}) => {

    return (
        <div>
            <h1>Your Tasks</h1>
            {tasks.length === 0 ? (
                <p>You have no tasks assigned.</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            {task.name} - {task.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Tasks;