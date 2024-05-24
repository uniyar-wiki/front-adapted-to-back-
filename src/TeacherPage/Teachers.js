import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Teachers.css'
const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/Teachers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div>
      <h1>Список преподавателей</h1>
      <ul>
        {teachers.map(teacher => (
          <li key={teacher.id}>
            <Link to={`/teachers/${teacher.id}`}>{teacher.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeachersList;