import React, { useState } from 'react';
import './App.css';

// 1. Component con: hiển thị từng dòng sinh viên
const StudentItem = (props) => {
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

// 2. Component con: hiển thị bảng danh sách sinh viên
const StudentTable = (props) => {
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
        {props.students.map((student) => (
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

// 3. Component cha: App (Quản lý toàn bộ State & Logic)
const App = () => {
  // Dữ liệu mẫu ban đầu gồm tối thiểu 3 sinh viên
  const [students, setStudents] = useState(