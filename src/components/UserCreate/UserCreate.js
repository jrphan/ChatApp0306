import React, { useState, useEffect, useContext } from "react";
import "./UserCreate.scss";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";

const Usercreate = ({ userSearch }) => {
  const { user } = useContext(AuthContext);
  const [newConversation, setNewConversation] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const Create = async () => {
      await axios.post("/conversations", newConversation);
    };
    Create();
  }, [newConversation]);

  const handleClick = () => {
    setNewConversation({
      senderId: user._id,
      receiverId: userSearch._id,
    });
    window.location.reload();
  };

  return (
    <div className="Usercreate" onClick={handleClick}>
      <div className="profile">
        <img
          src={
            userSearch.profilePicture
              ? PF + userSearch.profilePicture
              : "https://fullstack.edu.vn/assets/images/nobody_m.256x256.jpg"
          }
          alt=""
          className="imgProfile"
        />
        <span className="nameProfile">{userSearch.username}</span>
      </div>
      <div>
        <AddIcon fontSize="small" />
      </div>
    </div>
  );
};

export default Usercreate;
