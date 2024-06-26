import { Op } from 'sequelize';
import AsyncHandler from 'express-async-handler'
import Models from '../../models/index.js'
const {Role} = Models; 

// GET
// ALL ROLES
const getRoles = AsyncHandler(async (req, res) => {
    const { search = ''} = req.query;
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
    const roles = await Role.findAll(query)
    return res.json({message: 'Success', data: roles})
})

// GET
// SINGLE ROLE
const getRole = AsyncHandler(async (req, res) => {
    const roleId = req.params.id
    const role = await Role.findByPk(roleId)
    if (!role) {
        res.status(404)
        throw new Error('Role not found!')
    } 
    res.json({data: role})
})

// POST
// CREATE SINGLE ROLE
const createRole = AsyncHandler(async (req, res) => {
    const {name, description} = req.body
    const createdRole = await Role.create({name, description})
    if (!createdRole) {
        res.status(400)
        throw new Error('Please enter valid name')
    } 
    res.json({message: 'Created role successfully', data: createdRole})
})

// PUT
// UPDATE SINGLE ROLE
const updateRole = AsyncHandler(async (req, res) => {
    const roleId = req.params.id
    const {name, description} = req.body
    const role = await Role.findByPk(roleId)
    if (!role) {
        res.status(404)
        throw new Error('Role not found!')
    }
    role.name = name
    role.description = description
    const updatedRole = await role.save()
    res.json({message: 'Update role successfully', data: updatedRole})
})

// DELETE
// SINGLE ROLE
const deleteRole = AsyncHandler(async (req, res) => {
    const roleId = req.params.id
    let data = await Role.findByPk(roleId)
    if (data) {
        data = await data.destroy()
        res.json({message: 'Delete Role Successfully', data})
    } else {
        res.status(404)
        throw new Error('Role not found!')
    }
})

export {
    getRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole,
}   