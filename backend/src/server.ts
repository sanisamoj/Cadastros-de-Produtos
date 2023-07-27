import express, { Request, Response } from 'express'
import 'express-async-errors'
import { router } from './routes'
import cors from 'cors'
import { rateLimiterMiddleware } from './middlewares/RateLimiter'
import path from 'path'


const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

// app.use(express.static('src/build'));
app.use(express.static(path.join(__dirname, '../../../frontend/build')))

// app.get('/', rateLimiterMiddleware, function(req : Request, res : Response) {
//     res.sendFile(__dirname + '/build/index.html')
// })

app.get('/', rateLimiterMiddleware, function(req : Request, res : Response) {
    res.sendFile(path.join(__dirname, '../../../frontend/build/index.html'))
    console.log(__dirname, '../../../frontend/build/index.html')
})

app.listen(7070, () => {
    console.log('Servidor online!')
})