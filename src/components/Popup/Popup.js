import React, { useContext, useEffect, useState } from "react";
import "./Popup.scss";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Usercreate from "../UserCreate/UserCreate";

const Popup = ({ popup, text }) => {
  const { user } = useContext(AuthContext);
  const [userSearch, setUserSearch] = useState([]);
  const list = [];
 

  useEffect(() => {
    const getSuggestions = async () => {
      try {
        const res = await axios.get(`/users/all/${user._id}`);
        setUserSearch(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSuggestions();
  }, [user._id]);

  if (text !== "") {
    userSearch.map((u) => {
      if (u.username.indexOf(text) > -1) {
        list.push(u);
      }
      return list;
    });
  }

  return (
    <div className={popup ? "Popupcreate popupOn" : "Popupcreate"}>
      <div className="popupWrapper">
        {list.map((u) => (
          <Usercreate key={u.id} userSearch={u} />
        ))}
      </div>
    </div>
  );
};

export default Popup;
