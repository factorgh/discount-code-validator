import User from "../models/user.js";

const getAllUsers = async (req, res) => {
  //Get all users
  const users = await User.find();

  if (!users) return res.status(404).send("There are no users");

  res.status(200).send(users);
};

const registerUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const discountCodes = [];
    console.log(name, email, discountCodes);
    const user = await User.create({ name, email, discountCodes });

    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error registering user");
  }
};
const loginUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const singleUser = await User.findOne({ email });
    console.log(singleUser);
    if (!singleUser) return res.send("No user found");

    res.status(200).send(singleUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error logging  user");
  }
};

export default {
  getAllUsers,
  registerUser,
  loginUser,
};
