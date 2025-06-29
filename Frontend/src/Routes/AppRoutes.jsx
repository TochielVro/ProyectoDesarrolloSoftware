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
import DetalleEmprendimiento from '../Pages/DetalleEmprendimiento'; // Importamos el componenete para ar calificacion a los emprendimiento

import AcercaDe from '../Pages/AcercaDe';
import Contacto from '../Pages/Contacto';


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
        <Route path="acerca-de" element={<AcercaDe />} />
        <Route path="contacto" element={<Contacto />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;