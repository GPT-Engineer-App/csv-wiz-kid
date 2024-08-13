import React from 'react';
import Papa from 'papaparse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CSVUploader = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const headers = result.data[0];
          const data = result.data.slice(1).filter(row => row.some(cell => cell !== ''));
          onFileUpload(data, headers);
        },
        header: false,
      });
    }
  };

  return (
    <div className="mb-6">
      <Input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-2"
      />
      <Button onClick={() => document.querySelector('input[type="file"]').click()}>
        Upload CSV
      </Button>
    </div>
  );
};

export default CSVUploader;