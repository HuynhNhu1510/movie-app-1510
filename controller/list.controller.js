const ListModel = require("../model/list.model");
const mongoose = require("mongoose");

exports.createList = async (req, res) => {
  try {
    const list = await ListModel.create({
      account_id: req.account.id,
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
    const accountId = req.params.account_id;

      const list = await ListModel.find({ account_id: accountId });

    if (!list) {
      return res.status(400).json({ success: false, message: "Acount not found" });
    }

    if (list.length === 0) {
      return res.status(404).json({ success: false, message: "No lists found for this account" });
    }

    res.status(200).json(list);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

exports.deleteList = async (req, res) => {
  try {

    const accountId = req.params.account_id;
    const slug = req.params.slug;

    const list = await ListModel.findOneAndDelete({
      account_id: accountId,
      slug: slug
    });

    if (!list) {
      return res.status(401).json({ success: false, message: "List not found" });
    }

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
