import express from 'express'
const router = express.Router()
import { protect } from '../../middleware/authMiddleware.js'
import {
    getDevices,
    getDevice,
    createDevice,
    updateDevice,
    deleteDevice,
} from '../../controllers/system-settings/deviceController.js'

router.route('/').get(protect, getDevices).post(protect, createDevice)
router.route('/:id').get(protect, getDevice).put(protect, updateDevice).delete(protect, deleteDevice)

export default router