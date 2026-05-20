const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const adminSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, "Username is Required"],
    },
    email: {
        type: String,
        required: [true, "email is Required"],
    },
    password: {
        type: String,
         required: [true, "password is Required"],
         minlength: 6,
         select: false,

    },

},
 {timestamps: true}
);

adminSchema.pre("save", async function(next) {
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

adminSchema.methods.comparePassword = async function (matchedPassword) {
    return await bcrypt.compare(matchedPassword, this.password);
}