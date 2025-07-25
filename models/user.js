import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        default : 'https://images.squarespace-cdn.com/content/v1/6242742320e8a26d18e9a6cf/1711078817762-AD3DMAC1RKPNQOYCXE17/CS-Team2-Avatar.png'
    },
    about : {
        type : String,
        default : "Busy!"
    }
},{
    timestamps : true
})

const User = mongoose.model('Users',userSchema)
export default User