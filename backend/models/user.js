const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema, sort of like working with an ORM
const UserSchema = new Schema({
    id: {
        type: String,
        required: [true, "id field is required."],
    },
    password: {
        type: String,
        required: [true, "Password field is required."],
    },
    name: {
        type: String,
        required: [true, "Name field is required."],
    },
    age: {
        type: Int16Array,
        required: [true, "Age field is required."],
    },
    sex: {
        type: String,
        required: [true, "Sex field is required."],
    },
    photo: {
        type: String,
        required: [true, "Photo field is required."],
    },

    likedBy: {
        type: [String],
    },
    like: {
        type: [String],
    },
    dislike: {
        type: [String],
    },
    dislikeBy: {
        type: [String],
    },
    messages: {
        type: [Int32Array],
    },
});

// Creating a table within database with the defined schema
const User = mongoose.model("user", UserSchema);

// Exporting table for querying and mutating
module.exports = User;
