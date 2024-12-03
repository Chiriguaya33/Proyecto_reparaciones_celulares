import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EquipoForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [equipo, setEquipo] = useState({
        tipo_equipo: '',
        marca: '',
        modelo: '',
        // Agrega otros campos según sea necesario
    });

    useEffect(() => {
        if (id) { // Si existe un ID, estamos editando un equipo existente
            fetch(`/equipos/${id}`)
                .then(res => res.json())
                .then(data => setEquipo(data));
        }
    }, [id]);

    const handleChange = (e) => {
        setEquipo({
            ...equipo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) { // Editar equipo existente
            fetch(`/equipos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(equipo)
            })
                .then(() => {
                    alert('Equipo actualizado correctamente');
                    navigate('/equipos');
                })
                .catch(error => console.error('Error al actualizar el equipo:', error));
        } else { // Crear nuevo equipo
            fetch('/equipos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(equipo)
            })
                .then(() => {
                    alert('Equipo creado correctamente');
                    navigate('/equipos');
                })
                .catch(error => console.error('Error al crear el equipo:', error));
        }
    };

    return (
        <div>
            <h1>{id ? 'Editar Equipo' : 'Nuevo Equipo'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="tipo_equipo">Tipo de Equipo:</label>
                    <input
                        type="text"
                        id="tipo_equipo"
                        name="tipo_equipo"
                        value={equipo.tipo_equipo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="marca">Marca:</label>
                    <input
                        type="text"
                        id="marca"
                        name="marca"
                        value={equipo.marca}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="modelo">Modelo:</label>
                    <input
                        type="text"
                        id="modelo"
                        name="modelo"
                        value={equipo.modelo}
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

export default EquipoForm;