import UserModel from '../Models/userModel.js';

// Get a user
export const getUser = async (req, res) => {
  const id = req.params.id;

  // chech if user exists

  try {
    const user = await UserModel.findById(id);

    if (user) {
      // SEND USER WITHOUT PASSWORD
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
