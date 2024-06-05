import { Op } from 'sequelize';
import AsyncHandler  from 'express-async-handler';
import Models from '../../models/index.js'
const { SeverityType } = Models;

// GET
// ALL SEVERITY TYPES
const getSeverityTypes = AsyncHandler(async (req, res) => {
    const { search = '' } = req.query;
    const query = {
        ...(search !== '') ? {
            where: {
                [Op.or]:[
                    { name: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } },
                ]
            }
        } : {}
    }
    const severityTypes = await SeverityType.findAll(query)
    return res.json({message: 'Success', data: severityTypes})
})

// GET
// SINGLE SEVERITY TYPE
const getSeverityType = AsyncHandler(async (req, res) => {
    const severityTypeId = req.params.id
    const data = await SeverityType.findByPk(severityTypeId)
    if (!data) {
        res.status(404)
        throw new Error('Severity type not found!')
    }
    return res.json({message: 'Success', data})
})

// POST
// CREATE SINGLE SEVERITY TYPE
const createSeverityType = AsyncHandler(async (req, res) => {
    const {name, description} = req.body
    if (!name) {
        res.status(400)
        throw new Error('Please enter severity type name')
    }
    const data = await SeverityType.create({name, description})
    return res.json({message: 'Create Severity Type Successfully', data})
})

// PUT
// UPDATE SINGLE SEVERITY TYPE
const updateSeverityType = AsyncHandler(async (req, res) => {
    const severityTypeId = req.params.id
    const {name, description} = req.body
    let data = await SeverityType.findByPk(severityTypeId)
    if (!data) {
        res.status(404)
        throw new Error('Severity type not found!')
    }
    data.name = name
    data.description = description
    data = await data.save()
    return res.json({message: 'Update Severity Type Successfully', data})
})

// DELETE
// SINGLE SEVERITY TYPE
const deleteSeverityType = AsyncHandler(async (req, res) => {
    const severityTypeId = req.params.id
    let data = await SeverityType.findByPk(severityTypeId)
    if (!data) {
        res.status(404)
        throw new Error('Severity type not found!')
    }
    data = await data.destroy()
    return res.json({message: 'Delete Severity Type Successfully', data})
})

export {
    getSeverityTypes,
    getSeverityType,
    createSeverityType,
    updateSeverityType,
    deleteSeverityType,
}   