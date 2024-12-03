// TecnicoForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TecnicoForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tecnico, setTecnico] = useState({
        nombre_tecnico: '',
        especialidad: '',
        // Agrega otros campos según sea necesario
    });

    useEffect(() => {
        if (id) { // Si existe un ID, estamos editando un técnico existente
            fetch(`/tecnicos/${id}`)
                .then(res => res.json())
                .then(data => setTecnico(data));
        }
    }, [id]);

    const handleChange = (e) => {
        setTecnico({
            ...tecnico,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) { // Editar técnico existente
            fetch(`/tecnicos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tecnico)
            })
                .then(() => {
                    alert('Técnico actualizado correctamente');
                    navigate('/tecnicos');
                })
                .catch(error => console.error('Error al actualizar el técnico:', error));
        } else { // Crear nuevo técnico
            fetch('/tecnicos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tecnico)
            })
                .then(() => {
                    alert('Técnico creado correctamente');
                    navigate('/tecnicos');
                })
                .catch(error => console.error('Error al crear el técnico:', error));
        }
    };

    return (
        <div>
            <h1>{id ? 'Editar Técnico' : 'Nuevo Técnico'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre_tecnico">Nombre:</label>
                    <input
                        type="text"
                        id="nombre_tecnico"
                        name="nombre_tecnico"
                        value={tecnico.nombre_tecnico}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="especialidad">Especialidad:</label>
                    <input
                        type="text"
                        id="especialidad"
                        name="especialidad"
                        value={tecnico.especialidad}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Agrega más campos según sea necesario */}
                <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
            </form>
        </div>
    );
}

export default TecnicoForm;