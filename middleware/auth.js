const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      msg: "No token, authorization denied",
    });
  }

  const accessToken = token.split(" ")[1];

  try {
    await jwt.verify(accessToken, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          msg: "Invalid token",
        });
      } else {
        req.account = decoded.account;
        next();
      }
    });
  } catch (err) {
    console.log("Something went wrong with middleware " + err);
    res.json(500).json({
      msg: "Server error!!",
    });
  }
};
