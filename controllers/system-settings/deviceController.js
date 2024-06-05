import Models from '../../models/index.js'
import AsyncHandler  from 'express-async-handler';
const { Device } = Models

// GET
// ALL DEVICES
const getDevices = AsyncHandler (async (req, res) => {
    const { search = ''} = req.query;
    const query = {
        ...(search !== '') ? {
            where: {
                [Op.or]:[
                    { email: { [Op.like]: `%${search}%` } },
                    { first_name: { [Op.like]: `%${search}%` } },
                    { last_name: { [Op.like]: `%${search}%` } },
                    { middle_name: { [Op.like]: `%${search}%` } },
                    { age: { [Op.like]: `%${search}%` } },
                    { phone_no: { [Op.like]: `%${search}%` } },
                  ]
            }
        } : {}
    }
    const devices = await Device.findAll(query)
    res.json({message: 'Success', data: devices})
})

// GET
// SINGLE DEVICE
const getDevice = AsyncHandler(async (req, res) => {
    const deviceId = req.params.id
    const device = await Device.findByPk(deviceId)
    if (!device) {
        res.status(404)
        throw new Error('Device not found!')
    }
    res.json({message: 'Success', data: device})
})

// POST
// CREATE SINGLE DEVICE
const createDevice = AsyncHandler(async (req, res) => {
    const {name, description} = req.body
    const createdDevice = await Device.create({name, description})
    if (!createdDevice) {
        res.status(400)
        throw new Error('Please enter valid device name')
    }
    res.json({message: 'Success', data: createdDevice})
})

// PUT
// UPDATE SINGLE DEVICE
const updateDevice = AsyncHandler(async (req, res) => {
    const deviceId = req.params.id
    const device = await Device.findByPk(deviceId)
    if (device) {
        const {name, description} = req.body
        device.name = name
        device.description = description
        const updateDevice = await device.save()
        res.json({message: 'Update Device Successfully!', data: updateDevice})
    }
    res.status(404)
    throw new Error('Device not found!')
})

// DELETE
// SINGLE DEVICE
const deleteDevice = AsyncHandler(async (req, res) => {
    const deviceId = req.params.id
    const deletedDevice = await Device.findByPk(deviceId)
    if (!deletedDevice) {
        res.status(404)
        throw new Error('Device not found!')
    }
    res.json({message: 'Delete Device Successfully!'})
})

export {
    getDevices,
    getDevice,
    createDevice,
    updateDevice,
    deleteDevice,
}   