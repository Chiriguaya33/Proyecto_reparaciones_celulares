import Reparacion from '../models/Reparacion.js';
import Equipo from '../models/Equipo.js';
import Tecnico from '../models/Tecnico.js';

export const obtenerReparaciones = async (req, res) => {
    try {
        const reparaciones = await Reparacion.findAll({
            include: [
                { model: Equipo },
                { model: Tecnico }
            ]
        });
        res.json(reparaciones);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const crearReparacion = async (req, res) => {
    try {
        const { equipo_id, fecha_ingreso, fecha_salida, estado, costo_repuestos, costo_servicio, tecnico_id } = req.body;
        const nuevaReparacion = await Reparacion.create({
            equipo_id,
            fecha_ingreso,
            fecha_salida,
            estado,
            costo_repuestos,
            costo_servicio,
            tecnico_id
        });
        res.json(nuevaReparacion);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const obtenerReparacion = async (req, res) => {
    try {
        const { id } = req.params;
        const reparacion = await Reparacion.findByPk(id, {
            include: [
                { model: Equipo },
                { model: Tecnico }
            ]
        });
        if (!reparacion) {
            return res.status(404).json({ message: 'Reparación no encontrada' });
        }
        res.json(reparacion);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const actualizarReparacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { equipo_id, fecha_ingreso, fecha_salida, estado, costo_repuestos, costo_servicio, tecnico_id } = req.body;
        const reparacion = await Reparacion.findByPk(id);
        if (!reparacion) {
            return res.status(404).json({ message: 'Reparación no encontrada' });
        }
        await reparacion.update({
            equipo_id,
            fecha_ingreso,
            fecha_salida,
            estado,
            costo_repuestos,
            costo_servicio,
            tecnico_id
        });
        res.json({ message: 'Reparación actualizada' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const eliminarReparacion = async (req, res) => {
    try {
        const { id } = req.params;
        const reparacion = await Reparacion.findByPk(id);
        if (!reparacion) {
            return res.status(404).json({ message: 'Reparación no encontrada' });
        }
        await reparacion.destroy();
        res.json({ message: 'Reparación eliminada' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};