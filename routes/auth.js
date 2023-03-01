const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//REGISTER
router.post("/register", async (req, res) => {
   

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password , salt)
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password:hashPass,
     
  });

  try {
    const savedUser = await newUser.save();
    // 201 for successfully added
    return res.status(201).json(savedUser);

  } catch (err) {
    // error then 500
    return res.status(500).json(err);
  }
});

//LOGIN

router.post('/login', async (req, res) => {
  try{
      const user = await User.findOne(
          {
              username: req.body.username
          }
      );
      !user && res.status(401).json("Wrong Credentials");


      const validated = await bcrypt.compare(req.body.password , user.password)
      !validated && res.status(400).json("Wrong password")
    

      const { password, ...others } = user._doc;  

      return res.status(200).json(others);
  }catch(err){
      return res.status(500).json(err);
  }

});

module.exports = router;