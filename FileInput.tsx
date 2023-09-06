import React from 'react';

interface FileInputProps {
  onFileSelected: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFileSelected }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const selectedFile = files ? files[0] : null;
    onFileSelected(selectedFile);
  };

  return <input type="file" accept=".pdf, .txt, .md" onChange={handleFileChange} />;
};

export default FileInput;
