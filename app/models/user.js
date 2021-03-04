// var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// schema set up for reviews, allows members to write reviews on volunteer pages
// var reviewSchema =  mongoose.Schema({
//   reviewText: String,
//   createdAt: {type: Date, default: Date.now},
//   updatedAt: {type: Date, default: Date.now}
// });

// var userSchema = mongoose.Schema ({
//   local: {
//     userType: {
//       type: String,
//       required: true,
//     },
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//     dob: {
//       type: Date,
//       required: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//     },
//     city: {
//       type: String,
//       required: true,
//     },
//     state: {
//       type: String,
//       required: true,
//     },
//     joinedOn: {
//       type: Date,
//       default: Date.now,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     uploadImg: {
//       type: String,
//       required: true,
//     },
//     online: {
//       type: Boolean,
//       default: false,
//     },
//     reviews: [reviewSchema],
//   }
// });

// userSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// userSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.local.password);
// };

// module.exports = mongoose.model('User', userSchema);
