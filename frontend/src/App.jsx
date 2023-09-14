import React, { useState } from 'react';
import './App.css';
import Window, { showConfirmationWindow } from './Window';

function App() {  
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  

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


  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const formData = createFormData(files);

    try {
      const uploadResponse = await uploadFiles(formData);
  
      if (uploadResponse.ok) {
        const uploadedData = await uploadResponse.json();
        console.log('Uploaded files:', uploadedData.uploaded_files);
        //const shouldProcess = window.confirm("Вы уверены, что хотите обработать файл?");
        const shouldProcess = await showConfirmationWindow("Подтверждение об отправке", "Вы уверены, что хотите обработать файл?")
        if (shouldProcess) {
          setIsProcessing(true);
          const data = await handleProcessing(uploadedData.uploaded_files);
          setIsProcessing(false);

          await handleSendConfirmation(data);

        } else {
          // Smoke.alert ("Супер всплывайка <br>с <b>html</b> тегами");
          // alert.show('User cancel')
          console.error('User cancel');
        }
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };
      
  const createFormData = (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    return formData;
  };
  
  const uploadFiles = async (formData) => {
    try {
      return await fetch('http://95.165.102.189:4000/upload', {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
    }
  };
  
  const handleProcessing = async (uploadedFiles) => {
    try {
      const processResponse = await fetch('http://95.165.102.189:4000/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadedFiles),
      });
  
      if (processResponse.ok) {
        const processResult = await processResponse.json();
        console.log('Processing result:', processResult);
        return processResult
      } else {
        console.error('Processing failed');
      }
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };
    

  const handleSendConfirmation = async (processResult) => {
    setIsProcessing(false);
    window.title = "Подтверждение";
    // const shouldSend = window.confirm(`Вы уверены, что хотите отправить файл в отдел ${processResult} ?`);
    const shouldSend = await showConfirmationWindow('Подтверждение об отправке в отдел',`Вы уверены, что хотите отправить файл в отдел ${processResult} ?`);

    if (shouldSend) {
      window.alert(`Отправлено в отдел ${processResult} `)
      // console.log('Send to', processResult);
    } else {
      console.log('No send!');
    }
  };


  return (
    <div className='body'>
      {/* <Window title='asd' text='123123'/> */}
      <div className={`container ${isDragging ? 'dragging' : ''}`}//'container'
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h1 className='text'>Перенесите сюда файл</h1>
      </div>
      {isProcessing ? (
      <img className='loading' width="96" height="96" src="https://img.icons8.com/material-two-tone/96/spinner-frame-2.png" alt="loading"/>
      ) : ('')}

    </div>
    
  );
}

export default App;
