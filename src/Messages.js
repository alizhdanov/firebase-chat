import React, { useEffect, useState } from "react";
import useCollection from "./useCollection";
import { db } from "./firebase";

function Messages({ channelId }) {
  const messages = useCollection(`channels/${channelId}/messages`, "createdAt");

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>

      {messages.map((data, index, list) => {
        const prevMessage = list[index - 1];
        const sameAuthor = prevMessage && data.user.id === prevMessage.user.id;

        return !sameAuthor ? (
          <FirstMessage key={data.id} data={data} />
        ) : (
          <div key={data.id}>
            <div className="Message no-avatar">
              <div className="MessageContent">{data.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FirstMessage({ data }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.doc(data.user.path).onSnapshot(doc => {
      setUser({ ...doc.data(), id: doc.id });
    });
  }, [data]);

  return (
    <div>
      {/* <div className="Day">
              <div className="DayLine" />
              <div className="DayText">12/6/2018</div>
              <div className="DayLine" />
            </div> */}
      <div className="Message with-avatar">
        <div className="Avatar" />
        <div className="Author">
          <div>
            <span className="UserName">{user && user.displayName}</span>
            <span className="TimeStamp">3:37 PM</span>
          </div>
          <div className="MessageContent">{data.text}</div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
