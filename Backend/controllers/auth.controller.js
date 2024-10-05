import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async(req,res) => {
  try {
    //getting user details
    const {fullName,username,password,confirmpassword,gender} = req.body;

    //password verification
    if(password !== confirmpassword){
      return res.status(400).json({error:"Password don't Match"})
    }

    //checking if user already exists
    const user = await User.findOne({username});
    if(user){
      return res.status(400).json({error:"Username already Exists!"})
    }

    //Hashing this password here
    const salt = await bcrypt.genSalt(10);
    const hashedpasswod = await bcrypt.hash(password, salt);

    //api for profile pic
    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
    

    const newUser = new User({
      fullName,
      username,
      password: hashedpasswod,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    })

    if(newUser){
      //generate JWT Token here
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic
    });
    }else{
      res.status(400).json({error: "Inavalid user data"});
    }

  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({error: "Internal Server Error"});
  }
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
    
		const user = await User.findOne({ username });

		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}
    

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req,res) => {
  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
  }
};
  
