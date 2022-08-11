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
    } else {
      res.status(404).json('User not found');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a User

export const updateUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus, password } = req.body;

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      // we send the id of the user and req.body is the info which should be updated in the response
      // { new: true } is used to return the updated user
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
