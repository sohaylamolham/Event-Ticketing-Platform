const mongoose=require('mongoose')

const bookingSchema = new mongoose.Schema({
attendeeID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    unique:false,
    required:true,

},
eventId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"Event",
    unique:false,
    required:true,

},bookingDate:{
    type:date,
    unique:false,
    required:true,

},totalAmount:{
    type:Number,
    unique:false,
    required:true,

},
status:{
    type:String,
    enum:["confirmed","cancelled","Refunded"],
    unique:false,
    required:true,

},ticketType:{
    type:String,
    enum:["regular","fanzone","VIP"],
    unique:false,
    required:true,
}

})
//كل بني ادم يحجز مرة واحد البتاع
bookingSchema.index(
    { attendeeID: 1, eventId: 1 },
    { unique: true }
);

module.exports=mongoose.model("booking",bookingSchema)
