import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import jobRouter from './router/jobRouter.js';      // routers
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';    //middleware
import morgan from 'morgan';


// let jobs = [
//     {id: nanoid(), company: 'apple', position:'front-end'},
//     {id: nanoid(), company: 'google', position:'back-end'},
// ];

//Async await
// try{
//     const response = await fetch('http://www.course-api.com/react-useReducer-cart-project');
//     const cartData = await response.json();
//     console.log(cartData);
// } catch(error){
//     console.log(error)
// }

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



// GET ALL JOBS

// starting poin for all the request
app.get('/api/v1/jobs'); // , (req,res) => {
    // indicates evrything went smoothly
    // res.status(200).json({ jobs })
// })

// GET SINGLE JOB
// :id = route parameter
app.get('/api/v1/jobs/:id');

//EDIT JOB
app.patch('/api/v1/jobs/:id');

// DELETE JOB
app.delete('/api/v1/jobs/:id');

//  CREATE JOB
app.post('/api/v1/jobs');

app.use('/api/v1/jobs' , jobRouter);

app.use(errorHandlerMiddleware)

// port that would be given later by platform || hardcoded port
const port = process.env.PORT || 5100;

// Connect to MongoDB
const startServer = async() => {
    try{
        await mongoose.connect("mongodb+srv://mernproj:MeRnproj@cluster0.sullff1.mongodb.net/CareerBloom?retryWrites=true&w=majority&appName=Cluster0")
        
        //await mongoose.connect(process.env.MONGO_URL);
        app.listen(port , () => {
            console.log(`server running on PORT ${port}`);
        });
    } catch(error){
        console.log(error);
        process.exit(1);
    }
}
startServer(








    
);
// EXPRESS does this
// app.use('*', (req, res) => {
//     res.status(404).json({msg: `not found`})
// });



// app.listen(port , () => {
//     console.log('server running on PORT ${port}...');
// })

