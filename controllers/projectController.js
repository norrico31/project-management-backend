import { Op } from 'sequelize';
import AsyncHandler  from 'express-async-handler';
import Models from '../models/index.js'

// GET
// ALL PROJECTS
const getProjects = AsyncHandler(async (req, res) => {
    const { search = '' } = req.query;
    const query = {
        ...(search !== '') ? {
            where: {
                [Op.or]:[
                    { name: { [Op.like]: `%${search}%` } },
                    { lead_dev: { [Op.like]: `%${search}%` } }, // TODO: how to search here in arrays of user_id?
                    { devs: { [Op.like]: `%${search}%` } }, // TODO: how to search here in arrays of user_id?
                    { qa: { [Op.like]: `%${search}%` } },
                    { dev_sched: { [Op.like]: `%${search}%` } },
                    { total_working_hrs: { [Op.like]: `%${search}%` } },
                    { actual_working_hrs: { [Op.like]: `%${search}%` } },
                    { agency_review: { [Op.like]: `%${search}%` } },
                    { design_link: { [Op.like]: `%${search}%` } },
                    { client_review: { [Op.like]: `%${search}%` } },
                    { site_launched: { [Op.like]: `%${search}%` } },
                    { cms_doc: { [Op.like]: `%${search}%` } },
                    { stage_wpe_acct: { [Op.like]: `%${search}%` } },
                    { url: { [Op.like]: `%${search}%` } },
                    { stage_git_username: { [Op.like]: `%${search}%` } },
                    { stage_wp_admin_username: { [Op.like]: `%${search}%` } },
                    { stage_basic_auth_username: { [Op.like]: `%${search}%` } },
                    { stage_branch: { [Op.like]: `%${search}%` } },
                    { stage_pipelines: { [Op.like]: `%${search}%` } },
                    { prod_git_username: { [Op.like]: `%${search}%` } },
                    { prod_wp_admin_username: { [Op.like]: `%${search}%` } },
                    { prod_basic_auth_username: { [Op.like]: `%${search}%` } },
                    { prod_branch: { [Op.like]: `%${search}%` } },
                    { prod_pipelines: { [Op.like]: `%${search}%` } },
                    { client_site_name: { [Op.like]: `%${search}%` } },
                    { client_url: { [Op.like]: `%${search}%` } },
                    { client_username: { [Op.like]: `%${search}%` } },
                    { client_site_name2: { [Op.like]: `%${search}%` } },
                    { client_url2: { [Op.like]: `%${search}%` } },
                    { client_username2: { [Op.like]: `%${search}%` } },
                ]
            }
        } : {}
    }
    const data = await Models.Project.findAll(query)
    return res.json({ message: 'Success', data })
})

// GET
// SINGLE PROJECT
const getProject = AsyncHandler(async (req, res) => {
    const projectId = req.params.id
    const data = await Models.Project.findByPk(projectId)
    if (!data) {
        res.status(404)
        throw new Error('Project not found!')
    }
    return res.json({message: 'Success', data})
})

// POST
// CREATE SINGLE PROJECT
const createProject = AsyncHandler(async (req, res) => {
    const {
        name,
        lead_dev,
        devs,
        qa,
        dev_sched,
        total_working_hrs,
        actual_working_hrs,
        agency_review,
        design_link,
        client_review,
        site_launched,
        cms_doc,
        stage_wpe_acct,
        url,
        stage_git_username,
        stage_git_password,
        stage_wp_admin_username,
        stage_wp_admin_password,
        stage_basic_auth_username,
        stage_basic_auth_password,
        stage_branch,
        stage_pipelines,
        prod_git_username,
        prod_git_password,
        prod_wp_admin_username,
        prod_wp_admin_password,
        prod_basic_auth_username,
        prod_basic_auth_password,
        prod_branch,
        prod_pipelines,
        client_site_name,
        client_url,
        client_username,
        client_password,
        client_site_name2,
        client_url2,
        client_username2,
        client_password2
    } = req.body
     if (!name) {
        res.status(400)
        throw new Error('Please enter project name!')
    }
    const data = await Models.Project.create({
        name,
        lead_dev,
        devs,
        qa,
        dev_sched,
        total_working_hrs,
        actual_working_hrs,
        agency_review,
        design_link,
        client_review,
        site_launched,
        cms_doc,
        stage_wpe_acct,
        url,
        stage_git_username,
        stage_git_password,
        stage_wp_admin_username,
        stage_wp_admin_password,
        stage_basic_auth_username,
        stage_basic_auth_password,
        stage_branch,
        stage_pipelines,
        prod_git_username,
        prod_git_password,
        prod_wp_admin_username,
        prod_wp_admin_password,
        prod_basic_auth_username,
        prod_basic_auth_password,
        prod_branch,
        prod_pipelines,
        client_site_name,
        client_url,
        client_username,
        client_password,
        client_site_name2,
        client_url2,
        client_username2,
        client_password2
    })
    return res.json({message: 'Create Project Successfully!', data})
})

