import  * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import { nanoid } from 'nanoid';

let jobs = [
    {id: nanoid(), company: 'apple', position:'front-end'},
    {id: nanoid(), company: 'google', position:'back-end'},
];

//Async await
try{
    const response = await fetch('http://www.course-api.com/react-useReducer-cart-project');
    const cartData = await response.json();
    console.log(cartData);
} catch(error){
    console.log(error)
}

// // fetching fromthe API and promise
// fetch('http://www.course-api.com/react-useReducer-cart-project')
// .then( res => res.json())
// .then(data => console.log(data));

// Wrap the middleware in the condition
if (process.env.NODE_ENV === 'development'){
    // store in a string option used - dev
    app.use(morgan('dev'));
}



app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.post('/',(req, res)=>{
    console.log(req);
    res.json({message: 'data recieved', data: req.body });
})

// GET ALL JOBS

// starting poin for all the request
app.get('/api/v1/jobs', (req,res) => {
    // indicates evrything went smoothly
    res.status(200).json({ jobs })
})

//  CREATE JOB
app.post('/api/v1/jobs', (req,res) => {
    const {company, position} = req.body
    if (!company || !position){
        return res.status(400).json({ msg: 'please provide company and position' });
    }
    const id = nanoid(10);
    const job = {id, company, position}
    jobs.push(job)
    res.status(200).json({ job })
})

// port that would be given later by platform || hardcoded port
const port = process.env.PORT || 5100
app.listen(port , () => {
    console.log('server running on PORT ${port}...');
})