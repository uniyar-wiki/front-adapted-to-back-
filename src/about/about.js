import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './about.css'

const AboutProject = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    // Функция для получения данных об авторах с бэкенда
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('URL_К_ВАШЕМУ_API'); // Замените URL_К_ВАШЕМУ_API на фактический адрес API
        setAuthors(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных об авторах:', error);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className='container'>
      <h1>О проекте</h1>
      <p>
        Наш проект представляет собой вики-платформу, на которой собирается и систематизируется информация о преподавателях вуза.
        Цель проекта - предоставить студентам удобный инструмент для выбора преподавателей и подготовки к занятиям.
        Здесь вы можете найти подробные описания, отзывы и рекомендации о каждом преподавателе, что поможет вам сформировать максимально полное представление
        и сделать обоснованный выбор. Мы стремимся сделать процесс обучения более комфортным и продуктивным для каждого студента.
      </p>
      <h2>Наши авторы</h2>
      <div>
        {authors.map(author => (
          <div key={author.Id}>
            <img src={author.PictureUrl} alt={author.Name} style={{ width: '100px', height: '100px' }} />
            <h3>{author.Name}</h3>
            <p>{author.Description}</p>
            <a href={author.TelegramLink}>Связаться в Telegram</a>
            <p>Специализация: {author.TypeAuthor === 0 ? 'Бэкэндер' : 'Фронтэндер'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutProject;