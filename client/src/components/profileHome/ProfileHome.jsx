import React from "react";
import "./ProfileHome.css";
import Cover from "../../img/post1.jpg";
import Profile from "../../img/me.jpg";

const ProfileHome = () => {

  return (
    <div className="ProfileHome">
      <div className="ProfileHomeImg">
        <img src={Cover} alt="" />
        <img src={Profile} alt="" />
      </div>

      <div className="ProfileHName">
        <span>Iqsan</span>
        <span>Web Developer</span>
      </div>

      <div className="FollowStatus">
        <hr />
        <div>
          <div className="follow">
            <span>1.111</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>4</span>
            <span>Followers</span>
          </div>
        </div>
        <hr />
      </div>
      <span>
        My Profile
      </span>
    </div>
  );
};

export default ProfileHome;
