"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

async function addMessage(previousState, formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    return { error: "You must be logged in to send a message" };
  }

  const { user } = sessionUser;

  const recipient = formData.get("recipient");

  if (user.id === recipient) {
    return { error: "You can not send a message to yourself" };
  }
  console.log("🟦 Form Data ", formData);

  const newMessage = new Message({
    Sender: user.id,
    Receiver: formData.get("Receiver"),
    Property: formData.get("Property"),
    Name: formData.get("Name"),
    email: formData.get("Email"),
    phone: formData.get("Phone"),
    body: formData.get("Message"),
  });

  await newMessage.save();

  return { submitted: true };
}

export default addMessage;
