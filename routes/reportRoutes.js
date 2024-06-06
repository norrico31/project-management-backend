import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import {
    getReports,
    getReport,
    createReport,
    updateReport,
    deleteReport,
} from '../controllers/reportController.js'

router.route('/').get(protect, getReports)
router.route('/:id').get(protect, getReport).delete(protect, deleteReport)
router.post('/create/:id', protect, createReport)
router.put('/update/id',protect, updateReport)

export default router