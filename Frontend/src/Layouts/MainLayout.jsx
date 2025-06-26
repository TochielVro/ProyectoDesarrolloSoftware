import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Sidebar from '../Components/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Container fluid className="flex-grow-1">
        <Row>
          <Col lg={3} className="d-none d-lg-block p-0">
            <Sidebar />
          </Col>
          <Col lg={9} className="py-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default MainLayout;