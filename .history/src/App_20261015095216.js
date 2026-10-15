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