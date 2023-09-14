// LoginPage.js
import React, { useState } from 'react';
import {createRoot} from 'react-dom/client';
import './Window.css';

  // Функция для отображения вашего окна подтверждения
  export const showConfirmationWindow = async (title, message) => {
    return new Promise((resolve) => {

            // Создаем контейнер для вашего окна
      // Создаем корневой элемент
      const container = document.createElement('Window');
      document.body.appendChild(container);

      const root = createRoot(container);

      const handleClose = (result) => {
        // Закрываем окно и передаем результат (true или false)
        // ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
        resolve(result);
      };
        
      // Отображаем ваше окно
      root.render(
        <Window
          title={title}
          text={message}
          onConfirm={() => handleClose(true)}
          onCancel={() => handleClose(false)}
        />
      );
    });
  };

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
