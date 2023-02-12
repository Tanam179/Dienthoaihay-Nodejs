import mongoose from "mongoose";

const variantSchema = mongoose.Schema({
    originalPrice: {
        type: Number,
        required: [true, 'This field is required']
    },
    salePrice: {
        type: Number,
        default: 0,
        validate: {
            validator: function(value) {
                if(value) {
                    return this.originalPrice > salePrice
                }
            },
            message: 'The sales price can not be greather than original price'
        }
    },
    description: {
        type: String,
        required: [true, 'This field is required']
    },
    images: {
        type: [String],
        required: [true, 'This field is required']
    },
    properties: [
        {
            key: {
                type: String,
                required: [true, 'This field is required'],
            },
            value: {
                type: String,
                required: [true, 'This field is required'],
            }
        }
    ],
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }
})

const Variant = mongoose.model('Variant', variantSchema);

export default Variant;