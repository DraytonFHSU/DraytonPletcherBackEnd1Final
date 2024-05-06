const State = require("../model/States");

// GetStates
const GetAllStates = async (req, res) => {
  const states = await State.find();
  if (!states) {
    return res.status(400).json({ message: "No states found!" });
  }
  res.json(states);
};

// CreateNewstates
const CreateNewState = async (req, res) => {
  if (!req.body.stateCode) {
    return res
      .status(400)
      .json({ message: "Statecode is required" });
  }
  try {
    const result = await State.create({
      StateCode: req.body.StateCode,
      funFacts: req.body.funFacts,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

// UpdateState
const UpdateState = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "State ID is required" });
  }
  const state = await State.findOne({ _id: req.body.id }).exec();
  if (!state) {
    return res
      .status(400)
      .json({ message: `No State matches with the ID ${req.body.id}` });
  }
  if (req.body.firstName) state.firstName = req.body.firstName;
  if (req.body.lastName) state.lastName = req.body.lastName;
  const result = await state.save();
  res.json(result);
};

// DeleteState
const DeleteState = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "State ID is required" });
  }
  const state = await State.findOne({ _id: req.body.id }).exec();
  if (!state) {
    return res
      .status(400)
      .json({ message: `No State matches with the ID ${req.body.id}` });
  }
  const result = await state.deleteOne({ _id: req.body.id });
  res.json(result);
};

// GetState
const GetAllState = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "State ID is required" });
  }
  const state = await State.findOne({ _id: req.params.id }).exec();
  if (!state) {
    return res
      .status(400)
      .json({ message: `No State matches with the ID ${req.params.id}` });
  }
  res.json(state);
};

module.exports = {
  GetAllState,
  CreateNewState,
  UpdateState,
  DeleteState,
  GetAllStates,
};
