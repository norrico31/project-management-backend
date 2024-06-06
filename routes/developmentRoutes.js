import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import {
    getDevelopments,
    getDevelopment,
    createDevelopment,
    updateDevelopment,
    deleteDevelopment,
} from '../controllers/developmentController.js'

router.route('/').get(protect, getDevelopments)
router.route('/:id').get(protect, getDevelopment).delete(protect, deleteDevelopment)
router.post('/create/:id', protect, createDevelopment)
router.put('/update/id',protect, updateDevelopment)

export default router