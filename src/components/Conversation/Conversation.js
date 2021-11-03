import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Conversation.scss";

const Conversation = ({ conversation, currUser }) => {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currUser, conversation]);

  return (
    <div className="Conversations">
      <img
        src={
          user.profilePicture
            ? PF + user.profilePicture
            : "https://fullstack.edu.vn/assets/images/nobody_m.256x256.jpg"
        }
        alt=""
        className="img"
      />
      <span className="name">{user.username}</span>
    </div>
  );
};

export default Conversation;
