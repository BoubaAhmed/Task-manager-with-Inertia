import { usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

export default function Messages() {
    const { flash } = usePage().props;
    const [message, setMessage] = useState({ success: null, error: null });

    useEffect(() => {
        setMessage({ success: flash.success, error: flash.error });

        if (flash.success || flash.error) {
            const timer = setTimeout(() => {
                setMessage({ success: null, error: null });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [flash]);

    const Message = ({ type, text }) => (
        <div className={`fixed bottom-4 left-4 w-full max-w-xs z-50`}>
            <div className={`bg-${type}-600 text-white p-4 rounded-lg shadow-lg flex justify-between items-center opacity-100 transition-opacity duration-500 ease-in-out`}>
                <p>{text}</p>
                <button className="text-white" onClick={() => setMessage({ ...message, [type]: null })}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    );

    return (
        <div>
            {message.error && <Message type="red" text={flash.error} />}
            {message.success && <Message type="green" text={flash.success} />}
        </div>
    );
}
