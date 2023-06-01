import User from "../models/User.js";

// Reading unique user
export const readUniqueUser = async (req, res) => {
  try {
    const uniqueUser = await User.findById(req.params.id);
    res.status(200).json(uniqueUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Reading all users
export const readAllUsers = async (req, res) => {
  try {
    const users = await User.find(req.params.id);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Updating a User
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { user: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Deleting a User
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};
