import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // set JWT as httpOnly cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  });
};

export default generateToken;