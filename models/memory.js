import mongoose from "mongoose";

const memorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'This field is required']
    }
})

const Memory = mongoose.model('Memory', memorySchema);

export default Memory