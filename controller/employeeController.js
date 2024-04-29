const Employee = require("../model/Employee");

// GetEmployees
const GetAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees) {
    return res.status(400).json({ message: "No employees found!" });
  }
  res.json(employees);
};

// CreateNewEmployees
const CreateNewEmployee = async (req, res) => {
  if (!req.body.firstName || !req.body.lastName) {
    return res
      .status(400)
      .json({ message: "First and last names are required" });
  }
  try {
    const result = await Employee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

// UpdateEmployee
const UpdateEmployee = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "Employee ID is required" });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(400)
      .json({ message: `No Employee matches with the ID ${req.body.id}` });
  }
  if (req.body.firstName) employee.firstName = req.body.firstName;
  if (req.body.lastName) employee.lastName = req.body.lastName;
  const result = await employee.save();
  res.json(result);
};

// DeleteEmployee
const DeleteEmployee = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "Employee ID is required" });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(400)
      .json({ message: `No Employee matches with the ID ${req.body.id}` });
  }
  const result = await employee.deleteOne({ _id: req.body.id });
  res.json(result);
};

// GetEmployee
const GetAllEmployee = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Employee ID is required" });
  }
  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employee) {
    return res
      .status(400)
      .json({ message: `No Employee matches with the ID ${req.params.id}` });
  }
  res.json(employee);
};

module.exports = {
  GetAllEmployee,
  CreateNewEmployee,
  UpdateEmployee,
  DeleteEmployee,
  GetAllEmployees,
};
