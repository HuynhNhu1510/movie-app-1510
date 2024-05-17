const ListModel = require("../model/list.model");

exports.createList = async (req, res) => {
  try {
    const list = await ListModel.create({
      accound_id: req.account.id,
      slug: req.body.slug,
      thumb_url: req.body.thumbUrl,
      name: req.body.name,
    });

    if (!list) {
      return res.status(400).json({ success: false, message: "Something went wrong" });
    }

    res.status(201).json({
      success: true,
      message: "Created successfully",
      list: list,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getListByAccountID = async (req, res) => {
  try {
    D;
    const accountID = req.params.account_id;

    // Validate ObjectId (Tùy chọn, nhưng nên có)
    if (!mongoose.Types.ObjectId.isValid(accountID)) {
      return res.status(400).json({ success: false, message: "Invalid account ID" });
    }

    const list = await ListModel.findOne({ account_id: accountID });

    if (!list) {
      return res.status(400).json({ success: false, message: "Acount not found" });
    }

    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

exports.deleteList = async (req, res) => {
   
};
