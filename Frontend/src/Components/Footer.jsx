import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`modern-footer ${darkMode ? 'dark' : 'light'}`}>
      {/* Sección principal del footer */}
      <div className="footer-main">
        <Container>
          <Row className="g-4">
            {/* Columna de la marca */}
            <Col lg={4} md={6}>
              <div className="footer-brand">
                <h5 className="brand-title">LocaLink</h5>
                <p className="brand-description">
                  Conectando emprendimientos locales con su comunidad. 
                  Descubre, apoya y haz crecer los negocios de tu zona.
                </p>
                <div className="social-links">
                  <a href="#" className="social-link" aria-label="Facebook">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="social-link" aria-label="Instagram">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="#" className="social-link" aria-label="Twitter">
                    <i className="bi bi-twitter-x"></i>
                  </a>
                  <a href="#" className="social-link" aria-label="LinkedIn">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </Col>

            {/* Enlaces rápidos */}
            <Col lg={2} md={6}>
              <div className="footer-section">
                <h6 className="footer-title">Enlaces Rápidos</h6>
                <ul className="footer-links">
                  <li><Link to="/">Inicio</Link></li>
                  <li><Link to="/emprendimientos">Emprendimientos</Link></li>
                  <li><Link to="/about">Acerca de</Link></li>
                  <li><Link to="/contact">Contacto</Link></li>
                </ul>
              </div>
            </Col>

            {/* Para emprendedores */}
            <Col lg={2} md={6}>
              <div className="footer-section">
                <h6 className="footer-title">Emprendedores</h6>
                <ul className="footer-links">
                  <li><Link to="/register">Registrarse</Link></li>
                  <li><Link to="/crear-emprendimiento">Crear Emprendimiento</Link></li>
                  <li><Link to="/recursos">Recursos</Link></li>
                  <li><Link to="/ayuda">Ayuda</Link></li>
                </ul>
              </div>
            </Col>

            {/* Soporte */}
            <Col lg={2} md={6}>
              <div className="footer-section">
                <h6 className="footer-title">Soporte</h6>
                <ul className="footer-links">
                  <li><Link to="/faq">Preguntas Frecuentes</Link></li>
                  <li><Link to="/terminos">Términos de Uso</Link></li>
                  <li><Link to="/privacidad">Privacidad</Link></li>
                  <li><Link to="/reportar">Reportar Problema</Link></li>
                </ul>
              </div>
            </Col>

            {/* Newsletter */}
            <Col lg={2} md={12}>
              <div className="footer-section">
                <h6 className="footer-title">Newsletter</h6>
                <p className="newsletter-text">
                  Mantente al día con las últimas novedades
                </p>
                <div className="newsletter-form">
                  <div className="input-group">
                    <input 
                      type="email" 
                      className="form-control newsletter-input" 
                      placeholder="Tu email"
                      aria-label="Email para newsletter"
                    />
                    <Button variant="primary" className="newsletter-btn">
                      <i className="bi bi-arrow-right"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Sección inferior del footer */}
      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <p className="copyright-text">
                © {currentYear} LocaLink. Todos los derechos reservados.
              </p>
            </Col>
            <Col md={6}>
              <div className="footer-bottom-links">
                <Link to="/terminos">Términos</Link>
                <span className="separator">•</span>
                <Link to="/privacidad">Privacidad</Link>
                <span className="separator">•</span>
                <Link to="/cookies">Cookies</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;