import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
} from '../controllers/projectController.js'

router.route('/').get(protect, getProjects).post(protect, createProject)
router.route('/:id').get(protect, getProject).put(protect, updateProject).delete(protect, deleteProject)

export default router