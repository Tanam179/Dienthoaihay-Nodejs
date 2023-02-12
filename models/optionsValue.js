import mongoose from "mongoose";

const optionValueSchema = mongoose.Schema({
    colorId: {
        value: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Color'
        },
        image: {
            type: String,
            required: [true, 'This field is required']
        }
    },
    memoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Memory'
    },
    quantity: {
        type: Number,
        required: [true, 'This field is required']
    },
    extraPrice: {
        type: Number,
        default: 0
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
})

const OptionValue = mongoose.model('OptionValue', optionValueSchema);

export default OptionValue;