import { Router } from 'express';
import {
    obtenerTecnicos,
    crearTecnico,
    obtenerTecnico,
    actualizarTecnico,
    eliminarTecnico
} from '../controller/tecnicoController.js';

const router = Router();

router.get('/tecnicos', obtenerTecnicos);
router.post('/tecnicos', crearTecnico);
router.get('/tecnicos/:id', obtenerTecnico);
router.put('/tecnicos/:id', actualizarTecnico);
router.delete('/tecnicos/:id', eliminarTecnico);

export default router;