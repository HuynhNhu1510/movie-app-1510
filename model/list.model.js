const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({

    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
    },

    slug: {
        type: String,
        unique: true,
        default: ""
    },

    thumbUrl: {
        type: String,
        default: ""
    },

    name: {
        type: String,
        default: "",
    },
}, 
{timestamps: true}
);

const ListModel = mongoose.model("list", ListSchema);   
module.exports = ListModel;