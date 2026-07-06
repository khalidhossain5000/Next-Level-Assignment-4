import { Request, Response } from "express";

export const notFound=(req:Request,res:Response)=>{
    res.status(404).json({
        message:"Requested Route is not found",
        requestedPath:req.originalUrl,
        method:req.method

    })
}