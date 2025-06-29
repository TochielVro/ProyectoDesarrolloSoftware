import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Sidebar from '../Components/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import './MainLayout.css'; // Aquí se importa el CSS separado

const MainLayout = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null
      ? JSON.parse(saved)
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className="main-layout-container">
        <div className="sidebar-container">
          <Sidebar darkMode={darkMode} />
        </div>                  

        <div className="main-content-area">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <div className="content-area">
            <Container fluid>
              <Row>
                <Col className="py-4">
                  <Outlet />
                </Col>
              </Row>
            </Container>
          </div>
          <Footer darkMode={darkMode} />
        </div>
      </div>
    </>
  );
};

export default MainLayout;