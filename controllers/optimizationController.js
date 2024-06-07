import { Op } from 'sequelize'
import AsyncHandler  from 'express-async-handler'
import Models from '../models/index.js'

// GET
// ALL OPTIMIZATIONS
const getOptimizations = AsyncHandler(async (req, res) => {
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

    const data = await Models.Optimization.findAll({
        ...query,
        include: [
            {
                model: Models.User,
                as: 'tested_by' //TODO: arrays of user_id
            },
            {
                model: Models.Project,
                as: 'project'
            },
        ]
    })

    return res.json({ message: 'Success', data })
})

// GET
// SINGLE OPTIMIZATION
const getOptimization = AsyncHandler(async (req, res) => {
    const optimizationId = req.params.id
    const data = await Models.Optimization.findByPk(optimizationId)
    if (!data) {
        res.status(404)
        throw new Error('Optimization not found!')
    }
    return res.json({ message: 'Success', data })
})

// POST
// CREATE SINGLE OPTIMIZATION
const createOptimization = AsyncHandler(async (req, res) => {
    const projectId = req.params.id;
    if (!projectId) {
        res.status(400)
        throw new Error('Please enter project!')
    }
    const {
        url,
        gt_metrix_score_a,
        desktop_90,
        desktop_80,
        user_id,
        date_tested,
        notes
    } = req.body
    if (!url) {
        res.status(400)
        throw new Error('Please enter page url!')
    }
    const data = await Models.Optimization.create({
        projectId,
        url,
        gt_metrix_score_a,
        desktop_90,
        desktop_80,
        user_id,
        date_tested,
        notes
    })
    return res.json({ message: 'Create Optimization Successfully!', data })
})

// PUT
// UPDATE SINGLE OPTIMIZATION
const updateOptimization = AsyncHandler(async (req, res) => {
    const optimizationId = req.params.id
    if (!optimizationId) {
        res.status(400)
        throw new Error('Optimization not found!')
    }
    const {
        user_id,
        projectId,
        url,
        gt_metrix_score_a,
        desktop_90,
        desktop_80,
        date_tested,
        notes
    } = req.body
    let data = await Models.Optimization.findByPk(optimizationId)
    if (!data) {
        res.status(404)
        throw new Error('Optimization ID doest not exist!')
    }
    data.user_id = user_id
    data.projectId = projectId
    data.url = url
    data.gt_metrix_score_a = gt_metrix_score_a
    data.desktop_90 = desktop_90
    data.desktop_80 = desktop_80
    data.date_tested = date_tested
    data.notes = notes
    data = await data.save()
    return res.json({ message: 'Update Optimization Successfully!', data })
})

// DELETE
// SINGLE OPTIMIZATION
const deleteOptimization = AsyncHandler(async (req, res) => {
    const reportId = req.params.id
    let data = await Models.Optimization.findByPk(reportId)
    if (!data) {
        res.status(404)
        throw new Error('Optimization not found!')
    }
    data = await data.destroy()
    return res.json({ message: 'Delete Optimization Successfully!', data })
})

export {
    getOptimizations,
    getOptimization,
    createOptimization,
    updateOptimization,
    deleteOptimization,
}