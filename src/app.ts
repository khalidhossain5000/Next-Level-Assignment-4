import express, { Application, Request, Response } from "express"

const app:Application=express()
//default get
app.get("/",(req:Request,res:Response)=>{
    res.send("Next level assignment 4 and Rent nest server is running")
})
export default app