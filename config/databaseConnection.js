import mongoose from 'mongoose';

export const connectToDatabase = () => {
    mongoose.connect(process.env.CONNECTION_STRING, 
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
    ).then(() => {
        console.log("Database connected succesfully")
    }).catch((error) => {
        console.log("Unable to connect to DB" + error.message)
    })
}