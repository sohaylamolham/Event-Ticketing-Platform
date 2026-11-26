const mongoose=require("mongoose")

const eventSchema=  new mongoose.Schema({


title:{
    type:String,
    unique:false,
    required:true,

},
organizerID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    unique:false,
    required:true,

},description:{
    type:String,
    unique:false,
    required:true,

},date:{
    type:Date,
    unique:false,
    required:true,

},

eventType:{
    type:String,
    enum:["online","onsite"],
    unique:false,
    required:true,

}

,
place:{
    type:String,
    unique:false,
    required:true,

},image:{
    type:String,
    unique:false,
    required:true,
},status:{
    type:String,
    enum:["upcoming","cancelled","completed"],
    unique:false,
    required:true,
},

ticketTypes: [
    {
        name: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0 //عشان يعني ما تبقاش سالبة
        },

        totalQuantity: {
            type: Number,
            required: true,
            min: 0
        }
        ,
        availableQuantity: {
            type: Number,
            required: true,
            min: 0
        }
    }
]



})

module.exports=mongoose.model("event",eventSchema)
