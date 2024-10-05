import Conversation from '../models/conversation.model.js';
import Message from '../models/message.models.js';


export const sendMessage = async(req, res) => {
  try {

    //Getting Message from user
    const {message} = req.body;
    //getting the reciever id from params
    const {id: receiverId} = req.params;
    //getting the sender id
    const senderId = req.user._id;


    //to check the conversation between two users exists or not
    let conversation = await Conversation.findOne({
      //This give us concersation between sender and recivwe
      participants: { $all : [senderId, receiverId]},
    });


    // if conversationis not exists create one 
    if(!conversation)
    {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if(newMessage){
      conversation.messages.push(newMessage._id);
    }

    //Socketio

    // await conversation.save();
    // await newMessage.save();

    //This runs parallel 
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);

  } catch (error) {
    console.log("Error in sendMessage Controller: ", error.message);
    res.status(500).json({error:"Internal Server Error"});
  }
};


export const getMessages = async(req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: {$all: [senderId, userToChatId]},
    }).populate("messages");//Not the message reference but populates the original message one by one

    if(!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
    
  } catch (error) {
    console.log("Error in getMessages Controller: ", error.message);
    res.status(500).json({error:"Internal Server Error"});
  }
}