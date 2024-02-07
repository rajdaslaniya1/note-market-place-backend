const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passwordHashing = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const passwordCompare = async (password, hashPassword) => {
  const isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
};

const createToken = (user_id, email) => {
  return jwt.sign({ user_id, email }, process.env.SECRET_KEY);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

const expireTime = 10;

const isOtpExpired = (otpCreatedAt) => {
  const otpExpiryTime = new Date(
    otpCreatedAt.getTime() + expireTime * 60 * 1000
  );
  return otpExpiryTime < new Date();
};

const generatePassword = () => {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const specialChars = "!@#$%^&*()_+{}[]|;:,.<>?";
  const digitChars = "0123456789";

  const allChars = lowercaseChars + specialChars + digitChars;

  const getRandomChar = (characters) => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
  };

  const passwordLength = Math.floor(Math.random() * (24 - 6 + 1)) + 6;
  let password = "";

  // Ensure at least one lowercase character
  password += getRandomChar(lowercaseChars);

  // Ensure at least one special character
  password += getRandomChar(specialChars);

  // Ensure at least one digit character
  password += getRandomChar(digitChars);

  // Fill the rest of the password with random characters
  for (let i = 0; i < passwordLength - 3; i++) {
    password += getRandomChar(allChars);
  }

  // Shuffle the characters to make the password more random
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
};

const SystemConfigurationsKey = {
  SupportEmailAddress: "SupportEmailAddress",
  SupportPhoneNumber: "SupportPhoneNumber",
  EmailAddressForNotify: "EmailAddressForNotify",
  DefaultNoteDisplayPicture: "DefaultNoteDisplayPicture",
  DefaultMemberDisplayPicture: "DefaultMemberDisplayPicture",
  TwitterUrl: "TwitterUrl",
  FacebookUrl: "FacebookUrl",
  LinkedInUrl: "LinkedInUrl",
};

module.exports = {
  passwordHashing,
  passwordCompare,
  createToken,
  verifyToken,
  generateOTP,
  isOtpExpired,
  generatePassword,
  SystemConfigurationsKey,
};
