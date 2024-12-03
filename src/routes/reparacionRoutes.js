import { Router } from 'express';
import {
    obtenerReparaciones,
    crearReparacion,
    obtenerReparacion,
    actualizarReparacion,
    eliminarReparacion
} from '../controller/reparacionController.js';

const router = Router();

router.get('/reparaciones', obtenerReparaciones);
router.post('/reparaciones', crearReparacion);
router.get('/reparaciones/:id', obtenerReparacion);
router.put('/reparaciones/:id', actualizarReparacion);
router.delete('/reparaciones/:id', eliminarReparacion);

export default router;