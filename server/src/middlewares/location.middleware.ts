import Location from '../models/NFT.model'
import { Request, Response, NextFunction } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { AppError } from '../utils/appError'
import { StatusCodes } from 'http-status-codes'
const mongoose = require('mongoose')
export const checkLocationIsExist = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const location = await Location.findOne({ name: req.body.name })
        if (location) {
            return next(
                new AppError(
                    StatusCodes.FORBIDDEN,
                    "this location's name already existed",
                ),
            )
        }

        next()
    },
)

export const checkUpdatingLocation = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.body.id
        const locations = await Location.find({
            _id: { $nin: [new mongoose.Types.ObjectId(id)] },
        })
        const isExistingLocation = locations.filter((loc) => {
            console.log(loc.name, req.body.name)
            return loc.name === req.body.name
        })

        if (isExistingLocation.length > 0) {
            return next(
                new AppError(
                    StatusCodes.FORBIDDEN,
                    "this location's name already existed",
                ),
            )
        }

        next()
    },
)
