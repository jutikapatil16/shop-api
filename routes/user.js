const User = require("../models/User");
const router = require("express").Router();

const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId=req.params.id) {
   if(req.body.password){
    const salt = await bcrypt.genSalt(10);
    req.body.password= await bcrypt(req.body.password,salt)
   }try{

   const updatedUser = await User.findByIdAndUpdate(req.params.id,{
    $set:req.body,
   }, {
    new:true
   });
   return res.status(200).json(updatedUser)
   }catch(err){
   return res.status(500).json(err)
   }
  }else{
  return res.status(401).json("ONly you can update your profile")
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("User has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET USER
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/",async (req, res) => {
  const query = req.query.new;
  try {
    const users = query      
? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET USER STATS

// router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
//   const date = new Date();
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//   try {
//     const data = await User.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: 1 },
//         },
//       },
//     ]);
//     return res.status(200).json(data)
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

module.exports = router;