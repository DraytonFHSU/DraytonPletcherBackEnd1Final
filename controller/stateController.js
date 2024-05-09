const State = require("../model/States");

// GetStates
const GetAllStates = async (req, res) => {
  if(typeof req?.query?.contig != "undefined"){
    if(req?.query?.contig==='true'){
      const states = await State.find().sort({"admission_number": 1}).limit(48);
      if (!states) {
        return res.status(400).json({ message: "No states found!" });
      }
      res.json(states);
    }
    else{
      const states = await State.find().sort({"admission_number": -1}).limit(2);
      if (!states) {
        return res.status(400).json({ message: "No states found!" });
      }
      res.json(states);
    }
  }//
  else{
  const states = await State.find(); //somethin here?
  if (!states) {
    return res.status(400).json({ message: "No states found!" });
  }
  res.json(states);
}
};

// CreateNewstates
const CreateNewState = async (req, res) => {
  if (!req.body.code) {
    return res
      .status(400)
      .json({ message: "Code is required" });
  }
  try {
    const result = await State.create({
      code: req.body.code,
      funFacts: req.body.funFacts,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

// UpdateState
const UpdateState = async (req, res) => {
  if (!req.body.code) {
    return res.status(400).json({ message: "State Code is required" });
  }
  const state = await State.findOne({ _code: req.body.code }).exec();
  if (!state) {
    return res
      .status(400)
      .json({ message: `No State matches with the code ${req.body.code}` });
  }
  if (req.body.code) state.code = req.body.code;
  if (req.body.funFacts) state.funFacts = req.body.funFacts;
  const result = await state.save();
  res.json(result);
};

// DeleteState
const DeleteState = async (req, res) => {
  if (!req.body.code) {
    return res.status(400).json({ message: "State Code is required" });
  }
  const state = await State.findOne({ _code: req.body.code }).exec();
  if (!state) {
    return res
      .status(400)
      .json({ message: `No State matches with the code ${req.body.code}` });
  }
  const result = await state.deleteOne({ _code: req.body.code });
  res.json(result);
};

// GetState
const GetAllState = async (req, res) => {
  if (!req.params.code) {
    return res.status(400).json({ message: "State Code is required" });
  }
  const state = await State.findOne({code: req.params.code})
  console.log(state);
  if (!state) {
    return res
      .status(400)
      .json({ message: `No state matches with the state Code ${req.params.code}` });
  }
  res.json(state);
};


const getFunFact = async(req,res) =>{
  if(!req.params.code){
      return res.status(400).json({message: "Please enter a state code"})
  }
  const stateTarget = await State.findOne({code: req.params.code})

  if(!stateTarget) {
      return res
      .status(204).json({message: `state code "${req.body.code}" not recognized`});
  }
  console.log(stateTarget.funfacts)
  if(typeof stateTarget.funfacts != "undefined"){
    fact = stateTarget.funfacts;
    res.json(fact);
  }
  else{
      return res.status(400).json({message: "no fun facts available"})
  }
}

//adds a fun fact
const addFunFact = async (req, res) =>{
  if(!req.params.code){
      return res.status(400).json({message: "Please enter a state code for the fun fact to go to"})
  }
  if(!req.body.funFact){
      return res.status(400).json({message: "Please enter a fun fact for the state to add"})
  }
  const stateTarget = await State.findOne({code: req.params.code}).exec();

  if(!stateTarget) {
      return res
      .status(400).json({message: `state code "${req.body.code}" not found`});
  }
  //add a fun fact at the end of the list
  stateTarget.funfacts[stateTarget.funfacts.length] = req.body.funFact;
  
  const result =  stateTarget.save()

  res.json(stateTarget)
};

const patchFunFact = async (req,res) => {
  if(!req.params.code){
      return res.status(400).json({message: "Please enter a state code for the fun fact to go to"})
  }
  if(!req.body.funFact){
      return res.status(400).json({message: "Please enter a fun fact for the state to add"})
  }
  if(!req.body.target){
      return res.status(400).json({message: "Please add a index"})
  }
  const stateTarget = await State.findOne({code: req.params.code}).exec();

  if(!stateTarget) {
      return res
      .status(400).json({message: `state code "${req.body.code}" not found`});
  }

  stateTarget.funfacts[req.body.target-1] = req.body.funFact;
  
  const result =  stateTarget.save()

  res.json(stateTarget)
}

const deleteFunFact = async (req,res) => {
  if(!req.params.code){
      return res.status(400).json({message: "State Code is required. Example: :KS"})
  }
  if(!req.body.funFact){
      return res.status(400).json({message: ""})

  }
  if(!req.body.target){
      return res.status(400).json({message: ""})

  }
  const stateTarget = await State.findOne({code: req.params.code}).exec();

  if(!stateTarget) {
      return res
      .status(400).json({message: `state code "${req.body.code}" not found`});
  }

  stateTarget.funfacts.pop();
  
  const result =  stateTarget.save()

  res.json(stateTarget)
}

//filters
const getAdmission = async(req, res) =>{
  const states = await State.findOne({code: req.params.code});
  if(!states){return res.status(400).json({message: "Admission date unavailable"})};
  console.log(states.capital_city, states.capital_url)
  res.status(200).json({"state" : states.state, "admission" : states.admission_date});
}

const getCapital = async(req, res) =>{
  const states = await State.findOne({code: req.params.code});
  if(!states){return res.status(400).json({message: "Capital unavailable"})};
  console.log(states.capital_city, states.capital_url)
  res.status(200).json({"state" : states.state, "capital" : states.capital_city});
}

const getNickname = async(req, res) =>{
  const states = await State.findOne({code: req.params.code});
  if(!states){return res.status(400).json({message: "Nickname unavailable!"})};
  console.log(states.capital_city, states.capital_url)
  res.status(200).json({"state" : states.state, "nickname" : states.nickname});
}

const getPopulation = async(req, res) =>{
  const states = await State.findOne({code: req.params.code});
  if(!states){return res.status(400).json({message: "Population unavailable!"})};
  console.log(states.capital_city, states.capital_url)
  res.status(200).json({"state" : states.state, "population" : states.population});
}


module.exports = {
  GetAllState,
  CreateNewState,
  UpdateState,
  DeleteState,
  GetAllStates,
  getFunFact,
  addFunFact,
  patchFunFact,
  deleteFunFact,
  getAdmission,
  getCapital,
  getNickname,
  getPopulation
};
