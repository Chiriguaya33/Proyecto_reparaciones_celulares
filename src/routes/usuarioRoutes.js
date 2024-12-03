import { Router } from 'express';
import {
    obtenerUsuarios,
    crearUsuario,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario,
    login
} from '../controller/usuarioController.js';

const router = Router();

router.get('/usuarios', obtenerUsuarios);
router.post('/usuarios', crearUsuario);
router.get('/usuarios/:id', obtenerUsuario);
router.put('/usuarios/:id', actualizarUsuario);
router.delete('/usuarios/:id', eliminarUsuario);
router.post('/login', login); // Ruta para el login

export default router;