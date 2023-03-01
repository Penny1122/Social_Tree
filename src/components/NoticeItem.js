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
  tag,
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
          {!tag && <span className="name">{displayName}</span>}
          {!tag && <span className="notice-content">{notice}</span>}
          {tag && (
            <span className="notice-content">
              您被 <span className="name">{displayName}</span>
              {notice}
            </span>
          )}
          <br />
          <span className="time">{Time(noticedDate)}</span>
        </li>
      </ul>
      {!read && <BsDot className="read" />}
    </div>
  );
};

export default NoticeItem;
