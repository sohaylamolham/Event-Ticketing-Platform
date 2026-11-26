const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
name:{
    type:String,
    unique:false,
    required:true,

},
age:{
    type:Number,
    unique:false,
    required:true,

},email:{
    type:String,
    unique:true,
    required:true,

},phoneNo:{
    type:String,
    unique:true,
    required:true,

},
role:{
    type:String,
    enum:["Organizer","Attendee"],
    unique:false,
    required:true,

},RegisterationDate:{
    type:Date,
    default:now,
    unique:false,
    required:true,
}

})

module.exports=mongoose.model("user",userSchema)
