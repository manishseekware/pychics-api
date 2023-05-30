const mongoose = require('mongoose');
const validater = require('validate');
const bcrypt = require('bcryptjs');   
const plugin = require('plugin');



const userSchema = mongoose.Schema({
    
    first_name: {
        type: String, 
        trim : true, 
        required: true
    }, 
    last_name: {
        type: String, 
        trim : true, 
        required: true
    }, 
    image: {
        type: String,
        trim: true,
        required: false,
        default: "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg"
    },
    backgroundImge: {
        type: String, 
        trim: true,
        required: false,
        default: "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg"
    },
    email: {
        type: String, 
        trim : true, 
        required: true,
        unique: true,
        validater: [validater.isEmail, 'Please enter a valid email address']
    }, 
    password: {
        type: String, 
        trim : true, 
        required: true,
        maxlength: 8, 
        minlength: 8 
    }, 
    role: {
        type: String, 
        trim : true, 
        required: true,
        enum: ['client', 'professtional']
    }, 
    gender: {
        type: String, 
        trim : true, 
        required: true,
        enum: ['male', 'female', 'Male', 'Female']
    },
    address: {
        type: String, 
        trim : true, 
        required: false
    }, 
    city: {
        type: String, 
        trim : true, 
        required: false
    }, 
    state: {
        type: String, 
        trim : true, 
        required: false
    },
    pincode: {
        type: Number, 
        trim : true, 
        required: false
    }, 
    mobile: {
        type: Number, 
        trim : true, 
        required: false
    }, 
    dob: {
        type: Date, 
        trim : true, 
        required: true
    },
    country_code: {
        type: String, 
        trim : true, 
        required: false
    },
    issues: {
        type: String, 
        trim : true, 
        required: false
    }, 
    other_issues: {
        type: String, 
        trim : true, 
        required: false
    },
    refSite: {
        type: String, 
        trim : true, 
        required: false
    },
    timezone: {
        type: String, 
        trim : true, 
        required: false
    },
    find_us: {
        type: String, 
        trim : true, 
        required: false
    }, 
    isEmailVerified: {
        type: Boolean, 
        required: false,
        default: false
    },
    topics: {
        type: Array, 
        trim : true, 
        required: false
    }, 
    specialities : {
        type: Array, 
        trim : true, 
        required: false
    }, 
    skills: {
        type: Array, 
        trim : true, 
        required: false
    }, 
    is_email_allow: {
        type: Boolean, 
        required: false,
        default: true
    }, 
    actual_rate: {
        type: Number, 
        trim : true, 
        required: false
    }, 
    style: {
        type: String, 
        trim : true, 
        required: false
    },
    status: {
        type: String, 
        trim : true, 
        default: "active",
        required: false
    },
    review : {
        type: Number, 
        default: 0,
        required: false
    },
    bio: {
        type: String
    },
    tool: {
        type: Array
    },
    abilities: {
        type: Array,  
        required: false
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next) {
        if (!this.isModified('password')) {
            return next();
        }
        // Hash the password with the generated salt
        const hashedPassword = await bcrypt.hash(this.password, 8);
        // Replace the original password with the hashed password
        this.password = hashedPassword;

        next();
    })




module.exports = mongoose.model('users', userSchema);



