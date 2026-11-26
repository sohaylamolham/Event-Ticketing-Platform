const mongoose=require('mongoose')

const FlagSchema = new mongoose.Schema({
reportedBy:{
    type:mongoose.SchemaType.ObjectID,
    ref:"User",
    unique:false,
    required:true,

},
targetID:{
    type:mongoose.Schema.Types.ObjectID,
    ref:"User",
    unique:false,
    required:true,

},eventID:{
    type:mongoose.Schema.Types.ObjectID,
    ref:"Event",
    unique:false,
    required:false,

},reasons:[{
    type:String,
    enum:["overcrowiding","fire Hazard","insuffcient lights"],
    unique:false,
    required:true,

}],
description:{
    type:String,
    unique:false,
    required:true,

},status:{
    type:String,
    enum:["pending","reviewed","resolved"],
    unique:false,
    required:true,
}

,dateIssued:{
    type:Date,
    unique:false,
    required:true,
}

})

module.exports=mongoose.model("flag",FlagSchema)
