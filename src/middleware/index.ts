import { Request, Response, NextFunction } from "express";
import {validationResult} from 'express-validator'
const errorStatus:number = 400
export const handleInputErrors = (req : Request, res: Response, next : NextFunction) => {
 let errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(errorStatus).json({ errors: errors.array()});
    return; 
    } 
next()
}