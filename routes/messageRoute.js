import express from 'express'
import messageController from '../controllers/messageController.js'

const router = express.Router()

router.post('/get' , messageController.getmessage)
router.post('/sendmessage', messageController.sendmessage)

export default router