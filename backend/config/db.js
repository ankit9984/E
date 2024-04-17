import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if(!process.env.MONGODB){
            console.log('not found path');
        }

        await mongoose.connect(process.env.MONGODB)
        .then(() => console.log('Database connect Successfully'))
        .catch((err) => console.error("MONGODB:", err))
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;