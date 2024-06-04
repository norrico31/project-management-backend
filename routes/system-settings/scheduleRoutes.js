import express from 'express'
const router = express.Router()
import { protect } from '../../middleware/authMiddleware.js'
import {
    getSchedules,
    getSchedule,
    createSchedule,
    updateSchedule,
    deleteSchedule,
} from '../../controllers/system-settings/scheduleController.js'

router.route('/').get(protect, getSchedules).post(protect, createSchedule)
router.route('/:id').get(protect, getSchedule).put(protect, updateSchedule).delete(protect, deleteSchedule)

export default router