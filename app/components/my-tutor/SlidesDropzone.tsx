'use client'

import React, { useState, useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import SlidesPrview from './SlidesPrview';

function SlidesDropzone({ className }: { className: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const maxFiles = 1; // Maximum number of files allowed

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setError(null);
    if (acceptedFiles.length === 0) {
      setError(`You can only upload up to ${maxFiles} file(s). Supported files include PPT, DOCX, PDF, and TXT.`);
      return;
    }

    // Handle the accepted files
    console.log("Accepted files:", acceptedFiles);

    // Handle the rejected files
    console.log("Rejected files:", rejectedFiles);

    // Only accept the first file
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      console.log("Accepted file:", acceptedFiles[0]);
    } else {
      setError(`Error.`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept: {
      'application/pdf': [],
      'application/vnd.ms-powerpoint': [],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
      'text/plain': []
    },
  });

  const formatFileType = (type: string) => {
    if (type.startsWith('application/')) {
      return type.replace('application/', '');
    }
    return type;
  };

  return (
    <div className='text-primary'>
      <div {...getRootProps({ className })}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p className='text-[12px] font-[300]'>Drop the slides here ...</p> :
            <p className='text-[12px] font-[300]'>Drag and drop some slides here, <br /> or click to select slides!</p>
        }
      </div>

      <small className='text-red-500 text-[10px]'>{error && error}</small>

      {(file && !error) && (
        <SlidesPrview 
          fileName={file.name} 
          fileType={formatFileType(file.type)} 
          fileSize={(file.size / 1024).toFixed(2)} />
      )}
    </div>
  );
}

export default SlidesDropzone;
