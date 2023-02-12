import mongoose from "mongoose";

const colorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'This field is required']
    },
    value: {
        type: String,
        required: [true, 'This field is required']
    }
})

const Color = mongoose.model('Color', colorSchema);

export default Color