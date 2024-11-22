const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// UserSchma and Secured password With bcryptjs
const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique : true,
        lowarcase: true
    },
    password : {
        type:String,
        require:true,
        minlength: 8,
        unique:true
    },
    role:{
      type:String, 
      enum: ['Admin', 'Manger' , "Developer", "Intren", "Tester"],
      default:'Developer',
      required:true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'suspended'], 
        default: 'Inactive', 
      },
});

 userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password , salt);
        next()
    } catch (error) {
        next(error)
    }
 });

 userSchema.method.comparePassword = async function(condidatePassword){
    console.log(condidatePassword)
    return bcrypt.compare(condidatePassword , this.password)
 }

 module.exports = mongoose.model('User ', userSchema);