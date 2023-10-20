import mongoose from "mongoose";

export const connectToDb = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_URL, connectionParams);
        console.log("Database connected succesfully!!", connect.connection.host, connect.connection.name);
    } catch(error) {
        console.log("Database connection error!!");
        console.log(error);
        process.exit(1);
    }
}

