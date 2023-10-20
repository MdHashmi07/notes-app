import dotenv from 'dotenv';
import { connectToDb } from './config/DBConnection.js';
import { app } from './app.js';

dotenv.config();
connectToDb();

const port = process.env.PORT || 3500;

app.listen(port, (error) => {
    if(!error){
        console.log(`Server listen on port: ${port}`);
    }else {
        console.log("Error occured, server cannot be start", error);
    }    
});

