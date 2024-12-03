import Tecnico from '../models/Tecnico.js';

export const obtenerTecnicos = async (req, res) => {
    try {
        const tecnicos = await Tecnico.findAll();
        res.json(tecnicos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const crearTecnico = async (req, res) => {
    try {
        const { nombre, especialidad } = req.body;
        const nuevoTecnico = await Tecnico.create({
            nombre,
            especialidad
        });
        res.json(nuevoTecnico);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const obtenerTecnico = async (req, res) => {
    try {
        const { id } = req.params;
        const tecnico = await Tecnico.findByPk(id);
        if (!tecnico) {
            return res.status(404).json({ message: 'Técnico no encontrado' });
        }
        res.json(tecnico);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const actualizarTecnico = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, especialidad } = req.body;
        const tecnico = await Tecnico.findByPk(id);
        if (!tecnico) {
            return res.status(404).json({ message: 'Técnico no encontrado' });
        }
        await tecnico.update({
            nombre,
            especialidad
        });
        res.json({ message: 'Técnico actualizado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const eliminarTecnico = async (req, res) => {
    try {
        const { id } = req.params;
        const tecnico = await Tecnico.findByPk(id);
        if (!tecnico) {
            return res.status(404).json({ message: 'Técnico no encontrado' });
        }
        await tecnico.destroy();
        res.json({ message: 'Técnico eliminado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};