import React, { useState } from 'react';
import './App.css';

const StudentItem = (sql) => {
  return (
    <tr>
      <td>{sql.student.id}</td>
      <td>{sql.student.name}</td>
      <td>{sql.student.className}</td>
      <td>{sql.student.score}</td>
      <td>
        <button 
          type="button"
          className="btn-delete" 
          onClick={() => sql.onDelete(sql.student.id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

const StudentTable = (sql) => {
  if (sql.students.length === 0) {
    return <p className="empty-text">Không có sinh viên nào phù hợp.</p>;
  }

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>Mã SV</th>
          <th>Họ và Tên</th>
          <th>Lớp</th>
          <th>Điểm</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {sql.students.map((student) => (
          <StudentItem 
            key={student.id} 
            student={student} 
            onDelete={sql.onDelete} 
          />
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [students, setStudents] = useState([
    { id: '1', name: 'Nguyễn Văn A', score: 8.5, className: 'CNTT1' },
    { id: '2', name: 'Trần Thị B', score: 4.0, className: 'CNTT2' },
    { id: '3', name: 'Lê Văn C', score: 7.0, className: 'CNTT1' },
    { id: '4', name: 'Phạm Thị D', score: 9.0, className: 'CNTT3' },
  ]);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    score: '',
    className: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();

    if (!formData.id.trim() || !formData.name.trim() || !formData.className.trim() || formData.score === '') {
      setErrorMessage('Vui lòng điền đầy đủ tất cả các trường!');
      return;
    }

    const isExisted = students.some(
      (s) => String(s.id).trim().toLowerCase() === formData.id.trim().toLowerCase()
    );
    if (isExisted) {
      setErrorMessage(`Mã sinh viên "${formData.id.trim()}" đã tồn tại! Vui lòng chọn mã khác.`);
      return;
    }

    const numericScore = parseFloat(formData.score);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > 10) {
      setErrorMessage('Điểm số phải là số từ 0 đến 10!');
      return;
    }

    const newStudent = {
      id: formData.id.trim(),
      name: formData.name.trim(),
      score: numericScore,
      className: formData.className.trim(),
    };

    setStudents((prev) => [...prev, newStudent]);
    setFormData({ id: '', name: '', score: '', className: '' });
    setErrorMessage('');
  };

  const handleDeleteStudent = (idToDelete) => {
    setStudents((prev) => prev.filter((student) => String(student.id) !== String(idToDelete)));
  };

  const filteredStudents = students.filter((student) => {
    if (filterType === 'EXCELLENT') return student.score >= 8;
    if (filterType === 'FAILED') return student.score < 5;
    return true;
  });

  const totalStudents = students.length;
  const averageScore = totalStudents > 0
    ? (students.reduce((sum, current) => sum + current.score,