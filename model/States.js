const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  stateCode: {
    type: String,
    required: true,
    unique: true,
  },
  funFacts: {//array?
    type: String,
  },
});


//   email: {
//     type: String,
//   },
//   roles: {
//     User: {
//       type: Number,
//       default: 2001,
//     },
//     Editor: Number,
//     Admin: Number,
//   },

// module.exports = mongoose.model("User", UserSchema);


// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const employeeSchema = new Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model("Employee", employeeSchema);
