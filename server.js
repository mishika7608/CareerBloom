    import 'express-async-errors';
    import dotenv from 'dotenv';
    dotenv.config();
    import express from 'express';
    const app = express();
    import mongoose from 'mongoose';
    import jobRouter from './router/jobRouter.js';      // routers
    import authRouter from './router/authRouter.js';
    import userRouter from './router/userRouter.js'
    import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';    //middleware
    import morgan from 'morgan';
    import {authenticateUser} from './middleware/authMiddleware.js';
    import cookieParser from 'cookie-parser';


    // Wrap the middleware in the condition
    if (process.env.NODE_ENV === 'development'){
        // store in a string option used - dev
        app.use(morgan('dev'));
    }

    app.use(express.json());
    app.use(cookieParser());
    app.get('/',(req,res)=>{
        res.send('Hello World');
    });

    app.get('/api/v1/test', (req, res) => res.send('Hello World'));


    console.log("Mounting job routes...");
    app.use('/api/v1/jobs', authenticateUser, jobRouter);  
    console.log("Job routes mounted!");
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);


    // GET SINGLE JOB
    // :id = route parameter
    app.get('/api/v1/jobs/:id');

    //EDIT JOB
    app.patch('/api/v1/jobs/:id');

    // DELETE JOB
    app.delete('/api/v1/jobs/:id');

    //  CREATE JOB
    app.post('/api/v1/jobs');

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
    startServer();
