import { Op } from 'sequelize';
import AsyncHandler  from 'express-async-handler';
import Models from '../../models/index.js'
const { IssueType } = Models

// GET
// ALL ISSUE TYPES
const getIssueTypes = AsyncHandler(async (req, res) => {
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
    const issueTypes = await IssueType.findAll(query)
    return res.json({message: 'Success', data: issueTypes})
})

// GET
// SINGLE ISSUE TYPE
const getIssueType = AsyncHandler(async (req, res) => {
    const issueTypeId = req.params.id
    const data = await IssueType.findByPk(issueTypeId)
    if (!data) {
        res.status(404)
        throw new Error('Issue type not found!')
    }
    return res.json({message: 'Sucess', data})
})

// POST
// CREATE SINGLE ISSUE TYPE
const createIssueType = AsyncHandler(async (req, res) => {
    const {name, description} = req.body
    if (!name) {
        res.status(400)
        throw new Error('Please enter issue type name')
    }
    const data = await IssueType.create({name, description})
    return res.json({message: 'Create Issue Type Successfully', data})

})

// PUT
// UPDATE SINGLE ISSUE TYPE
const updateIssueType = AsyncHandler(async (req, res) => {
    const issueTypeId = req.params.id
    const {name, description} = req.body
    let data = await IssueType.findByPk(issueTypeId)
    if (!data) {
        res.status(404)
        throw new Error('Issue type not found!')
    }
    data.name = name
    data.description = description
    data = await data.save()
    return res.json({message: 'Update Issue Type Successfully', data})
})

// DELETE
// SINGLE ISSUE TYPE
const deleteIssueType = AsyncHandler(async (req, res) => {
    const issueTypeId = req.params.id
    let data = await IssueType.findByPk(issueTypeId)
    if (!data) {
        res.status(404)
        throw new Error('Issue type not found!')
    }
    data = await data.destroy()
    return res.json({message: 'Delete issue type successfully', data})

})

export {
    getIssueTypes,
    getIssueType,
    createIssueType,
    updateIssueType,
    deleteIssueType,
}   