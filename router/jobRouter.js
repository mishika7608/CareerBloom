import { Router } from 'express'


import {
    getAllJobs ,
    getJob,
    createJob,
    updateJob,
    deleteJob, } 
    from '../controllers/jobController.js'

const router = Router()
//APPROACH 1
// router.get('/',getAllJobs)
// router.post('/',createJob)

//APPROACH 2
// chaining the methods as they use same url : base param
router.route('/').get(getAllJobs).post(createJob)
// for rest of the edit, del... : route param 
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

export default router;