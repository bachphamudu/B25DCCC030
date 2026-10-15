import React, { useState } from 'react';
import './App.css';

// Component con: hiển thị từng dòng sinh viên
const StudentItem = (props: any) => {
  return (
    <tr>
      <td>{props.student.id}</td>
      <td>{props.student.name}</td>
      <td>{props.student.className}</td>
      <td>{props.student.score}</td>
      <td>
        <button 
          className="btn-delete" 
          onClick={() => props.onDelete(props.student.id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

// Component con: hiển thị bảng danh sách sinh viên
const StudentTable = (props: any) => {
  if (props.students.length === 0) {
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
        {props.students.map((student: any) => (
          <StudentItem 
            key={student.id} 
            student={student} 
            onDelete={props.onDelete} 
          />
        ))}
      </tbody>
    </table>
  );
};

// Component cha: App
const App = () => {
  // Dữ liệu mẫu ban đầu (dùng id dạng chuỗi/số tùy ý)
  const [students, setStudents] = useState([
    { id: '1', name: 'Nguyễn Văn A', score: 8.5, className: 'CNTT1' },
    { id: '2', name: 'Trần Thị B', score: 4.0, className: 'CNTT2' },
    { id: '3', name: 'Lê Văn C', score: 7.0, className: 'CNTT1' },
    { id: '4', name: 'Phạm Thị D', score: 9.0, className: 'CNTT3' },
  ]);

  // State Form nhập liệu (đã thêm trường id)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    score: '',
    className: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const handleInputChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStudent = (e: any) => {
    e.preventDefault();

    // 1. Kiểm tra các trường để trống
    if (!formData.id.trim() || !formData.name.trim() || !formData.className.trim() || formData.score === '') {
      setErrorMessage('Vui lòng điền đầy đủ tất cả các trường thông tin!');
      return;