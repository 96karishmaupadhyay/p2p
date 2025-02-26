import {Message} from "../models/messageModel.js"

export const sendMessage = async (req, res) => {
  const { sender, recipient, message } = req.body;
  try {
    const newMessage = new Message({ sender, recipient, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMessages = async (req, res) => {
  const { recipient } = req.params;
  try {
    const messages = await Message.find({ recipient });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

