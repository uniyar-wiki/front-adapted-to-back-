import Rating from 'react-rating-stars-component';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import CommentSection from './CommentSection';

const TeacherPage = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [userId, setUserId] = useState(null);
  const [ratings, setRatings] = useState({
    knowledge: 0,
    teachingSkill: 0,
    communication: 0,
    easiness: 0,
    overall: 0,
  });
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/Teachers/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRatings({
          knowledge: data.knowledgeRating || 0,
          teachingSkill: data.teachingSkillRating || 0,
          communication: data.communicationRating || 0,
          easiness: data.easinessRating || 0,
          overall: (data.knowledgeRating+data.teachingSkillRating+data.communicationRating+data.easinessRating)/4 || 0
        });
        setTeacher(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await fetch('http://localhost:5000/api/Auth/profileInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ token })
        });
        if (response.ok) {
          const data = await response.json();
          setUserId(data.id);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchUser();
    fetchTeacher();
  }, [id]);

  const handleSubmitRating = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/TeacherRatings/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          teacherId: id,
          userId: userId,
          knowledgeRating: ratings.knowledge,
          teachingSkillRating: ratings.teachingSkill,
          communicationRating: ratings.communication,
          easinessRating: ratings.easiness
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Rating submitted successfully');
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleRatingChange = (newRating, name) => {
    setRatings(prevRatings => ({ ...prevRatings, [name]: newRating }));
  };

  if (!teacher) {
    return <div>Loading...</div>;
  }
  
  return (
    <div id="content" className="mw-body" role="main">
      <h1 id="firstHeading" className="firstHeading" lang="ru">{teacher.name}</h1>
      <div id="bodyContent" className="mw-body-content">
        <div id="mw-content-text" lang="ru" dir="ltr" className="mw-content-ltr">
          <table className="wikitable card">
            <tbody>
              <tr>
                <td colSpan="2" style={{ textAlign: 'center' }}>
                  <b>{teacher.name}</b>
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: 'center' }}>
                  <img src={teacher.photo} className="teacher_photo" alt="Teacher" />
                </td>
              </tr>
              <tr>
                <th>Альма-матер</th>
                <td>{teacher.almaMater}</td>
              </tr>
              <tr>
                <th>Учёная степень</th>
                <td>{teacher.degree}</td>
              </tr>
              <tr>
                <th>Работал</th>
                <td>
                  <ul>
                    {teacher.positions.map((position, index) => (
                      <li key={index}>{position}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <table width="100%" style={{ whiteSpace: 'nowrap' }}>
                    <tbody>
                      <tr>
                        <td width="135">Знания</td>
                        <td>
                          <Rating
                            value={ratings.knowledge}
                            size={24}
                            onChange={(newRating) => handleRatingChange(newRating, 'knowledge')}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Умение преподавать</td>
                        <td>
                          <Rating
                            value={ratings.teachingSkill}
                            size={24}
                            onChange={(newRating) => handleRatingChange(newRating, 'teachingSkill')}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>В общении</td>
                        <td>
                          <Rating
                            value={ratings.communication}
                            size={24}
                            onChange={(newRating) => handleRatingChange(newRating, 'communication')}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>«Халявность»</td>
                        <td>
                          <Rating
                            value={ratings.easiness}
                            size={24}
                            onChange={(newRating) => handleRatingChange(newRating, 'easiness')}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Общая оценка</td>
                        <td>
                          <Rating
                            value={ratings.overall}
                            size={24}
                            onChange={(newRating) => handleRatingChange(newRating, 'overall')}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button onClick={handleSubmitRating}>Submit Rating</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p>{teacher.biography}</p>
        </div>
      </div>
      <CommentSection teacherId={id} userId={userId} />
    </div>
  );
};

export default TeacherPage;
