import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    Sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    Name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: String,
    body: String,
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || model("Message", MessageSchema);

export default Message;
