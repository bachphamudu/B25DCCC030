import React, { useState } from 'react';
import './App.css';

// 1. Đổi "props" thành "sql" trong StudentItem
const StudentItem = (sql) => {
  return (
    <tr>
      <td>{sql.student.id}</td>
      <td>{sql.student.name}</td>
      <td>{sql.student.className}</td>
      <td>{sql.student.score}</td>
      <td>
        <button 
          className="btn-delete" 
          onClick={() => sql.onDelete(sql.student.id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

// 2. Đổi "props" thành "sql" trong StudentTable
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
      setErrorMessage('Vui lòng điền đầy đủ tất cả các trường thông tin!');
      return;
    }

    const isExisted = students.some((s) => s.id.toString().trim() === formData.id.trim());
    if (isExisted) {
      setErrorMessage(`Mã sinh viên "${formData.id.trim()}" đã tồn tại! Vui lòng chọn mã khác.`);
      return;
    }

    const numericScore = parseFloat(formData.score);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > 10) {
      setErrorMessage('Điểm số phải là số hợp lệ từ 0 đến 10!');
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

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter((student) => {
    if (filterType === 'EXCELLENT') return student.score >= 8;
    if (filterType === 'FAILED') return student.score < 5;
    return true;
  });

  const totalStudents = students.length;
  const averageScore = totalStudents > 0
    ? (students.reduce((sum, current) => sum + current.score, 0) / totalStudents).toFixed(2)
    : 0;

  return (
    <div className="container">
      <h2>Ứng dụng Quản lý Điểm Sinh viên</h2>

      {}
      <div className="card">
        <h3>Thêm Sinh Viên</h3>
        {errorMessage && <p className="error-alert">{errorMessage}</p>}
        <form onSubmit={handleAddStudent} className="form-group">
          <input
            type="text"
            name="id"
            placeholder="Mã SV (VD: SV01)"
            value={formData.id}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="className"
            placeholder="Lớp"
            value={formData.className}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="score"
            placeholder="Điểm (0 - 10)"
            step="0.1"
            value={formData.score}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn-add">Thêm</button>
        </form>
      </div>

      {}
      <div className="card stats-card">
        <p>{`Tổng số lượng sinh viên: ${totalStudents}`}</p>
        <p>{`Điểm trung bình của lớp: ${averageScore}`}</p>
      </div>

      {}
      <div className="filter-group">
        <span>Lọc danh sách: </span>
        <button 
          className={filterType === 'ALL' ? 'active' : ''} 
          onClick={() => setFilterType('ALL')}
        >
          Tất cả
        </button>
        <button 
          className={filterType === 'EXCELLENT' ? 'active' : ''} 
          onClick={() => setFilterType('EXCELLENT')}
        >
          Sinh viên Giỏi (Điểm &ge; 8)
        </button>
        <button 
          className={filterType === 'FAILED' ? 'active' : ''} 
          onClick={() => setFilterType('FAILED')}
        >
          Sinh viên Trượt môn (Điểm &lt; 5)
        </button>
      </div>

      {}
      <StudentTable 
        students={filteredStudents} 
        onDelete={handleDeleteStudent} 
      />
    </div>
  );
};

export default App;