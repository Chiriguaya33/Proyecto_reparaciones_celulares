import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ClienteList() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        fetch('/clientes')
            .then(res => res.json())
            .then(data => setClientes(data));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este cliente?')) {
            fetch(`/clientes/${id}`, { method: 'DELETE' })
                .then(() => {
                    // Actualizar la lista de clientes después de eliminar
                    setClientes(clientes.filter(cliente => cliente.id_cliente !== id));
                    alert('Cliente eliminado correctamente');
                })
                .catch(error => console.error('Error al eliminar el cliente:', error));
        }
    };

    return (
        <div>
            <h1>Lista de Clientes</h1>
            <Link to="/clientes/nuevo">
                <button>Nuevo Cliente</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Correo Electrónico</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id_cliente}>
                            <td>{cliente.id_cliente}</td>
                            <td>{cliente.nombre_cliente}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.correo_electronico}</td>
                            <td>
                                <Link to={`/clientes/${cliente.id_cliente}`}>
                                    <button>Ver</button>
                                </Link>
                                <Link to={`/clientes/editar/${cliente.id_cliente}`}>
                                    <button>Editar</button>
                                </Link>
                                <button onClick={() => handleDelete(cliente.id_cliente)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClienteList;