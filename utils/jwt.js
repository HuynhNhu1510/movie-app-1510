
const jwt = require("jsonwebtoken");

exports.generateAccessToken = (account) => {
    const payload = {
        account: {
          id: account.id
        },
      };
    
      return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2h" });
};

exports.generateRefreshToken = (account) => {
    const payload = {
        account: {
          id: account.id
        },
      };
    
      return jwt.sign(payload, process.env.REFRESH_KEY, { expiresIn: "30d" });
};

exports.verifyAccessToken = (token) => jwt.verify(token, process.env.SECRET_KEY);
exports.verifyRefreshToken = (token) => jwt.verify(token, process.env.REFRESH_KEY);

