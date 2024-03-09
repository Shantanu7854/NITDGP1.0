import User from "../models/User.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("hello");
  try {
    const user = await User.create({ name, email, password });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  try {
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
  } catch (error) {
    res.status(500).send(error);
  }
};
