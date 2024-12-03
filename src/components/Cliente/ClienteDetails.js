import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ClienteDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cliente, setCliente] = useState({});

    useEffect(() => {
        fetch(`/clientes/${id}`)
            .then(res => res.json())
            .then(data => setCliente(data));
    }, [id]);

    const handleEdit = () => {
        navigate(`/clientes/editar/${id}`); // Redirigir a la página de edición
    };

    const handleDelete = () => {
        if (window.confirm('¿Está seguro de que desea eliminar este cliente?')) {
            fetch(`/clientes/${id}`, { method: 'DELETE' })
                .then(() => {
                    alert('Cliente eliminado correctamente');
                    navigate('/clientes'); // Redirigir a la lista de clientes
                })
                .catch(error => console.error('Error al eliminar el cliente:', error));
        }
    };

    return (
        <div>
            <h1>Detalles del Cliente</h1>
            <p><strong>ID:</strong> {cliente.id_cliente}</p>
            <p><strong>Nombre:</strong> {cliente.nombre_cliente}</p>
            <p><strong>Teléfono:</strong> {cliente.telefono}</p>
            <p><strong>Correo Electrónico:</strong> {cliente.correo_electronico}</p>
            {/* Mostrar otros detalles del cliente según sea necesario */}
            <button onClick={handleEdit}>Editar</button>
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
}

export default ClienteDetails;