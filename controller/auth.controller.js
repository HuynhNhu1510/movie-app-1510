const AccountModel = require("../model/account.model");

const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
exports.registered = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // checking if it already exists in db
    const existAccount = await AccountModel.findOne({ email });

    if (existAccount) {
      return res.status(400).json({ msg: "Email address already exists" });
    }

    // hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create new account
    const account = new AccountModel({
      email,
      phone,
      password: hash,
    }).save();

    const accessToken = generateAccessToken(account);

    res.status(200).json({ success: true, message: "Create successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const account = await AccountModel.findOne({ email: req.body.email });

    // check email if it exists
    if (!account) {
      res.status(404).json("Invalid email! Please enter again");
    }

    const validPassword = await bcrypt.compare(req.body.password, account.password);

    if (!validPassword) {
      res.status(404).json("Invalid password! Please enter again");
    }

    // login success
    if (account && validPassword) {
      const accessToken = generateAccessToken(account);
      const refreshTokens = generateRefreshToken(account);

      account.refreshToken = refreshTokens;
      await account.save();

      // const { password, ...others } = account._doc;

      res.status(200).json({
        success: true,
        message: "Account logged in successfully",
        id: account.id,
        token: accessToken
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

// refresh token
exports.requestRefreshToken = async (req, res) => {
  // take refresh token from user
  const authorizationHeader = req.headers.authorization;

  // If token is not provided, send error message
  if (!authorizationHeader) {
    return res.status(401).json({
      status: false,
      message: "Token not found!!!",
    });
  }

  //split Bearer header
  const refreshTokens = authorizationHeader.split(" ")[1];

  //If token does not exist, send error message
  if (!account.refreshToken.includes(refreshTokens)) {
    return res.status(403).json({
      status: false,
      message: "Invalid refresh token!!!",
    });
  }

  try {
    jwt.verify(refreshTokens, process.env.REFRESH_KEY, (error, account) => {
      if (error) {
        console.log(error);
      }

      account.refreshToken = account.refreshToken.filter((token) => token !== refreshToken);

      const newAccessToken = generateAccessToken(account);
      const newRefreshToken = generateRefreshToken(account);

      refreshTokens.push(newRefreshToken);

      res.status(200).json({
        status: true,
        message: "Created Successfully!!!",
        accessToken: newAccessToken
      });
    });
  } catch (error) {
    res.status(403).json({
      status: false,
      message: "Invalid Token!!!",
    });
  }
};

exports.getAccount = async (req, res) => {
  try {

    const account = await AccountModel.find();

    res.status(200).json(account);

  } catch (error) {
    res.status(500).json(error);
  }
};
