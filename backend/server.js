import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

const app = express()
const port = process.env.PORT || 4000;

app.use(express.json())
app.use(cors())

// API routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// Home route
app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    connectDB();
    connectCloudinary();
    console.log(`Server started at http://localhost:${port}`)
})
