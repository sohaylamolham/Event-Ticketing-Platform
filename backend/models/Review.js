const mongoose=require('mongoose')

const reviewSchema = new mongoose.Schema({
eventID:{
    type:mongoose.Schema.Types.ObjectID,
    ref:"Event",
    unique:false,
    required:true,

},
attendeeID:{
    type:mongoose.Schema.Types.ObjectID,
    ref:"User",
    unique:false,
    required:true,

},stars:{
    type:Number,
    enum:[1,2,3,4,5],
    unique:false,
    required:true,

},content:{
    type:[String],
    unique:false,
    required:false,

},
reviewDate:{
    type:Date,
    default:Date.now,
    unique:false,
    required:true,
}

})

module.exports=mongoose.model("review",reviewSchema)
