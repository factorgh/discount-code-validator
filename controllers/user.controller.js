import User from "../models/user.js";

const getAllUsers = async (req, res) => {
  //Get all users
  const users = await User.find();

  if (!users) return res.status(404).send("There are no users");

  res.status(200).send(users);
};

const registerUser = async (req, res) => {
  const { name, email } = req.body;
  const user = new User({ name, email, discountCodes: [] });

  try {
    await user.save();
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
