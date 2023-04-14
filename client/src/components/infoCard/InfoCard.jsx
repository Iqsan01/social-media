import React, { useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../profileModal/ProfileModal";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <div className="InfoCard">
      <div className="InfoHead">
        <h3>Your Info</h3>
        <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        </div>
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>Masih Mencari</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>Indonesia</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>Google</span>
      </div>

      <button className="button logout-button">Logout</button>
    </div>
  );
};

export default InfoCard;