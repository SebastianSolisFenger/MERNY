import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// REGISTERING A NEW USER
export const registerUser = async (req, res) => {
  // const { username, password, firstname, lastname } = req.body;

  // salt is how much we want to hash the password
  const salt = await bcrypt.genSalt(10);

  const hashedPass = await bcrypt.hash(req.body.password, salt);

  req.body.password = hashedPass;

  const newUser = new UserModel(
    req.body
    // username,
    // password: hashedPass,
    // firstname,
    // lastname,
  );

  const { username } = req.body;

  try {
    const oldUser = await UserModel.findOne({ username });

    if (oldUser) {
      return res
        .status(400)
        .json({ message: 'Username is already registered' });
    }

    const user = await newUser.save();

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ user, token });
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

    //  if the user is right, then validate password (but first you need to decrypt it/compare it)
    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      // validity
      //   ? res.status(200).json(user)
      //   : res.status(400).json({ message: 'Invalid Password' });
      if (!validity) {
        return res.status(400).json({ message: 'Invalid Password' });
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_KEY,
          { expiresIn: '1h' }
        );

        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json({ message: 'Invalid Username' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
