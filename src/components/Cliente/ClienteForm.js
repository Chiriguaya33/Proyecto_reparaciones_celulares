import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ClienteForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cliente, setCliente] = useState({
        nombre_cliente: '',
        telefono: '',
        correo_electronico: '',
    });

    useEffect(() => {
        if (id) { // Si existe un ID, estamos editando un cliente existente
            fetch(`/clientes/${id}`)
                .then(res => res.json())
                .then(data => setCliente(data));
        }
    }, [id]);

    const handleChange = (e) => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) { // Editar cliente existente
            fetch(`/clientes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cliente)
            })
                .then(() => {
                    alert('Cliente actualizado correctamente');
                    navigate('/clientes');
                })
                .catch(error => console.error('Error al actualizar el cliente:', error));
        } else { // Crear nuevo cliente
            fetch('/clientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cliente)
            })
                .then(() => {
                    alert('Cliente creado correctamente');
                    navigate('/clientes');
                })
                .catch(error => console.error('Error al crear el cliente:', error));
        }
    };

    return (
        <div>
            <h1>{id ? 'Editar Cliente' : 'Nuevo Cliente'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre_cliente">Nombre:</label>
                    <input
                        type="text"
                        id="nombre_cliente"
                        name="nombre_cliente"
                        value={cliente.nombre_cliente}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="telefono">Teléfono:</label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={cliente.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="correo_electronico">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="correo_electronico"
                        name="correo_electronico"
                        value={cliente.correo_electronico}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
            </form>
        </div>
    );
}

export default ClienteForm;