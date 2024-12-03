import { Router } from 'express';
import {
    obtenerEquipos,
    crearEquipo,
    obtenerEquipo,
    actualizarEquipo,
    eliminarEquipo
} from '../controller/equipoController.js';

const router = Router();

router.get('/equipos', obtenerEquipos);
router.post('/equipos', crearEquipo);
router.get('/equipos/:id', obtenerEquipo);
router.put('/equipos/:id', actualizarEquipo);
router.delete('/equipos/:id', eliminarEquipo);

export default router;