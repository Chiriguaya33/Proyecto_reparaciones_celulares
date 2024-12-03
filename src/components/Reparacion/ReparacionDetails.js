import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ReparacionDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reparacion, setReparacion] = useState({});

    useEffect(() => {
        fetch(`/reparaciones/${id}`)
            .then((res) => res.json())
            .then((data) => setReparacion(data));
    }, [id]);

    const handleEdit = () => {
        navigate(`/reparaciones/editar/${id}`);
    };

    const handleDelete = () => {
        if (window.confirm("¿Está seguro de que desea eliminar esta reparación?")) {
            fetch(`/reparaciones/${id}`, { method: "DELETE" })
                .then(() => {
                    alert("Reparación eliminada correctamente");
                    navigate("/reparaciones");
                })
                .catch((error) =>
                    console.error("Error al eliminar la reparación:", error)
                );
        }
    };

    return (
        <div>
            <h1>Detalles de la Reparación</h1>
            <p>
                <strong>ID:</strong> {reparacion.id_reparaciones}
            </p>
            <p>
                <strong>Equipo:</strong> {reparacion.Equipo?.modelo}{" "}
                {reparacion.Equipo?.marca}
            </p>
            <p>
                <strong>Técnico:</strong> {reparacion.Tecnico?.nombre}
            </p>
            <p>
                <strong>Fecha de ingreso:</strong> {reparacion.fecha_ingreso}
            </p>
            <p>
                <strong>Fecha de salida:</strong> {reparacion.fecha_salida}
            </p>
            <p>
                <strong>Estado:</strong> {reparacion.estado}
            </p>
            {/* Mostrar otros detalles de la reparación según sea necesario */}
            <button onClick={handleEdit}>Editar</button>
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
}

export default ReparacionDetails;