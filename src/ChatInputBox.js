import React, { useCallback } from "react";
import { db } from "./firebase";

function ChatInputBox({ user, channelId }) {
  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault();
      const val = evt.target.elements[0].value;

      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .add({
          user: db.collection("users").doc(user.uid),
          createdAt: new Date(),
          text: val
        });

      evt.target.reset();
    },
    [user, channelId]
  );

  return (
    <form onSubmit={handleSubmit} className="ChatInputBox">
      <input className="ChatInput" placeholder={`Message #${channelId}`} />
    </form>
  );
}

export default ChatInputBox;
