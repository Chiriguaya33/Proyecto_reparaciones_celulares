import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ReparacionForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reparacion, setReparacion] = useState({
        equipo_id: "",
        fecha_ingreso: "",
        fecha_salida: "",
        estado: "",
        costo_repuestos: "",
        costo_servicio: "",
        tecnico_id: "",
        // Agrega otros campos según sea necesario
    });

    useEffect(() => {
        if (id) {
            // Si existe un ID, estamos editando una reparación existente
            fetch(`/reparaciones/${id}`)
                .then((res) => res.json())
                .then((data) => setReparacion(data));
        }
    }, [id]);

    const handleChange = (e) => {
        setReparacion({
            ...reparacion,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            // Editar reparación existente
            fetch(`/reparaciones/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reparacion),
            })
                .then(() => {
                    alert("Reparación actualizada correctamente");
                    navigate("/reparaciones");
                })
                .catch((error) =>
                    console.error("Error al actualizar la reparación:", error)
                );
        } else {
            // Crear nueva reparación
            fetch("/reparaciones", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reparacion),
            })
                .then(() => {
                    alert("Reparación creada correctamente");
                    navigate("/reparaciones");
                })
                .catch((error) =>
                    console.error("Error al crear la reparación:", error)
                );
        }
    };

    return (
        <div>
            <h1>{id ? "Editar Reparación" : "Nueva Reparación"}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="equipo_id">Equipo ID:</label>
                    <input
                        type="text"
                        id="equipo_id"
                        name="equipo_id"
                        value={reparacion.equipo_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fecha_ingreso">Fecha de ingreso:</label>
                    <input
                        type="date"
                        id="fecha_ingreso"
                        name="fecha_ingreso"
                        value={reparacion.fecha_ingreso}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fecha_salida">Fecha de salida:</label>
                    <input
                        type="date"
                        id="fecha_salida"
                        name="fecha_salida"
                        value={reparacion.fecha_salida}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="estado">Estado:</label>
                    <input
                        type="text"
                        id="estado"
                        name="estado"
                        value={reparacion.estado}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Agrega más campos según sea necesario */}
                <button type="submit">{id ? "Actualizar" : "Crear"}</button>
            </form>
        </div>
    );
}

export default ReparacionForm;