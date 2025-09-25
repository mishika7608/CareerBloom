import Job from '../models/JobModel.js';
import {nanoid} from 'nanoid';

let jobs  = [
    { id: nanoid(), company: 'apple', position: 'front-end'},
    { id: nanoid(), company: 'google', position: 'back-end'},
];

export const getAllJobs = async(req, res) => {
    const jobs = await Job.find({company:'apple'})
    res.status(200).json({ jobs })
}

export  const createJob = async(req, res) => {
    const job = await Job.create(req.body);
    res.status(201).json({ job });

    //CATCH ASYNC ERRROR 
    // try{
    //     const job = await Job.create('something');
    //     res.status(201).json({ jobs });
    // }catch(error){
    //     res.status(500).json({msg: `Server errror`})
    // }

    // const {company, position} = req.body
    // const job = await Job.create({company, position})
    // res.status(201).json({ job });

    // if (!company || !position){
    //     res.status(400).json({ msg: 'please provide company and position' });
    //     return ;}
    // const id = nanoid(10);
    // const job = {id, company, position}
    // jobs.push(job)
    // res.status(201).json({ job });
}

export const getJob =  async(req, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job){
        //Handling error in error middleware
        throw new Error('no job with that id');
        return res.status(404).json({msg: `no job with ${id}`});
    }
    res.status(200).json({ job });
}

export const updateJob =  async(req, res) => {
    const {company, position } = req.body;
    if (!company || !position){
        return res.status(400).json({msg: 'please provide company and position'});
    }
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job){
        return res.status(404).json({ msg: `no job with id ${id}`});
    }
    job.company = company;
    job.position = position;
    res.status(200).json({msg : 'job modified',id})
}

export const deleteJob =  async(req, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job){
        return res.status(404).json({msg: `no job with ${id}`})
    }
    const newJobs = jobs.filter((job) => job.id !== id)
    jobs = newJobs;
    res.status(200).json({msg: 'job deleted' });
}



