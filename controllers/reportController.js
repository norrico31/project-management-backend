import { Op } from 'sequelize';
import AsyncHandler  from 'express-async-handler';
import Models from '../models/index.js'

// GET
// ALL REPORT
const getReports = AsyncHandler(async (req, res) => {
    const { search = '' } = req.query;
    const query = {
        ...(search !== '') ? {
            where: {
                [Op.or]:[
                    // TODO: HOW TO SEARCH DEEP OBJECT RELATION
                    { name: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } },
                ]
            }
        } : {}
    }
    const data = await Models.Report.findAll({
        ...query,
        include: [
            {
                model: Models.User,
                as: 'user' //TODO: arrays of user_id
            },
            {
                model: Models.Statuses,
                as: 'status'
            },
        ]
    })
    return res.json({ message: 'Success', data })
})

// GET
// SINGLE REPORT
const getReport = AsyncHandler(async (req, res) => {
    const reportId = req.params.id
    const data = await Models.Report.findByPk(reportId)
    if (!data) {
        res.status(404)
        throw new Error('Report not found!')
    }
    return res.json({ message: 'Success', data })
})

// POST
// CREATE SINGLE REPORT
const createReport = AsyncHandler(async (req, res) => {
    const projectId = req.params.id;
    if (!projectId) {
        res.status(400)
        throw new Error('Please enter project!')
    }
    const {
        user_id,
        date,
        description,
        actual_time_spent
    } = req.body
    const data = await Models.Report.create({
        projectId,
        user_id,
        date,
        description,
        actual_time_spent,
    })
    return res.json({ message: 'Create Report Successfully!', data })
})

// PUT
// UPDATE SINGLE REPORT
const updateReport = AsyncHandler(async (req, res) => {
    const reportId = req.params.id
    if (!reportId) {
        res.status(400)
        throw new Error('Report not found!')
    }
    const {
        user_id,
        projectId,
        date,
        description,
        actual_time_spent
    } = req.body
    let data = await Models.Report.findByPk(reportId)
    if (!data) {
        res.status(404)
        throw new Error('Report ID doest not exist!')
    }
    data.user_id = user_id
    data.projectId = projectId
    data.date = date
    data.description = description
    data.actual_time_spent = actual_time_spent
    data = await data.save()
    return res.json({ message: 'Update Report Successfully!', data })
})

// DELETE
// SINGLE REPORT
const deleteReport = AsyncHandler(async (req, res) => {
    const reportId = req.params.id
    let data = await Models.Report.findByPk(reportId)
    if (!data) {
        res.status(404)
        throw new Error('Report not found!')
    }
    data = await data.destroy()
    return res.json({ message: 'Delete Report Successfully!', data })
})

export {
    getReports,
    getReport,
    createReport,
    updateReport,
    deleteReport,
}   