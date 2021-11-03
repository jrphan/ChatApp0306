import React, { useContext, useEffect, useState } from "react";
import "./Message.scss";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Message = ({ message, own, userCurr }) => {
  const { user } = useContext(AuthContext);
  const [userLogin, setUserLogin] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + user._id);
        setUserLogin(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [user]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className={own ? "message__content own" : "message__content"}>
        <img
          src={
            own
              ? userLogin.profilePicture
                ? PF + userLogin.profilePicture
                : "https://fullstack.edu.vn/assets/images/nobody_m.256x256.jpg"
              : userCurr.profilePicture
              ? PF + userCurr.profilePicture
              : "https://fullstack.edu.vn/assets/images/nobody_m.256x256.jpg"
          }
          alt=""
          className={own ? "message__content-img own" : "message__content-img"}
        />
        <p className="message__content-text">{message.text}</p>
      </div>
      <div className={own ? "message__time own" : "message__time"}>
        {format(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
