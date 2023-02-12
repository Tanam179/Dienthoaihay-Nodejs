import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your full name'],
        minLength: [8, 'Your full name must at least 8 characters'],
        maxLength: [50, 'Your full name must not be greather than 50 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        trim: true,
        unique: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [8, 'Your password must at least 8 characters'],
        trim: true,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please enter your password confirm'],
        minLength: [8, 'Your password must at least 8 characters'],
        trim: true,
        validate: {
            validator: function(value) {
                return value === this.password;
            },
            message: 'The password confirm is incorrect'
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    avatar: {
        type: String,
        default: 'default.jpg'
    }
})

const User = mongoose.model('User', userSchema);

export default User;