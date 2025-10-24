const {Schema,model}=require('mongoose');

const ROLES = ['patient','admin', 'doctor', 'nurse'];
const GENDERS = ['male', 'female'];
const STATUS =  ['active', 'suspended', 'inactive'];
const userSchema= new Schema({
     name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ROLES,
    default: 'patient', // most restrictive by default
  },

  phone: {
    type: String,
  },

  address: {
    type: String,
  },

  avatar: {
    type: String,
    default: 'https://imgs.search.brave.com/jHDp_R14w-tbRDiYsyiOCGDeCSPE4WqsVfFwiXVDyow/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzExLzY4LzUwLzU3/LzM2MF9GXzExNjg1/MDU3OTRfSUJDRWlh/ZnNJckhGSjA5ZTY1/UDJ2aDUxMTVDMVhJ/N2UuanBn',
  },

  status: {
    type: String, 
    enum: STATUS,
    default: 'active'
  },

  dateOfBirth: {
    type: Date,
  },


  specialty: {
    type: String,
  },

  resetToken: {
    type: String,
  },

  refreshToken: {
    type: String,
  },
  capacity :{
    type:Number,
  }

}, {timestamps: true });


module.exports=model('User',userSchema)