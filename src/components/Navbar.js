// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <div className="container">
                <Link to="/">Reparaciones Juan</Link>
                <ul>
                    <li><Link to="/clientes">Clientes</Link></li>
                    <li><Link to="/equipos">Equipos</Link></li>
                    <li><Link to="/reparaciones">Reparaciones</Link></li>
                    <li><Link to="/tecnicos">Técnicos</Link></li>
                    <li><Link to="/usuarios">Usuarios</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;