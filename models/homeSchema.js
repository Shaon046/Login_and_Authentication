const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const Schema=mongoose.Schema

const userSchema=new Schema({
   name:{ type:String,
    required:true
},

email:{
    type:String,
     unique:true,
    required:true
},
password:{
    type:String,
    required:true}

})

userSchema.pre('save', async function(next){
    if(this.isModified('password')){       /////hash password only when new registration
        this.password= await bcrypt.hash(this.password,10)
        next();
    }
})



module.exports=mongoose.model("Registeruser",userSchema)