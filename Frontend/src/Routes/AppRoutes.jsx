import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import MainLayout from '../Layouts/MainLayout';
import PerfilUsuario from '../Pages/PerfilUsuario';
import MisEmprendimientos from '../Pages/MisEmprendimientos';
import CrearEmprendimiento from '../Pages/CrearEmprendimiento';
import EditarEmprendimiento from '../Pages/EditarEmprendimiento';
import DetalleEmprendimiento from '../Pages/DetalleEmprendimiento';
import AcercaDe from '../Pages/AcercaDe';
import Contacto from '../Pages/Contacto';
import Recursos from '../Pages/Recursos';
import Ayuda from '../Pages/Ayuda';
import PreguntasFrecuentes from '../Pages/PreguntasFrecuentes';
import TerminosUso from '../Pages/TerminosUso';
import Privacidad from '../Pages/Privacidad';
import ReportarProblema from '../Pages/ReportarProblema';
import Emprendimientos from '../Pages/Emprendimientos';
import EmprendimientosDestacados from '../Pages/Home';
import BuscarEmprendimientos from '../Pages/BuscarEmprendimientos';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="perfil" element={<PerfilUsuario />} />
        <Route path="mis-emprendimientos" element={<MisEmprendimientos />} />
        <Route path="crear-emprendimiento" element={<CrearEmprendimiento />} />
        <Route path="editar-emprendimiento/:id" element={<EditarEmprendimiento />} />
        <Route path="emprendimiento/:id" element={<DetalleEmprendimiento />} />
        
        {/* Nuevas rutas para emprendimientos */}
        <Route path="emprendimientos" element={<Emprendimientos />} />
        <Route path="emprendimientos-destacados" element={<EmprendimientosDestacados />} />
        <Route path="buscar-emprendimientos" element={<BuscarEmprendimientos />} />
        
        <Route path="acerca-de" element={<AcercaDe />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="recursos" element={<Recursos />} />
        <Route path="ayuda" element={<Ayuda />} />
        <Route path="faq" element={<PreguntasFrecuentes />} />
        <Route path="terminos-uso" element={<TerminosUso />} />
        <Route path="privacidad" element={<Privacidad />} />
        <Route path="reportar-problema" element={<ReportarProblema />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;