import express from 'express'
const router = express.Router()
import { protect } from '../../middleware/authMiddleware.js'
import {
    getProjectTypes,
    getProjectType,
    createProjectType,
    updateProjectType,
    deleteProjectType,
} from '../../controllers/system-settings/projectTypeController.js'

router.route('/').get(protect, getProjectTypes).post(protect, createProjectType)
router.route('/:id').get(protect, getProjectType).put(protect, updateProjectType).delete(protect, deleteProjectType)

export default router