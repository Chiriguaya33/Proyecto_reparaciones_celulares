import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
    try {
        const { nombre_usuario, contrasena, rol } = req.body;
        const nuevoUsuario = await Usuario.create({
            nombre_usuario,
            contrasena,
            rol
        });
        res.json(nuevoUsuario);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Obtener un usuario por ID
export const obtenerUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Actualizar un usuario
export const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_usuario, contrasena, rol } = req.body;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Hashear la nueva contraseña si se proporciona
        if (contrasena) {
            const salt = await bcrypt.genSalt(10);
            const hashedContrasena = await bcrypt.hash(contrasena, salt);
            await usuario.update({
                nombre_usuario,
                contrasena: hashedContrasena, // Actualizar con la contraseña hasheada
                rol
            });
        } else {
            // Actualizar solo los otros campos si no se proporciona una nueva contraseña
            await usuario.update({
                nombre_usuario,
                rol
            });
        }
        res.json({ message: 'Usuario actualizado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Eliminar un usuario
export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await usuario.destroy();
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { nombre_usuario, contrasena } = req.body;
        const usuario = await Usuario.findOne({ where: { nombre_usuario } });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const match = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!match) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: usuario.id_usuario }, 'secreto_para_firmar_token', {
            expiresIn: '1h'
        });

        res.json({ token });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};