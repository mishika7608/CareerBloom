import Job from '../models/JobModel.js';  //imports jobs collection mongoDB
import {StatusCodes} from 'http-status-codes'
import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
import day from 'dayjs';

let jobs=[
    {id:nanoid(),company:'apple',position:'front-end'}
];

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query; //destructures the query recieved into these parameters

  const queryObject = {
    createdBy: req.user.userId,
  }; //a filter that shows jobs created by logged in user

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }

  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  } //filtering on job status and type and no filter if its all

  const sortOptions = {
    newest: '-createdAt', //descending(new first)
    oldest: 'createdAt', //ascending(old first)
    'a-z': 'position',
    'z-a': '-position',
  }; //defines sorting rules

  const sortKey = sortOptions[sort] || sortOptions.newest; //filtering acc to user or default->newest

  // setup pagination

  const page = Number(req.query.page) || 1; //current page no. 
  const limit = Number(req.query.limit) || 10; //no of res per page
  const skip = (page - 1) * limit;

  //MongoDB query filters acc to us
  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
}; //sends jobs and pagination as JSON response


// export const getAllJobs = async(req, res) => {
//     // const jobs = await Job.find({company:'apple'})      //Specific company
//     console.log(req.query);
//     const jobs = await Job.find({createdBy:req.user.userId,
//         position:req.query.search,
//     })
//     res.status(StatusCodes.OK).json({ jobs })
// }

export const createJob = async(req, res) => {
    req.body.createdBy = req.user.userId; //attaches id to new job
    const job = await Job.create(req.body); //creates new job document in mongoDB
    res.status(StatusCodes.CREATED).json({ job }); //201 status return for creation

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

    let stats = await Job.aggregate([ //count jobs for each status
        {$match:{createdBy:new mongoose.Types.ObjectId(req.user.userId)}}, //filter jobs created by logged in user
        {$group:{_id:'$jobStatus',count: {$sum:1}}}, //groups and count them
    ]) 

    stats = stats.reduce((acc,curr) => {
        const {_id:title,count}=curr;
        acc[title] = count;
        return acc;
    },{});
    //[ { _id: 'pending', count: 3 }, { _id: 'interview', count: 2 } ]
    //{ pending: 3, interview: 2 }


    const defaultStats = {
        pending:stats.pending || 0,
        interview:stats.interview || 0,
        declined:stats.declined || 0,
    }
    //Groups jobs by month and year of creation.Counts how many jobs were created each month. Sorts by most recent months first.Limits to the last 6 months.
    let monthlyApplications = await Job.aggregate([
        {$match:{createdBy:new mongoose.Types.ObjectId(req.user.userId)}},
        {$group:{
            _id:{year:{$year:'$createdAt'},month:{$month:
        '$createdAt' }},
        count:{$sum: 1}
        },
    },
    {$sort:{'_id.year':-1,'_id.month':-1}},
    {$limit:6},
    ]) 

    monthlyApplications = monthlyApplications.map((item) => {
        const {_id:{year,month},count,} = item;
        const date = day().month(month -1).year(year).format('MMM YY');

        return {date,count}
    })
    .reverse();

    const  mockData = [{
        date:'May 23',
        count: 12,
    },{
        date:'June 23',
        count: 9,
    },{
        date:'June 23',
        count: 2,
    }
    ]
    res.status(StatusCodes.OK).json({defaultStats, monthlyApplications: mockData});
}