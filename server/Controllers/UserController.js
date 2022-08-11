import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';

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

  // ir the user to be modified is the current user or if the current user is an admin
  if (id === currentUserId || currentUserAdminStatus) {
    try {
      if (password) {
        // Hash the password before updating
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      // we send the id of the user and req.body is the info which should be updated in the response
      // { new: true } is used to return the updated user
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('Access Denied! you can only update your own profile');
  }
};

// Delete a User

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus } = req.body;

  // ir the user to be modified is the current user or if the current user is an admin
  if (id === currentUserId || currentUserAdminStatus) {
    try {
      const user = await UserModel.findByIdAndDelete(id);
      res.status(200).json('User deleted successfully');
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('Access Denied! you can only delete your own profile');
  }
};

// Follow a user

export const followUser = async (req, res) => {
  // User who should be followd
  const id = req.params.id;

  // User who wants to follow
  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json('You cannot follow yourself');
  } else {
    try {
      // User that we want to follow

      const followUser = await UserModel.findById(id);

      // Now it's for the user who want to follow the previous found user
      const followingUser = await UserModel.findById(currentUserId);

      // Check if the user is already following the user, then push the currentUserId to his/her followers
      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({
          $push: {
            followers: currentUserId,
          },
        });

        // update the following array of currentUserId

        await followingUser.updateOne({
          $push: {
            following: id,
          },
        });
        // --
        res.status(200).json('User followed successfully');
      } else {
        res.status(403).json('You are already following this user');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
