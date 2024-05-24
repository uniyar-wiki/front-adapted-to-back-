import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/Auth/profileInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ token })
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setIsLoggedIn(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/"><img src="https://i.postimg.cc/8cYfnLBL/uniyar-wiki-transformed.webp" className="header_logo" alt="Logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">На главную</Nav.Link>
            <Nav.Link as={Link} to="/teachers">Преподаватели</Nav.Link>
            <Nav.Link as={Link} to="/buildings">Корпуса</Nav.Link>
            <Nav.Link as={Link} to="/departments">Кафедры</Nav.Link>
            <Nav.Link as={Link} to="/about">О проекте</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Nav.Link as={Link} to="/profile">Профиль</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">Вход/Регистрация</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


export default Header;