import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const MessageSchema = new Schema({
    Id: {
        type: Number,
        required: [true, "Id field is required."],
    },
    body: {
        type: String,
        required: [true, "Body field is required."],
    },
    toId: {
        type: String,
        required: [true, "toId field is required."],
    },
    fromId:{
        type:String,
        required:[true, "fromId field is required."]
    },
});


//from to id content
// Creating a table within database with the defined schema
const Message = mongoose.model('message', MessageSchema);

// Exporting table for querying and mutating
export default Message;
