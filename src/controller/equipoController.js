import Equipo from '../models/Equipo.js';

export const obtenerEquipos = async (req, res) => {
    try {
        const equipos = await Equipo.findAll({
            include: { model: Cliente } // Incluir la información del cliente en la respuesta
        });
        res.json(equipos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const crearEquipo = async (req, res) => {
    try {
        const { modelo, marca, imei, descripcion_falla, cliente_id } = req.body;
        const nuevoEquipo = await Equipo.create({
            modelo,
            marca,
            imei,
            descripcion_falla,
            cliente_id
        });
        res.json(nuevoEquipo);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const obtenerEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const equipo = await Equipo.findByPk(id, { include: { model: Cliente } });
        if (!equipo) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.json(equipo);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const actualizarEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const { modelo, marca, imei, descripcion_falla, cliente_id } = req.body;
        const equipo = await Equipo.findByPk(id);
        if (!equipo) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        await equipo.update({
            modelo,
            marca,
            imei,
            descripcion_falla,
            cliente_id
        });
        res.json({ message: 'Equipo actualizado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const eliminarEquipo = async (req, res) => {
    try {
        const { id } = req.params;
        const equipo = await Equipo.findByPk(id);
        if (!equipo) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        await equipo.destroy();
        res.json({ message: 'Equipo eliminado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};