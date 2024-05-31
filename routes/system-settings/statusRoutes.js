import express from 'express'
const router = express.Router()
import { protect } from '../../middleware/authentication.js'
import {
    getStatuses,
    getStatus,
    createStatus,
    updateStatus,
    deleteStatus,
} from '../../controllers/system-settings/statusController.js'

router.route('/').get(protect, getStatuses).post(protect, createStatus)
router.route('/:id').get(protect, getStatus).put(protect, updateStatus).delete(protect, deleteStatus)

export default router