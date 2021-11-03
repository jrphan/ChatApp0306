import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import Conversation from "../../components/Conversation/Conversation";
import "./Home.scss";
import Popup from "../../components/Popup/Popup";
import Message from "../../components/Message/Message";
import axios from "axios";
import { io } from "socket.io-client";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Popupsetting from "../../components/PopupSetting/PopupSetting";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [loader, setLoader] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const [popup, setPopup] = useState(false);
  const [Search, setSearch] = useState("");
  const [userLogin, setUserLogin] = useState({});
  const [userCurr, setUserCurr] = useState({});
  const [newMessages, setNewMessages] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [arrMessages, setArrMessages] = useState(null);
  const srollRef = useRef();
  const socket = useRef();
  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
  };
  const [menu, setMenu] = useState(true);
  const [setting, setSetting] = useState(false);

  useEffect(() => {
    setLoader(true);
    const timing = setTimeout(() => {
      setLoader(false);
    }, 1300);
    return () => clearTimeout(timing);
  }, []);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.on("getMessage", (data) => {
      setArrMessages({
        sender: data.senderId,
        text: data.text,
        createAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrMessages &&
      currentChat?.members.includes(arrMessages.sender) &&
      setMessages((prev) => [...prev, arrMessages]);
  }, [arrMessages, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
  }, [user]);

  useEffect(() => {
    const friendId = currentChat
      ? currentChat.members.find((m) => m !== user._id)
      : [];

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUserCurr(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [user, currentChat]);

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

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversations/${user._id}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    srollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessages,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    const dataForm = { senderId: user._id, receiverId, text: newMessages };

    socket.current.emit("sendMessage", dataForm);

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessages("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    setPopup(!popup);
  };

  const menuClick = () => {
    setMenu(!menu);
  };

  const handleSetting = () => {
    setSetting(!setting);
  };

  return (
    <>
      {loader ? (
        <Loading />
      ) : (
        <>
          <div className="HomePage">
            <div className="HomeContainer">
              {!setting &&
                (menu ? (
                  <CloseIcon
                    className="menu close"
                    htmlColor="rgb(242, 24, 79)"
                    onClick={menuClick}
                  />
                ) : (
                  <MenuOutlinedIcon
                    className="menu"
                    htmlColor="rgb(242, 24, 79)"
                    onClick={menuClick}
                  />
                ))}

              {setting && (
                <Popupsetting
                  handleSetting={handleSetting}
                  handleLogOut={handleLogOut}
                />
              )}
              <div
                className={
                  menu
                    ? "HomeContainer__userMenu"
                    : "HomeContainer__userMenu menu"
                }
              >
                <div className="HomeContainer__userMenu-profile">
                  <div className="profile">
                    <img
                      src={
                        userLogin.profilePicture
                          ? PF + userLogin.profilePicture
                          : "https://fullstack.edu.vn/assets/images/nobody_m.256x256.jpg"
                      }
                      alt=""
                      className="img"
                    />
                    <p className="name">{user.username}</p>
                  </div>
                  <p onClick={handleSetting} className="logout">
                    <SettingsIcon
                      htmlColor="rgb(242, 24,79)"
                      fontSize="small"
                    />
                  </p>
                </div>
                <div className="HomeContainer__userMenu-search">
                  <Popup popup={popup} text={Search} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="searchName"
                    onClick={handleClick}
                    onChange={(e) => setSearch(e.target.value)}
                    value={Search}
                  />
                </div>
                <div className="HomeContainer__userMenu-usersChat">
                  {conversations.map((conversation) => (
                    <>
                      <div
                        onClick={() => {
                          setCurrentChat(conversation);
                        }}
                      >
                        <Conversation
                          key={conversation._id}
                          conversation={conversation}
                          currUser={user}
                        />
                      </div>{" "}
                    </>
                  ))}
                </div>
              </div>
              <div
                className={
                  currentChat
                    ? "HomeContainer__chatBox"
                    : "HomeContainer__chatBox mess"
                }
              >
                {currentChat ? (
                  <>
                    {" "}
                    <div className="HomeContainer__chatBox-info">
                      <img
                        src={
                          userCurr.profilePicture
                            ? PF + userCurr.profilePicture
                            : "https://fullstack.edu.vn/assets/images/nobody_m.256x256.jpg"
                        }
                        alt=""
                      />
                      <span className="name">{userCurr.username}</span>
                    </div>
                    <div
                      className="HomeContainer__chatBox-content"
                      onClick={menuClick}
                    >
                      {messages.map((m) => (
                        <>
                          <div ref={srollRef}>
                            <Message
                              message={m}
                              own={m.sender === user._id}
                              userCurr={userCurr}
                            />
                          </div>
                        </>
                      ))}
                    </div>
                    <div className="HomeContainer__chatBox-input">
                      <div className="ChatInput">
                        <form onSubmit={handleSubmit}>
                          <input
                            type="text"
                            placeholder="Enter your text..."
                            className="input"
                            onChange={(e) => setNewMessages(e.target.value)}
                            value={newMessages}
                          />
                          <button type="submit">Send</button>
                        </form>
                      </div>
                    </div>{" "}
                  </>
                ) : (
                  <ForumOutlinedIcon className="mess" />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
