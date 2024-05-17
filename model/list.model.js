const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({

    accound_id: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: true,
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
}, {timestamps: true}
);

const ListModel = mongoose.model("list", ListSchema);   
module.exports = ListModel;