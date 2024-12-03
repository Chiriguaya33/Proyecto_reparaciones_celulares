import { Router } from 'express';
import {
    obtenerClientes,
    crearCliente,
    obtenerCliente,
    actualizarCliente,
    eliminarCliente
} from '../controller/clienteController.js';

const router = Router();

router.get('/clientes', obtenerClientes);
router.post('/clientes', crearCliente);
router.get('/clientes/:id', obtenerCliente);  // Asegúrate de usar :id para capturar el parámetro
router.put('/clientes/:id', actualizarCliente); // Asegúrate de usar :id para capturar el parámetro
router.delete('/clientes/:id', eliminarCliente); // Asegúrate de usar :id para capturar el parámetro

export default router;