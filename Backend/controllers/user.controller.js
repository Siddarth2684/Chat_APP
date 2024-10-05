import User from "../models/usermodel.js";
export const getUsersForSidebar = async(req, res) =>{
  try {

    const loggedInUserId = req.user._id;

    //get alltheusers in the sidebar without password except the authenticated user 
    const filterdUsers = await User.find({ _id: {$ne: loggedInUserId} }).select("-password");

    res.status(200).json(filterdUsers);

    
  } catch (error) {
    console.error("Error in getUsersForSidebar", error.message);
    res.status(500).json({error: "Internal server error"});
  }
}