import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

const CSVTable = ({ data, headers, onDataChange }) => {
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleCellClick = (rowIndex, colIndex, value) => {
    setEditingCell({ rowIndex, colIndex });
    setEditValue(value);
  };

  const handleCellChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleCellBlur = () => {
    if (editingCell) {
      const newData = [...data];
      newData[editingCell.rowIndex][editingCell.colIndex] = editValue;
      onDataChange(newData);
      setEditingCell(null);
    }
  };

  const handleAddRow = () => {
    const newRow = headers.map(() => '');
    onDataChange([...data, newRow]);
  };

  const handleDeleteRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    onDataChange(newData);
  };

  return (
    <div className="mb-6">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, colIndex) => (
                <TableCell key={colIndex} onClick={() => handleCellClick(rowIndex, colIndex, cell)}>
                  {editingCell?.rowIndex === rowIndex && editingCell?.colIndex === colIndex ? (
                    <Input
                      value={editValue}
                      onChange={handleCellChange}
                      onBlur={handleCellBlur}
                      autoFocus
                    />
                  ) : (
                    cell
                  )}
                </TableCell>
              ))}
              <TableCell>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteRow(rowIndex)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleAddRow} className="mt-4">
        <Plus className="h-4 w-4 mr-2" /> Add Row
      </Button>
    </div>
  );
};

export default CSVTable;