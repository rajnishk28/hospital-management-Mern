const express =require("express");
const app =express();
const cors =require("cors")
const userRoutes =require("./routes/user.routes")
const adminRoutes =require("./routes/admin.routes")
const patientRoutes =require("./routes/patient.routes")





app.use(cors());
app.use(express.json());
app.use("/patient",patientRoutes)
app.use("/user",userRoutes)
app.use("/admin",adminRoutes)



app.get("/",(req,res)=>{
    res.send("server is up and running")
})



module.exports =app;