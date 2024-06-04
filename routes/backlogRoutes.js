import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authentication.js'
import {
    getBacklogs,
    getBacklog,
    createBacklog,
    updateBacklog,
    deleteBacklog,
} from '../controllers/backlogController.js'

router.route('/').get(protect, getBacklogs).post(protect, createBacklog)
router.route('/:id').get(protect, getBacklog).put(protect, updateBacklog).delete(protect, deleteBacklog)

export default router