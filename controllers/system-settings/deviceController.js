import Models from '../../models/index.js'
const { Device } = Models

// GET
// ALL DEVICES
async function getDevices(req, res) {
    try {
        const devices = await Device.findAll()
        return res.json({message: 'Success', data: devices})
    } catch (error) {
        return error
    }
}

// GET
// SINGLE DEVICE
async function getDevice(req, res) {
    try {
        const deviceId = req.body.id
        const device = await Device.findByPk(deviceId)
        if (!device) return res.json({message: 'Device not found!', })
        return res.json({message: 'Success', data: device})
    } catch (error) {
        return error
    }
}

// POST
// CREATE SINGLE DEVICE
async function createDevice(req, res) {
    const {name, description} = req.body
    try {
        const createdDevice = Device.create({name, description})
        return res.json({message: 'Created device successfully', data: createdDevice})
    } catch (error) {
        // handle validation for name
        return error
    }
}

// PUT
// UPDATE SINGLE DEVICE
async function updateDevice(req, res) {
    const deviceId = req.params.id
    const {name, description} = req.body
    try {
        const device = await Device.findByPk(deviceId)
        if (!device) return res.json({message: 'Device not found!'})
        device.name = name
        device.description = description
        const updateDevice = await device.save()
        return res.json({message: 'Update device successfully', data: updateDevice})
    } catch (error) {
        // handle validation for name
        return error
    }
}

// DELETE
// SINGLE DEVICE
async function deleteDevice(req, res) {
    try {
        const deviceId = req.params.id
        const deletedDevice = await Device.destroy({where: {id: deviceId}},)
        return res.json({message: 'Delete device successfully', data: deletedDevice})
    } catch (error) {
        return error
    }
}

export {
    getDevices,
    getDevice,
    createDevice,
    updateDevice,
    deleteDevice,
}   