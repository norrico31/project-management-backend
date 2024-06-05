import { Op } from 'sequelize';
import AsyncHandler  from 'express-async-handler';
import Models from '../../models/index.js'
const { Statuses } = Models;

// GET
// ALL STATUSES
const getStatuses = AsyncHandler(async (req, res) => {
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
    const data = await Statuses.findAll()
    return res.json({message: 'Success', data})
})

// GET
// SINGLE STATUS
const getStatus = AsyncHandler(async (req, res) => {
    const statusId = req.params.id
    const data = await Statuses.findByPk(statusId)
    if (!data) {
        res.status(404)
        throw new Error('Status not found!')
    }
    return res.json({message: 'Success', data})
})

// POST
// CREATE SINGLE STATUS
const createStatus = AsyncHandler(async (req, res) => {
    const {name, description} = req.body
    if (!name) {
        res.status(400)
        throw new Error('Please enter status name')
    }
    const data = await Statuses.create({name, description})
    return res.json({message: 'Create Status Successfully', data})
})

// PUT
// UPDATE SINGLE STATUS
const updateStatus = AsyncHandler(async (req, res) => {
    const statusId = req.params.id
    const {name, description} = req.body
    let data = await Statuses.findByPk(statusId)
    if (!data) {
        res.status(404)
        throw new Error('Status not found!')
    }
    data.name = name
    data.description = description
    data = await data.save()
    return res.json({message: 'Update Status Successfully', data})
})

// DELETE
// SINGLE STATUS
const deleteStatus = AsyncHandler(async (req, res) => {
    const statusId = req.params.id
    let data = await Statuses.findByPk(statusId)
    if (!data) {
        res.status(404)
        throw new Error('Status not found!')
    }
    data = await data.destroy()
    return res.json({message: 'Delete Status Successfully', data})
})

export {
    getStatuses,
    getStatus,
    createStatus,
    updateStatus,
    deleteStatus,
}   