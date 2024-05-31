import Models from '../../models/index.js'
const { ProjectType } = Models;

// GET
// ALL PROJECT TYPES
async function getProjectTypes(req, res) {
    try {
        const projectTypes = await ProjectType.findAll()
        return res.json({message: 'Success', data: projectTypes})
    } catch (error) {
        return error
    }
}

// GET
// SINGLE PROJECT TYPE
async function getProjectType(req, res) {
    try {
        const projectTypeId = req.body.id
        const projectType = await ProjectType.findByPk(projectTypeId)
        if (!projectType) return res.json({message: 'Project type not found!', })
        return res.json({message: 'Success', data: projectType})
    } catch (error) {
        return error
    }
}

// POST
// CREATE SINGLE PROJECT TYPE
async function createProjectType(req, res) {
    const {name, description} = req.body
    try {
        const createdProjectType = ProjectType.create({name, description})
        return res.json({message: 'Created project type successfully', data: createdProjectType})
    } catch (error) {
        // handle validation for name
        return error
    }
}

// PUT
// UPDATE SINGLE PROJECT TYPE
async function updateProjectType(req, res) {
    const projectTypeId = req.params.id
    const {name, description} = req.body
    try {
        const projectType = await ProjectType.findByPk(projectTypeId)
        if (!projectType) return res.json({message: 'Project type not found!'})
        projectType.name = name
        projectType.description = description
        const updateProjectType = await projectType.save()
        return res.json({message: 'Update project type successfully', data: updateProjectType})
    } catch (error) {
        // handle validation for name
        return error
    }
}

// DELETE
// SINGLE PROJECT TYPE
async function deleteProjectType(req, res) {
    try {
        const projectTypeId = req.params.id
        const deletedProjectType = await ProjectType.destroy({where: {id: projectTypeId}},)
        return res.json({message: 'Delete project type successfully', data: deletedProjectType})
    } catch (error) {
        return error
    }
}

export {
    getProjectTypes,
    getProjectType,
    createProjectType,
    updateProjectType,
    deleteProjectType,
}   