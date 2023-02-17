import React, { useRef, useState } from "react";
import { useAuthStatus } from "../../../hooks/useAuthStatus";
import { useProfile } from "../../../hooks/useProfile";
import { TbPhoto } from "react-icons/tb";
import { TiPencil } from "react-icons/ti";
import { BsCheck, BsX } from "react-icons/bs";
import FriendProfile from "./friendProfile";

const User = ({ self }) => {
  const myRef = useRef();
  const { updateDisplayName, updatePhotoURL } = useProfile();
  const { user } = useAuthStatus();
  const [editNameStatus, setEditNameStatus] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState(user.displayName);
  const [editPhotoStatus, setEditPhotoStatus] = useState(false);
  const [previewUserPhoto, setPreviewUserPhoto] = useState("");

  const previewPhotoURL = previewUserPhoto
    ? URL.createObjectURL(previewUserPhoto)
    : "";

  const handleEditDisplayName = () => {
    updateDisplayName({ userDisplayName });
    setEditNameStatus(false);
  };

  const handleUpdatePhoto = async () => {
    const metaData = {
      contentType: previewUserPhoto.type,
    };
    await updatePhotoURL({ previewUserPhoto, metaData });
    setPreviewUserPhoto("");
  };

  return (
    <>
      {self && (
        <li className="user">
          {!previewUserPhoto && (
            <img className="user-photo" src={user.photoURL} alt="" />
          )}

          {previewUserPhoto && (
            <img className="user-photo" src={previewPhotoURL} alt="" />
          )}
          {!previewUserPhoto && (
            <label htmlFor="change-user-photo">
              <TbPhoto
                className="user-photo-change-icon"
                onClick={() => setEditPhotoStatus(true)}
              />
            </label>
          )}
          <input
            ref={myRef}
            type="file"
            id="change-user-photo"
            style={{ display: "none" }}
            onChange={(e) => {
              e.preventDefault();
              setPreviewUserPhoto(e.target.files[0]);
            }}
          />
          {previewUserPhoto && (
            <>
              <BsCheck
                className="check-edit-photo"
                onClick={handleUpdatePhoto}
              />
              <BsX
                className="cancel-edit-photo"
                onClick={() => {
                  setPreviewUserPhoto(false), (myRef.current.value = "");
                }}
              />
            </>
          )}
          {!editNameStatus && (
            <span className="user-name">{user.displayName}</span>
          )}
          {editNameStatus && (
            <input
              value={userDisplayName}
              className="edit-name-input"
              type="text"
              autoFocus
              onChange={(e) => setUserDisplayName(e.target.value)}
            />
          )}
          {!editNameStatus && (
            <TiPencil
              className="pencil"
              onClick={() => setEditNameStatus(true)}
            />
          )}

          {editNameStatus && (
            <>
              <BsCheck className="pencil" onClick={handleEditDisplayName} />
              <BsX
                className="cancel-edit-name"
                onClick={() => {
                  setUserDisplayName(user.displayName),
                    setEditNameStatus(false);
                }}
              />
            </>
          )}
        </li>
      )}
      {!self && <FriendProfile />}
    </>
  );
};

export default User;
