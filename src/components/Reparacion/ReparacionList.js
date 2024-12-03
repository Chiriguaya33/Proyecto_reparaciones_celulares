import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ReparacionList() {
    const [reparaciones, setReparaciones] = useState([]);

    useEffect(() => {
        fetch("/reparaciones")
            .then((res) => res.json())
            .then((data) => setReparaciones(data));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("¿Está seguro de que desea eliminar esta reparación?")) {
            fetch(`/reparaciones/${id}`, { method: "DELETE" })
                .then(() => {
                    // Actualizar la lista de reparaciones después de eliminar
                    setReparaciones(
                        reparaciones.filter(
                            (reparacion) => reparacion.id_reparaciones !== id
                        )
                    );
                    alert("Reparación eliminada correctamente");
                })
                .catch((error) =>
                    console.error("Error al eliminar la reparación:", error)
                );
        }
    };

    return (
        <div>
            <h1>Lista de Reparaciones</h1>
            <Link to="/reparaciones/nuevo">
                <button>Nueva Reparación</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Equipo</th>
                        <th>Técnico</th>
                        <th>Fecha de ingreso</th>
                        <th>Fecha de salida</th>
                        <th>Estado</th>
                        {/* Agrega más encabezados según sea necesario */}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reparaciones.map((reparacion) => (
                        <tr key={reparacion.id_reparaciones}>
                            <td>{reparacion.id_reparaciones}</td>
                            <td>
                                {reparacion.Equipo?.tipo_equipo} {reparacion.Equipo?.marca}{" "}
                                {reparacion.Equipo?.modelo}
                            </td>
                            <td>{reparacion.Tecnico?.nombre}</td>
                            <td>{reparacion.fecha_ingreso}</td>
                            <td>{reparacion.fecha_salida}</td>
                            <td>{reparacion.estado}</td>
                            {/* Agrega más celdas según sea necesario */}
                            <td>
                                <Link to={`/reparaciones/${reparacion.id_reparaciones}`}>
                                    <button>Ver</button>
                                </Link>
                                <Link to={`/reparaciones/editar/${reparacion.id_reparaciones}`}>
                                    <button>Editar</button>
                                </Link>
                                <button onClick={() => handleDelete(reparacion.id_reparaciones)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReparacionList;