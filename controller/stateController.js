const State = require("../model/States");

// GetStates
const GetAllStates = async (req, res) => {
  const states = await State.find(); //somethin here?
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
  if (!req.body.stateCode) {
    return res.status(400).json({ message: "State Code is required" });
  }
  const state = await State.findOne({ _stateCode: req.body.stateCode }).exec();
  if (!state) {
    return res
      .status(400)
      .json({ message: `No State matches with the stateCode ${req.body.stateCode}` });
  }
  if (req.body.stateCode) state.stateCode = req.body.stateCode;
  if (req.body.funFacts) state.funFacts = req.body.funFacts;
  const result = await state.save();
  res.json(result);
};

// DeleteState
const DeleteState = async (req, res) => {
  if (!req.body.stateCode) {
    return res.status(400).json({ message: "State Code is required" });
  }
  const state = await State.findOne({ _stateCode: req.body.stateCode }).exec();
  if (!state) {
    return res
      .status(400)
      .json({ message: `No State matches with the stateCode ${req.body.stateCode}` });
  }
  const result = await state.deleteOne({ _stateCode: req.body.stateCode });
  res.json(result);
};

// GetState
const GetAllState = async (req, res) => {
  if (!req.params.stateCode) {
    return res.status(400).json({ message: "State Code is required" });
  }
  const state = await State.findOne({ _stateCode: req.params.stateCode }).exec();
  if (!state) {
    return res
      .status(400)
      .json({ message: `No State matches with the stateCode ${req.params.stateCode}` });
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
