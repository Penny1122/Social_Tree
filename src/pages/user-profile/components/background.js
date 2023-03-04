import React from "react";
import { useState, useRef } from "react";
import { BsCheck, BsX } from "react-icons/bs";
import { TbPhoto } from "react-icons/tb";
import { BiLoaderCircle } from "react-icons/bi";
import { useProfile } from "../../../hooks/useProfile";
import BackgroundImage from "../../../images/defaultBackgroundImage.jpg";

const Background = ({ self }) => {
  const myRef = useRef();
  const {
    updateBackgroundImage,
    backgroundURL,
    isUpdatingBackgroundImage,
    profile,
  } = useProfile();
  const [backgroundImage, setBackgroundImage] = useState("");
  const previewBackgroundImageURL = backgroundImage
    ? URL.createObjectURL(backgroundImage)
    : "";

  const handleChangeBackgroundImage = () => {
    const metaData = {
      contentType: backgroundImage.type,
    };
    updateBackgroundImage({ metaData, backgroundImage });
    setBackgroundImage("");
    myRef.current.value = "";
  };
  return (
    <>
      {!backgroundImage && !isUpdatingBackgroundImage && (
        <img src={[profile.backgroundURL]} className="background-image" />
      )}
      {backgroundImage && (
        <img src={previewBackgroundImageURL} className="background-image" />
      )}
      {isUpdatingBackgroundImage && <BiLoaderCircle className="loading" />}
      {!backgroundImage && self && (
        <label htmlFor="change-backgroundImage">
          <TbPhoto className="user-backgroundImage-icon" />
        </label>
      )}
      {backgroundImage && (
        <>
          <BsCheck
            className="check-change-backgroundImage-icon"
            onClick={handleChangeBackgroundImage}
          />
          <BsX
            className="cancel-change-backgroundImage-icon"
            onClick={() => {
              setBackgroundImage("");
              myRef.current.value = "";
            }}
          />
        </>
      )}
      <input
        ref={myRef}
        type="file"
        id="change-backgroundImage"
        style={{ display: "none" }}
        onChange={(e) => {
          e.preventDefault();
          setBackgroundImage(e.target.files[0]);
        }}
      />
    </>
  );
};

export default Background;
