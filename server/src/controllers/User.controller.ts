import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import User from '../models/User.model'
import { catchAsync } from '../utils/catchAsync'

//POST address user
export const newUser= (req:Request,res:Response,next:NextFunction)=>{
  
    const address=req.body.address;
    const users=User.create({address});
   
    res.status(StatusCodes.CREATED).json({
        status: 'success',
        data: {
            users,
        },
    })
}


//GET address user
export const getUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const nft = await User.find({})
        res.json(nft)
    },
)
