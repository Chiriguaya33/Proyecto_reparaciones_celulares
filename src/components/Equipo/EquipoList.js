import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function EquipoList() {
    const [equipos, setEquipos] = useState([]);

    useEffect(() => {
        fetch('/equipos')
            .then(res => res.json())
            .then(data => setEquipos(data));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este equipo?')) {
            fetch(`/equipos/${id}`, { method: 'DELETE' })
                .then(() => {
                    // Actualizar la lista de equipos después de eliminar
                    setEquipos(equipos.filter(equipo => equipo.id_equipo !== id));
                    alert('Equipo eliminado correctamente');
                })
                .catch(error => console.error('Error al eliminar el equipo:', error));
        }
    };

    return (
        <div>
            <h1>Lista de Equipos</h1>
            <Link to="/equipos/nuevo">
                <button>Nuevo Equipo</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo de Equipo</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        {/* Agrega más encabezados según sea necesario */}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {equipos.map(equipo => (
                        <tr key={equipo.id_equipo}>
                            <td>{equipo.id_equipo}</td>
                            <td>{equipo.tipo_equipo}</td>
                            <td>{equipo.marca}</td>
                            <td>{equipo.modelo}</td>
                            {/* Agrega más celdas según sea necesario */}
                            <td>
                                <Link to={`/equipos/${equipo.id_equipo}`}>
                                    <button>Ver</button>
                                </Link>
                                <Link to={`/equipos/editar/${equipo.id_equipo}`}>
                                    <button>Editar</button>
                                </Link>
                                <button onClick={() => handleDelete(equipo.id_equipo)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EquipoList;