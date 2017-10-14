/**
 * Created by Pranshu Panwar on 14-10-2017.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username : {type : String , required : true , unique:true},
    password : {type: String  , required : true  },
    created_at:Date

})
userSchema.pre('save',function(next){
  //  console.log('saved');
    var user = this;
    if(this.created_at)this.created=new Date();
    bcyrpt.genSalt(10,function(err,salt){
        bcyrpt.hash(user.password,salt,function(e,hash){
            user.password = hash;

            next();
        })
    })


})
userSchema.method.compare = function(pw){
    return bcrypt.compareSync(pw,this.password)
}

module.exports = mongoose.model('User',userSchema);