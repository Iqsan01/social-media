import React from "react";
import "./ProfileCard.css";
import Cover from "../../img/post1.jpg";
import Profile from "../../img/me.jpg";

const ProfileCard = () => {

  const ProfilePage = true;

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="" />
        <img src={Profile} alt="" />
      </div>

      <div className="ProfileName">
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

          {ProfilePage && (
            <>
            <div className="vl"></div>
              
              <div className="follow">
                <span>3</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {ProfilePage ? "" :
      <span>
        My Profile
      </span>
      }
    </div>
  );
};

export default ProfileCard;
