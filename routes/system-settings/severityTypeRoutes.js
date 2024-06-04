import express from 'express'
const router = express.Router()
import { protect } from '../../middleware/authMiddleware.js'
import {
    getSeverityTypes,
    getSeverityType,
    createSeverityType,
    updateSeverityType,
    deleteSeverityType,
} from '../../controllers/system-settings/severityTypeController.js'

router.route('/').get(protect, getSeverityTypes).post(protect, createSeverityType)
router.route('/:id').get(protect, getSeverityType).put(protect, updateSeverityType).delete(protect, deleteSeverityType)

export default router