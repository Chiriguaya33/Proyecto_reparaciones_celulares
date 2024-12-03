import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClienteList from "./components/Cliente/ClienteList";
import ClienteForm from "./components/Cliente/ClienteForm";
import ClienteDetails from "./components/Cliente/ClienteDetails";
import EquipoList from "./components/Equipo/EquipoList";
import EquipoForm from "./components/Equipo/EquipoForm";
import EquipoDetails from "./components/Equipo/EquipoDetails";
import ReparacionList from "./components/Reparacion/ReparacionList";
import ReparacionForm from "./components/Reparacion/ReparacionForm";
import ReparacionDetails from "./components/Reparacion/ReparacionDetails";
import TecnicoList from "./components/Tecnico/TecnicoList";
import TecnicoForm from "./components/Tecnico/TecnicoForm";
import TecnicoDetails from "./components/Tecnico/TecnicoDetails";
import LoginForm from "./components/Usuario/LoginForm";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/clientes" element={<ClienteList />} />
            <Route path="/clientes/nuevo" element={<ClienteForm />} />
            <Route path="/clientes/editar/:id" element={<ClienteForm />} />
            <Route path="/clientes/:id" element={<ClienteDetails />} />
            <Route path="/equipos" element={<EquipoList />} />
            <Route path="/equipos/nuevo" element={<EquipoForm />} />
            <Route path="/equipos/editar/:id" element={<EquipoForm />} />
            <Route path="/equipos/:id" element={<EquipoDetails />} />
            <Route path="/reparaciones" element={<ReparacionList />} />
            <Route
              path="/reparaciones/nuevo"
              element={<ReparacionForm />}
            />
            <Route
              path="/reparaciones/editar/:id"
              element={<ReparacionForm />}
            />
            <Route path="/reparaciones/:id" element={<ReparacionDetails />} />
            <Route path="/tecnicos" element={<TecnicoList />} />
            <Route path="/tecnicos/nuevo" element={<TecnicoForm />} />
            <Route path="/tecnicos/editar/:id" element={<TecnicoForm />} />
            <Route path="/tecnicos/:id" element={<TecnicoDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;