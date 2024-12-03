import Cliente from '../models/Cliente.js';

export const obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const crearCliente = async (req, res) => {
    try {
        const { nombre_cliente, telefono, correo_electronico, direccion } = req.body;
        const nuevoCliente = await Cliente.create({
            nombre_cliente,
            telefono,
            correo_electronico,
            direccion
        });
        res.json(nuevoCliente);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const obtenerCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_cliente, telefono, correo_electronico, direccion } = req.body;
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        await cliente.update({
            nombre_cliente,
            telefono,
            correo_electronico,
            direccion
        });
        res.json({ message: 'Cliente actualizado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        await cliente.destroy();
        res.json({ message: 'Cliente eliminado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};