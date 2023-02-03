import React, { useEffect } from "react";
import { useState } from "react";
import { useAuthStatus } from "../../../hooks/useAuthStatus";
import { useUpdateProfile } from "../../../hooks/useUpdateProfile";
import { TbPhoto } from "react-icons/tb";
import { TiPencil } from "react-icons/ti";
import { BsCheck, BsX } from "react-icons/bs";

const User = () => {
  const { updateDisplayName, updatePhotoURL, newPhoto } = useUpdateProfile();
  const { user } = useAuthStatus();
  const [editNameStatus, setEditNameStatus] = useState(false);
  const [editPhotoStatus, setEditPhotoStatus] = useState(false);
  const [userDisplayName, setUSerDisplayName] = useState(user.displayName);
  const [userPhoto, setUserPhoto] = useState(user.photoURL);
  const [previewUserPhoto, setPreviewUserPhoto] = useState("");

  // useEffect(() => {
  //   setUserPhoto(user.photoURL);
  // }, [user.photoURL]);

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
  };

  return (
    <li className="user">
      {!previewUserPhoto && (
        <img className="user-photo" src={userPhoto} alt="" />
      )}

      {previewUserPhoto && (
        <img className="user-photo" src={previewPhotoURL} alt="" />
      )}
      <label htmlFor="change-user-photo">
        <TbPhoto
          className="user-photo-change-icon"
          onClick={() => setEditPhotoStatus(true)}
        />
      </label>
      <input
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
          <BsCheck className="check-edit-photo" onClick={handleUpdatePhoto} />
          <BsX
            className="cancel-edit-photo"
            // onClick={() => setEditNameStatus(false)}
          />
        </>
      )}
      {!editNameStatus && <span className="user-name">{userDisplayName}</span>}
      {editNameStatus && (
        <input
          value={userDisplayName}
          className="edit-name-input"
          type="text"
          autoFocus
          onChange={(e) => setUSerDisplayName(e.target.value)}
        />
      )}
      {!editNameStatus && (
        <TiPencil className="pencil" onClick={() => setEditNameStatus(true)} />
      )}

      {editNameStatus && (
        <>
          <BsCheck className="pencil" onClick={handleEditDisplayName} />
          <BsX
            className="cancel-edit-name"
            onClick={() => setEditNameStatus(false)}
          />
        </>
      )}
    </li>
  );
};

export default User;
