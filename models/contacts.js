import mongoose from "mongoose";

const contactsSchema = new mongoose.Schema({
    userId: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'User',
        required: true
    },
    contacts: [
        {
            contactId: {
                // type: mongoose.Schema.Types.ObjectId,
                type: String,
                ref: 'User',
                required: true
            },
            username: {
                type: String,
                required: true
            },
            avatar: {
                type: String,
                default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnRyysCQ5SY12Q8HXmy_Pm0KAGhJ-06qpaA&s'
            }
        }
    ]
})

const contacts = mongoose.model('contacts', contactsSchema)
export default contacts