const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const UserSchema = new Schema({
   username:{
      type: String,
      required: "Please input name",
      unique:true,
   },
   email:{
      type: String,
      require: "Please input username",
      unique: true,
      validate:{
        validator: function(value){
           let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
           return re.test(value);
        }
      },
      unique:true,
   },
   password:{
      type: String, 
      require: "Please input password",
      validate:{
         validator: function(value){
               let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
               return regex.test(value);
         },
         message: "Password needs to include at least: /n - 1 number /n - length of 6"
      }
   },
   city:{
      type: String,
      require:"Please input city"
   },
   lat:{
      type: String,
      require: true
   },
   long:{
      type: String,
      require: true
   }
}, {timestamps: true});

UserSchema.pre("save", function(next){
    let user = this;

    if(!user.isModified('password')){
        return next();
    }

    bcrypt.genSalt(saltRounds, function(err, salt ){
        if(err) return err;

        bcrypt.hash(user.password, salt ,function(err, hash){
            if(err) {
                return next(err);
            }

            user.password = hash;
            next();
        })
    })

})

UserSchema.methods.comparePassword = function (input, cb){
    bcrypt.compare(input, this.password,  function(err, isMatch){
        if(err) return cb(err)

        cb(null, isMatch);
    })
}

const User = mongoose.model("User", UserSchema);
module.exports = User;