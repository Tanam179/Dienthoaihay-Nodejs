import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'This field is required'],
        trim: true,
        unique: true,
    },
    cateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'This field is required'],
    }
}, { toJSON: {virtuals: true},  toObject: {virtuals: true}})

productSchema.virtual('variant', {
    ref: 'Variant',
    foreignField: 'productId',
    localField: '_id',
})


const Product = mongoose.model('Product', productSchema);

export default Product