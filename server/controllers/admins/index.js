import express from "express";
import bcrypt from "bcryptjs";
import adminModel from "../../models/Admins/Admins.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    let { name, email, password, phone, role } = req.body;
    let hashPass = await bcrypt.hash(password, 10);
    password = hashPass;
    let newAdmin = {
      name,
      email,
      password: hashPass,
      phone,
      role,
    };
    await adminModel.create(newAdmin);
    res.status(200).json({ msg: "Admin created 📖" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let admin = await adminModel.findOne({ _id: userParams });
    res.status(200).json({ admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getall", async (req, res) => {
  try {
    let admins = await adminModel.find({});
    res.status(200).json({ admins });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    let userData = req.body;
    await adminModel.updateOne({ _id: userParams }, { $set: userData });
    res.status(200).json({ msg: "Admin updated." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let userParams = req.params.id;
    await adminModel.deleteOne({ _id: userParams });
    res.status(200).json({ msg: "Admin deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deleteall", async (req, res) => {
  try {
    await adminModel.deleteMany({});
    res.status(200).json({ msg: "All Admins deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
