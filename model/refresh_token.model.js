const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema({

    token: {
        type: String,
        unique: true,
        required: true,
    },

    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: true,
    },

    expiredAt: { 
        type: Date, 
        default: Date.now, 
        expires: '30d' 
    }
},
{timestamps: true}
);

const RefreshToken = mongoose.model("refresh_token", RefreshTokenSchema);
module.exports = RefreshToken;
