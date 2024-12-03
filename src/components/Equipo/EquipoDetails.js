import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EquipoDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [equipo, setEquipo] = useState({});

    useEffect(() => {
        fetch(`/equipos/${id}`)
            .then(res => res.json())
            .then(data => setEquipo(data));
    }, [id]);

    const handleEdit = () => {
        navigate(`/equipos/editar/${id}`);
    };

    const handleDelete = () => {
        if (window.confirm('¿Está seguro de que desea eliminar este equipo?')) {
            fetch(`/equipos/${id}`, { method: 'DELETE' })
                .then(() => {
                    alert('Equipo eliminado correctamente');
                    navigate('/equipos');
                })
                .catch(error => console.error('Error al eliminar el equipo:', error));
        }
    };

    return (
        <div>
            <h1>Detalles del Equipo</h1>
            <p><strong>ID:</strong> {equipo.id_equipo}</p>
            <p><strong>Tipo de Equipo:</strong> {equipo.tipo_equipo}</p>
            <p><strong>Marca:</strong> {equipo.marca}</p>
            <p><strong>Modelo:</strong> {equipo.modelo}</p>
            {/* Mostrar otros detalles del equipo según sea necesario */}
            <button onClick={handleEdit}>Editar</button>
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
}

export default EquipoDetails;