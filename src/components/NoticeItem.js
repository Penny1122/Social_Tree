import React, { useState } from "react";
import { useTime } from "../hooks/useTime";
import { BsDot } from "react-icons/bs";
import { useUpdateNotice } from "../hooks/useGetNotice";
import { useNavigate } from "react-router-dom";

const NoticeItem = ({
  id,
  displayName,
  notice,
  photoURL,
  noticedAt,
  read,
  postId,
}) => {
  const { UpdateNotice } = useUpdateNotice();
  const { Time } = useTime();
  const navigate = useNavigate();
  const noticedDate = new Date(noticedAt.toDate().toString());

  const handleOnClick = async () => {
    await UpdateNotice({ id });
    if (postId) {
      navigate(`/post/${postId}`);
    }
  };

  return (
    <div className="notice-list-item" onClick={handleOnClick}>
      <img className="poster-photo" src={photoURL} alt="" />
      <ul>
        <li>
          <span className="name">{displayName}</span>
          <span className="notice-content">{notice}</span>
          <br />
          <span className="time">{Time(noticedDate)}</span>
        </li>
      </ul>
      {!read && <BsDot className="read" />}
    </div>
  );
};

export default NoticeItem;
