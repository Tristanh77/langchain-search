import React, { useState } from 'react';

interface DocumentUploaderProps {
  onDocumentUpload: (file: File | null) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onDocumentUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const selectedFile = files ? files[0] : null;
    onDocumentUpload(selectedFile);
  };

  return <input type="file" accept=".pdf, .txt, .md" onChange={handleFileChange} />;
};

export default DocumentUploader;
