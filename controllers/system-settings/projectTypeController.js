import AsyncHandler  from 'express-async-handler';
import Models from '../../models/index.js'
const { ProjectType } = Models;

// GET
// ALL PROJECT TYPES
const getProjectTypes = AsyncHandler(async (req, res) => {
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
    const data = await ProjectType.findAll(query)
    return res.json({message: 'Success', data})
})

// GET
// SINGLE PROJECT TYPE
const getProjectType = AsyncHandler(async (req, res) => {
    const projectTypeId = req.params.id
    const data = await ProjectType.findByPk(projectTypeId)
    if (!data) {
        res.status(404)
        throw new Error('Project type not found!')
    }
    return res.json({message: 'Success', data})
})

// POST
// CREATE SINGLE PROJECT TYPE
const createProjectType = AsyncHandler(async (req, res) => {
    const {name, description} = req.body
    if (!name) {
        res.status(400)
        throw new Error('Please enter project type name')
    }
    const data = await ProjectType.create({name, description})
    return res.json({message: 'Created project type successfully', data})
})

// PUT
// UPDATE SINGLE PROJECT TYPE
const updateProjectType = AsyncHandler(async (req, res) => {
    const projectTypeId = req.params.id
    const {name, description} = req.body
    let data = await ProjectType.findByPk(projectTypeId)
    if (!data) {
        res.status(404)
        throw new Error('Project type not found!')
    }
    data.name = name
    data.description = description
    data = await data.save()
    return res.json({message: 'Update project type successfully', data})
})

// DELETE
// SINGLE PROJECT TYPE
const deleteProjectType = AsyncHandler(async (req, res) => {
    const projectTypeId = req.params.id
    let data = await ProjectType.findByPk(projectTypeId)
    if (!data) {
        res.status(404)
        throw new Error('Project type not found!')
    }
    data = await data.destroy()
    return res.json({message: 'Delete Project Type Successfully', data})
})

export {
    getProjectTypes,
    getProjectType,
    createProjectType,
    updateProjectType,
    deleteProjectType,
}   