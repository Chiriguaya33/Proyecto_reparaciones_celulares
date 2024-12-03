// TecnicoDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TecnicoDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tecnico, setTecnico] = useState({});

    useEffect(() => {
        fetch(`/tecnicos/${id}`)
            .then(res => res.json())
            .then(data => setTecnico(data));
    }, [id]);

    const handleEdit = () => {
        navigate(`/tecnicos/editar/${id}`);
    };

    const handleDelete = () => {
        if (window.confirm('¿Está seguro de que desea eliminar este técnico?')) {
            fetch(`/tecnicos/${id}`, { method: 'DELETE' })
                .then(() => {
                    alert('Técnico eliminado correctamente');
                    navigate('/tecnicos');
                })
                .catch(error => console.error('Error al eliminar el técnico:', error));
        }
    };

    return (
        <div>
            <h1>Detalles del Técnico</h1>
            <p><strong>ID:</strong> {tecnico.id_tecnico}</p>
            <p><strong>Nombre:</strong> {tecnico.nombre_tecnico}</p>
            <p><strong>Especialidad:</strong> {tecnico.especialidad}</p>
            {/* Mostrar otros detalles del técnico según sea necesario */}
            <button onClick={handleEdit}>Editar</button>
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
}

export default TecnicoDetails;