const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: [{ type: String }],
})

userSchema.pre("save", function (next) {
    var hash = bcrypt.hashSync(this.password, 6);
    this.password = hash;
    next()
})
userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model("user", userSchema)
