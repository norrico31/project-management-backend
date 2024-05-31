import Models from '../../models/index.js'
const { SeverityType } = Models;

// GET
// ALL SEVERITY TYPES
async function getSeverityTypes(req, res) {
    try {
        const severityTypes = await SeverityType.findAll()
        return res.json({message: 'Success', data: severityTypes})
    } catch (error) {
        return error
    }
}

// GET
// SINGLE SEVERITY TYPE
async function getSeverityType(req, res) {
    try {
        const severityTypeId = req.body.id
        const severityType = await SeverityType.findByPk(severityTypeId)
        if (!severityType) return res.json({message: 'Severity type not found!', })
        return res.json({message: 'Success', data: severityType})
    } catch (error) {
        return error
    }
}

// POST
// CREATE SINGLE SEVERITY TYPE
async function createSeverityType(req, res) {
    const {name, description} = req.body
    try {
        const createdSeverityType = SeverityType.create({name, description})
        return res.json({message: 'Created severityType successfully', data: createdSeverityType})
    } catch (error) {
        // handle validation for name
        return error
    }
}

// PUT
// UPDATE SINGLE SEVERITY TYPE
async function updateSeverityType(req, res) {
    const severityTypeId = req.params.id
    const {name, description} = req.body
    try {
        const severityType = await SeverityType.findByPk(severityTypeId)
        if (!severityType) return res.json({message: 'Severity type not found!'})
        severityType.name = name
        severityType.description = description
        const updateSeverityType = await severityType.save()
        return res.json({message: 'Update severityType successfully', data: updateSeverityType})
    } catch (error) {
        // handle validation for name
        return error
    }
}

// DELETE
// SINGLE SEVERITY TYPE
async function deleteSeverityType(req, res) {
    try {
        const severityTypeId = req.params.id
        const deletedSeverityType = await SeverityType.destroy({where: {id: severityTypeId}},)
        return res.json({message: 'Delete severityType successfully', data: deletedSeverityType})
    } catch (error) {
        return error
    }
}

export {
    getSeverityTypes,
    getSeverityType,
    createSeverityType,
    updateSeverityType,
    deleteSeverityType,
}   