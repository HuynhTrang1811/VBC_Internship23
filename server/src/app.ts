import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import nftRoute from './routes/nft.route'

import morgan from 'morgan'

const app: Express = express()

app.enable('trust proxy')
app.use(cors({ credentials: true, origin: 'http://localhost:3001' }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(helmet())
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
})
app.use('/api', limiter)
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(mongoSanitize())
app.use(compression())

app.use(morgan('tiny'))
app.use('/api/route', nftRoute)

app.get('*', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
})

export default app
