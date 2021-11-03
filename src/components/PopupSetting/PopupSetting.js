import React, { useState, useContext } from "react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import "./PopupSetting.scss";
import CloseIcon from "@mui/icons-material/Close";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Popupsetting = ({ handleSetting, handleLogOut }) => {
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthContext);

  const submitHandle = async (e) => {
    e.preventDefault();
    if (file === null) {
      alert("Bạn chưa thêm ảnh!!!");
    } else {
      const newUpdate = {
        userId: user._id,
      };

      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.set("name", fileName);
        data.set("file", file);
        newUpdate.profilePicture = fileName;
        try {
          await axios.post("/upload", data);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      }

      try {
        await axios.patch("/users/update", newUpdate);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="Popupsetting">
      <div className="popupWrapper">
        <div className="overPlay">
          <CloseIcon
            className="close"
            onClick={handleSetting}
            htmlColor="rgb(242, 24,79)"
            fontSize="large"
          />
          <form className="box" onSubmit={submitHandle}>
            <label htmlFor="img" className="upload">
              {file ? (
                <button type="submit" className="btn">
                  <IosShareOutlinedIcon
                    // className="btn"
                    onClick={submitHandle}
                    htmlColor="rgb(242, 24,79)"
                  />
                  <p>Upload</p>
                </button>
              ) : (
                <>
                  <ImageOutlinedIcon htmlColor="rgb(242, 24,79)" />
                  <p>More photos</p>
                </>
              )}
              <input
                type="file"
                id="img"
                accept=".png,.jpeg,.jpg"
                style={{ display: "none" }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </label>
            <div className="logout" onClick={handleLogOut}>
              <LogoutOutlinedIcon htmlColor="rgb(242, 24,79)" />
              <p>Log out</p>
            </div>
          </form>
        </div>
        ư
      </div>
    </div>
  );
};

export default Popupsetting;
