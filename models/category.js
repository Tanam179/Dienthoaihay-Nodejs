import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true
    },
    parentId: {
        type: String,
        default: '0'
    }
})

const Category = mongoose.model('Category', categorySchema);

export default Category;