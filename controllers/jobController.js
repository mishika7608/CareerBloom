import Job from '../models/JobModel.js';
import {StatusCodes} from 'http-status-codes'
import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
import day from 'dayjs';

let jobs=[
    {id:nanoid(),company:'apple',position:'front-end'}
];

export const getAllJobs = async(req, res) => {
    // const jobs = await Job.find({company:'apple'})      //Specific company
    console.log(req.user);
    const jobs = await Job.find({createdBy:req.user.userId})
    res.status(StatusCodes.OK).json({ jobs })
}

export const createJob = async(req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });

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
    //const { id } = req.params;
    // const job = await Job.findById(id) //ANOTHER INSTANCE
    const job = await Job.findById(req.params.id)
    res.status(StatusCodes.OK).json({ job });

    // const { id } = req.params;
    // const job = jobs.find((job) => job.id === id);
    //     // throw new Error('no job with that id');  //Handling error in error middleware
    //     res.status(404).json({msg: `no job with ${id}`});
    // res.status(StatusCodes.OK).json({ job });
}

export const updateJob =  async(req, res) => {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id,req.body,{new:true});
    // if (!updatedJob){throw new NotFoundError(`no job with ${id}`); }   //return res.status(404).json({msg: `no job with id  ${id}`})}
    res.status(StatusCodes.OK).json({msg : 'job modified',job: updatedJob})

    // const {company, position } = req.body;
    // if (!company || !position){
    //     return res.status(400).json({msg: 'please provide company and position'});
    // }
    // const { id } = req.params;
    // const job = jobs.find((job) => job.id === id);
    // if (!job){
    //     return res.status(404).json({ msg: `no job with id ${id}`});
    // }
    // job.company = company;
    // job.position = position;
    // res.status(200).json({msg : 'job modified',id})
}

export const deleteJob =  async(req, res) => {
    const { id } = req.params;
    const removedJob = await Job.findByIdAndDelete(id);
    // if (!removedJob){throw new NotFoundError(`no job with ${id}`);}    //return res.status(404).json({msg: `no job with ${id}`})}
    res.status(StatusCodes.OK).json({msg: 'job deleted', job:removedJob });

    // const { id } = req.params;
    // const job = jobs.find((job) => job.id === id);
    // if (!job){
    //     return res.status(404).json({msg: `no job with ${id}`})
    // }
    // const newJobs = jobs.filter((job) => job.id !== id)
    // jobs = newJobs;
    // res.status(200).json({msg: 'job deleted', job:removedJob });
}



export const showStats = async(req,res) => {
    res.send('stats')
}