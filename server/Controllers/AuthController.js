import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';

// REGISTERING A NEW USER
export const registerUser = async (req, res) => {
  const { username, password, firstname, lastname } = req.body;

  // salt is how much we want to hash the password
  const salt = await bcrypt.genSalt(10);

  const hashedPass = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    username,
    password: hashedPass,
    firstname,
    lastname,
  });

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN A USER

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // find the user
    const user = await UserModel.findOne({ username: username });

    // validate password
    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      validity
        ? res.status(200).json(user)
        : res.status(400).json({ message: 'Invalid Password' });
    } else {
      res.status(404).json({ message: 'Invalid Username' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
