import { Router } from 'express'
import {
    getAllJobs ,
    getJob,
    createJob,
    updateJob,
    deleteJob, 
    showStats,} 
    from '../controllers/jobController.js'
import { validateIdParam , validateJobInput } from '../middleware/validationMiddleware.js'

const router = Router()
//APPROACH 1
// router.get('/',getAllJobs)
// router.post('/',createJob)

//APPROACH 2
// chaining the methods as they use same url : base param
router.route('/').get(getAllJobs).post(validateJobInput,createJob)

router.route('/stats').get(showStats);

// for rest of the edit, del... : route param 
router.route('/:id').get(validateIdParam , getJob).patch(validateIdParam , validateJobInput, updateJob).delete(validateIdParam, deleteJob)

export default router;