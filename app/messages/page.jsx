import connectDB from "@/config/database";
import Message from "@/models/Message";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import MessageCard from "@/components/MessageCard";

const MessagesPage = async () => {
  connectDB();

  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;
  console.log("Session User id:", userId);

  const readMessages = await Message.find({ Receiver: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("Sender", "username")
    .populate("Property", "name")
    .lean();

  const unreadMessages = await Message.find({ Receiver: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("Sender", "username")
    .populate("Property", "name")
    .lean();

  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializeableObject(messageDoc);
    message.Sender = convertToSerializeableObject(messageDoc.Sender);
    message.Property = convertToSerializeableObject(messageDoc.Property);
    return message;
  });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
