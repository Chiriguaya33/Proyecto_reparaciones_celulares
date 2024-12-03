// TecnicoList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TecnicoList() {
    const [tecnicos, setTecnicos] = useState([]);

    useEffect(() => {
        fetch('/tecnicos')
            .then(res => res.json())
            .then(data => setTecnicos(data));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este técnico?')) {
            fetch(`/tecnicos/${id}`, { method: 'DELETE' })
                .then(() => {
                    // Actualizar la lista de técnicos después de eliminar
                    setTecnicos(tecnicos.filter(tecnico => tecnico.id_tecnico !== id));
                    alert('Técnico eliminado correctamente');
                })
                .catch(error => console.error('Error al eliminar el técnico:', error));
        }
    };

    return (
        <div>
            <h1>Lista de Técnicos</h1>
            <Link to="/tecnicos/nuevo">
                <button>Nuevo Técnico</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Especialidad</th>
                        {/* Agrega más encabezados según sea necesario */}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tecnicos.map(tecnico => (
                        <tr key={tecnico.id_tecnico}>
                            <td>{tecnico.id_tecnico}</td>
                            <td>{tecnico.nombre_tecnico}</td>
                            <td>{tecnico.especialidad}</td>
                            {/* Agrega más celdas según sea necesario */}
                            <td>
                                <Link to={`/tecnicos/${tecnico.id_tecnico}`}>
                                    <button>Ver</button>
                                </Link>
                                <Link to={`/tecnicos/editar/${tecnico.id_tecnico}`}>
                                    <button>Editar</button>
                                </Link>
                                <button onClick={() => handleDelete(tecnico.id_tecnico)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TecnicoList;