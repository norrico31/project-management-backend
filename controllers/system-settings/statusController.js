import Models from '../../models/index.js'
const { Statuses } = Models;

// GET
// ALL STATUSES
async function getStatuses(req, res) {
    try {
        const statuses = await Statuses.findAll()
        return res.json({message: 'Success', data: statuses})
    } catch (error) {
        return error
    }
}

// GET
// SINGLE STATUS
async function getStatus(req, res) {
    try {
        const statusId = req.body.id
        const status = await Statuses.findByPk(statusId)
        if (!status) return res.json({message: 'Status not found!', })
        return res.json({message: 'Success', data: status})
    } catch (error) {
        return error
    }
}

// POST
// CREATE SINGLE STATUS
async function createStatus(req, res) {
    const {name, description} = req.body
    try {
        const createdStatus = Statuses.create({name, description})
        return res.json({message: 'Created status successfully', data: createdStatus})
    } catch (error) {
        // handle validation for name
        return error
    }
}

// PUT
// UPDATE SINGLE STATUS
async function updateStatus(req, res) {
    const statusId = req.params.id
    const {name, description} = req.body
    try {
        const status = await Statuses.findByPk(statusId)
        if (!status) return res.json({message: 'Status not found!'})
        status.name = name
        status.description = description
        const updateStatus = await status.save()
        return res.json({message: 'Update status successfully', data: updateStatus})
    } catch (error) {
        // handle validation for name
        return error
    }
}

// DELETE
// SINGLE STATUS
async function deleteStatus(req, res) {
    try {
        const statusId = req.params.id
        const deletedStatus = await Statuses.destroy({where: {id: statusId}},)
        return res.json({message: 'Delete status successfully', data: deletedStatus})
    } catch (error) {
        return error
    }
}

export {
    getStatuses,
    getStatus,
    createStatus,
    updateStatus,
    deleteStatus,
}   