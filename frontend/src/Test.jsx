import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Main.css';

function YourComponent() {
    const [isDragging, setIsDragging] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        setShowConfirmation(true);
    };

    const confirmAction = () => {
        // Выполните действие подтверждения
        setShowConfirmation(false);
    };

    const cancelAction = () => {
        // Отмените действие и закройте окно
        setShowConfirmation(false);
    };

    const dragMessage = isDragging ? <div className="drag-message">Перетащите файлы</div> : null;

    const confirmationDialog = showConfirmation ? (
        <div className="confirmation-dialog">
            <p>Вы уверены, что хотите выполнить это действие?</p>
            <button onClick={confirmAction}>Да</button>
            <button onClick={cancelAction}>Отмена</button>
        </div>
    ) : null;

    return (
        <div
            className={`gradient-background ${isDragging ? 'dragging' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {dragMessage}
            <div className="vh-100 container py-6 h-100 d-flex justify-content-center align-items-center">
                <div className="col-12 col-md-8 col-lg-5 col-xl-5">
                    <div className="card text-white gradient-form" style={{ borderRadius: '4rem', boxShadow: '0px 5px 20px 10px black' }}>
                        <div className="card-body p-5 text-center">
                            <div className="mt-5 p-5">
                                <h2 className="fw-bold mb-5">Перетащите файлы сюда</h2>
                                {confirmationDialog}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YourComponent;