// PUT
// UPDATE SINGLE PROJECT
const updateProject = AsyncHandler(async (req, res) => {
    const projectId = req.params.id;
    if (!projectId) {
        res.status(400)
        throw new Error('Please enter project ID!')
    }
    const {
        name,
        lead_dev,
        devs,
        qa,
        dev_sched,
        total_working_hrs,
        actual_working_hrs,
        agency_review,
        design_link,
        client_review,
        site_launched,
        cms_doc,
        stage_wpe_acct,
        url,
        stage_git_username,
        stage_git_password,
        stage_wp_admin_username,
        stage_wp_admin_password,
        stage_basic_auth_username,
        stage_basic_auth_password,
        stage_branch,
        stage_pipelines,
        prod_git_username,
        prod_git_password,
        prod_wp_admin_username,
        prod_wp_admin_password,
        prod_basic_auth_username,
        prod_basic_auth_password,
        prod_branch,
        prod_pipelines,
        client_site_name,
        client_url,
        client_username,
        client_password,
        client_site_name2,
        client_url2,
        client_username2,
        client_password2
    } = req.body
    let data = await await Models.Project.findByPk(projectId)
    if (!data) {
        res.status(400)
        throw new Error('Project doest not exist!')
    }
    data.name = name
    data.lead_dev = lead_dev
    data.devs = devs
    data.qa = qa
    data.dev_sched = dev_sched
    data.total_working_hrs = total_working_hrs
    data.actual_working_hrs = actual_working_hrs
    data.agency_review = agency_review
    data.design_link = design_link
    data.client_review = client_review
    data.site_launched = site_launched
    data.cms_doc = cms_doc
    data.stage_wpe_acct = stage_wpe_acct
    data.url = url
    data.stage_git_username = stage_git_username
    data.stage_git_password = stage_git_password
    data.stage_wp_admin_username = stage_wp_admin_username
    data.stage_wp_admin_password = stage_wp_admin_password
    data.stage_basic_auth_username = stage_basic_auth_username
    data.stage_basic_auth_password = stage_basic_auth_password
    data.stage_branch = stage_branch
    data.stage_pipelines = stage_pipelines
    data.prod_git_username = prod_git_username
    data.prod_git_password = prod_git_password
    data.prod_wp_admin_username = prod_wp_admin_username
    data.prod_wp_admin_password = prod_wp_admin_password
    data.prod_basic_auth_username = prod_basic_auth_username
    data.prod_basic_auth_password = prod_basic_auth_password
    data.prod_branch = prod_branch
    data.prod_pipelines = prod_pipelines
    data.client_site_name = client_site_name
    data.client_url = client_url
    data.client_username = client_username
    data.client_password = client_password
    data.client_site_name2 = client_site_name2
    data.client_url2 = client_url2
    data.client_username2 = client_username2
    data.client_password2 = client_password2
    data = await data.save()

    return res.json({ message: 'Update Project Successfully!', data })
})

// DELETE
// SINGLE PROJECT
const deleteProject = AsyncHandler(async (req, res) => {
    const projectId = req.params.id
    let data = await Models.Project.findByPk(projectId)
    if (!data) {
        res.status(404)
        throw new Error('Project not found!')
    }
    data = await data.destroy()
    return res.json({ message: 'Delete Project Successfully!', data })
})


export {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
}