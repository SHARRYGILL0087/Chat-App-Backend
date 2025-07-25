import msg from "../models/message.js"
import connectDB from "../db/dbConnection.js"


const messageController = {
  getmessage: async (req, res) => {
    try {
      const {roomId}  = req.body
      await connectDB()
      const messages = await msg.find({roomId})
      if(!messages) return res.status(202).json({msg : 'No messages Found'})
      console.log(messages)
      res.status(200).json({msg : 'Message Obtained' , messages} )
    } catch (error) {
      res.status(400).json({msg : 'Error while getting Messages' , err : error.message})
    }
  },
  sendmessage: async (req, res) => {
    // console.log(req.body)
    const { message, senderId, roomId, receiverId, mediaUrl, mediaType } = req.body
    try {
      await connectDB()
      const newmsg = new msg({ message, senderId, receiverId, roomId, mediaUrl, mediaType })
      await newmsg.save()
      // console.log('messageSave')
      return res.status(200).json({msg : 'Message Saved' , newmsg})
    } catch (error) {
        return res.status(500).json({msg: 'Error while saving message' , err : error.message})
        console.log('Error while Message' , error.message)
    }
  }
}

export default messageController
