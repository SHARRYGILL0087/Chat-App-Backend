import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    roomId: {
        // type: mongoose.Schema.Types.ObjectId,
        type : String,
        ref: 'User',
        required: true
    },
    senderId: {
        // type: mongoose.Schema.Types.ObjectId,
        type : String,
        ref: 'User',
        required: true
    },
    receiverId: {
        // type: mongoose.Schema.Types.ObjectId,
        type : String,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestrap: {
        type: Date,
        default: Date.now()
    },
    mediaUrl: { type: String },
    mediaType: { type: String },
    status: {
        type: String,
        enum: ["sent", "delivered", "seen"],
        default: "sent"
    }
})

const msg = mongoose.model('messages' , messageSchema)
export default msg