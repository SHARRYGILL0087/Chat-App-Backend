import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import setUpSocket from './socket/socket.js'
dotenv.config()



const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}))

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

setUpSocket(io)



//routers 
import userRoute from './routes/userRoute.js'
import messageRoute from './routes/messageRoute.js'
import contactRoute from './routes/contactRoute.js'

app.get('/',(req,res)=>{
    res.send('App is Running!')
})



app.use('/user', userRoute)
app.use('/message', messageRoute)
app.use('/contact' ,contactRoute )



server.listen(port, () => {
    console.log(`App is listning at ${port}`)
})