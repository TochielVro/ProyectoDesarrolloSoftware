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
      </Route>
    </Routes>
  );
};

export default AppRoutes;