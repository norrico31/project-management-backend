import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import {
    getBacklogs,
    getBacklog,
    createBacklog,
    updateBacklog,
    deleteBacklog,
} from '../controllers/backlogController.js'

router.route('/').get(protect, getBacklogs)
router.route('/:id').get(protect, getBacklog).delete(protect, deleteBacklog)
router.post('/create/:id', protect, createBacklog)
router.put('/update/id',protect, updateBacklog)
export default router