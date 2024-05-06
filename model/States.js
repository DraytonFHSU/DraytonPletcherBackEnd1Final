const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StateSchema = new Schema({
  stateCode: {
    type: String,
    required: true,
    unique: true,
  },
  funFacts: {
    type: [String],
  },
}, 
);

// In the collection, the stateCode property will contain state abbreviation values.
// In the collection, the funfacts array will contain “fun facts” about the state


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
