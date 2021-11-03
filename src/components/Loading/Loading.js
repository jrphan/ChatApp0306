import React from "react";
import "./Loading.scss";
import FillingBottle from "react-cssfx-loading/lib/FillingBottle";

const Loading = () => {
  return (
    <div className="LoadingPage">
      <div className="LoadingPage__Wrapper">
        <FillingBottle
          color="rgb(242, 24,79)"
          width="35px"
          height="35px"
          duration="1.3s"
        />
      </div>
    </div>
  );
};

export default Loading;
