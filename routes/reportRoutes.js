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

router.route('/').get(protect, getReports).post(protect, createReport)
router.route('/:id').get(protect, getReport).put(protect, updateReport).delete(protect, deleteReport)

export default router