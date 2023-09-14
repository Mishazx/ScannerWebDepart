// LoginPage.js
import React, { useState } from 'react';
import './Window.css';

const Window = (props) => {
  const { title, text, onConfirm, onCancel } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async (e) => {
    setIsLoading(true);
    await onConfirm(e);
    setIsLoading(false);
  };

  const handleCancel = () => {
    onCancel();
  };

  
  return (
    <div className='cnt'>
      <h2 className='msg-header'>{title}</h2>
      <div className='msg-txt'> {text}</div>

      <div className='msg-ctrl'>
        <button className='msg-btn' onClick={handleConfirm} disabled={isLoading}>{isLoading ? 'Подтверждение...' : 'Да'}</button>
        <button className='msg-btn' onClick={handleCancel} disabled={isLoading}>{isLoading ? 'Отмена...' : 'Нет'}</button>
      </div>
    </div>
  );
};

export default Window;
