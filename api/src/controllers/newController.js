import New from "../models/New.js";

// Creating a new
export const createNew = async (req, res) => {
  // new --> Palavra reservada do JavaScript // New --> Nosso modelo do mongoose
  const newNew = new New(req.body);
  try {
    const savedNew = await newNew.save();
    
    res.status(200).json(savedNew);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Reading unique new
export const readUniqueNew = async (req, res) => {
  try {
    const uniqueNew = await New.findById(req.params.id);
    res.status(200).json(uniqueNew);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Reading all news
export const readAllNews = async (req, res) => {
  try {
    const news = await New.find(req.params.id);
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Updating a new
export const updateNew = async (req, res) => {
  try {
    const updatedNew = await New.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedNew);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Deleting a new
export const deleteNew = async (req, res) => {
  try {
    await New.findByIdAndDelete(req.params.id);
    res.status(200).json("New has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};
