import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const hashPassword = async password => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

const generateAccessToken = data => {
  const token = sign({ ...data }, process.env.AccessTokenSecretKey, {
    expiresIn: "7d",
  });
  return token;
};

const verifyAccessToken = token => {
  try {
    const tokenPayload = verify(token, process.env.AccessTokenSecretKey);
    return tokenPayload;
  } catch (err) {
    console.log("Verify Access Token Error ->", err);
    return false;
  }
};

const generateRefreshToken = data => {
  const token = sign({ ...data }, process.env.RefreshTokenSecretKey, {
    expiresIn: "7d",
  });
  return token;
};

const validateEmail = email => {
  const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
  return pattern.test(email);
};

const validatePhone = phone => {
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
  return pattern.test(phone);
};

const validatePassword = password => {
  const pattern = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;
  return pattern.test(password);
};


export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePhone,
  validatePassword,
};
