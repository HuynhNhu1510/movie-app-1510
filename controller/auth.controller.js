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
      return res.status(400).json({ message: "Email address already exists" });
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
      res.status(404).json({ success: false, message: "Invalid password! Please enter again" });
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
        token: accessToken,
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
// 
  // If token is not provided, send error message
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: false,
      message: "Authorization header missing or Invalid authorization header",
    });
  }

  //split Bearer header
  const refreshToken = authorizationHeader.split(" ")[1];

  try {

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);

    // Fetch the user account associated with the refresh token
    const account = await fetchAccountByRefreshToken(refreshToken);

    if(!account) {
      return res.status(403).json({success: false, message: "Invalid refresh token"});
    }

    // optionally, update the account to store the new refresh token.
    const newRefreshToken = generateRefreshToken(account);
    await updateAccountRefreshToken(account, newRefreshToken);

    // generate a new access token
    const newAccessToken = generateAccessToken(account);

    res.status(200).json({
      accessToken: newAccessToken, 
      refreshToken: newRefreshToken}); //Send the new refresh token back

  }
  catch (error) {

    if(error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({success: false, message: "Refresh token expired"});
    } else if(error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({success: false, message: "Invalid refresh token"});
    }

    console.error(error);
    res.status(500).json({success: false, message: "Internal server error"});

  }
};

// finding account information in db based on the provided refreshToken.
exports.fetchAccountByRefreshToken = async (refreshToken) => {
  try {

    const account = await AccountModel.findOne({ refreshToken });
    return account;

    // find account with corresponding refreshtoken

  } catch (error) {
    console.error(error);
    throw error; // return null if not exists
  }
};

// update refresh token 
exports.updateAccountRefreshToken = async(account, newRefreshToken) => {
  try {
    await AccountModel.findByIdAndUpdate(account.id, { refreshToken: newRefreshToken});
  }
  catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getAccount = async (req, res) => {
  try {
    const accountId = req.params.id;

    const account = await AccountModel.findById(accountId);

    if (!account) {
      return res.status(404).json({ error: "Acount not found" });
    }

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json(error);
  }
};
