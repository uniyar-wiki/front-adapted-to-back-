import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TeachersList from './TeacherPage/Teachers.js';
import TeacherPage from './TeacherPage/TeacherPage.js';
import UserProfile from './Profile/UserProfile';
import YSUMap from './MapComponent/MapComponent.js';
import AboutProject from './about/about.js';
import RainbowText from './main.js'
import reportWebVitals from './reportWebVitals';
import LoginPage from './login/LoginPage';
import Header from './Header';
import Chat from './chat/Chat.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<RainbowText />}/>
        <Route path="/teachers" element={<TeachersList />} />
        <Route path="/teachers/:id" element={<TeacherPage />} />
        <Route path="/buildings" element={<YSUMap />} />
        <Route path="/departments" element={<div>Страница кафедр</div>} />
        <Route path="/about" element={<AboutProject />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Chat />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();