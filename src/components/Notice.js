import React from "react";
import { useGetNotice } from "../hooks/useGetNotice";
import NoticeItem from "./NoticeItem";

const Notice = () => {
  const { notice } = useGetNotice();

  return (
    <div className="notice-list">
      {notice.map((doc) => {
        const {
          id,
          displayName,
          notice,
          photoURL,
          uid,
          noticedAt,
          read,
          postId,
          tag,
        } = doc;
        return (
          <NoticeItem
            key={id}
            id={id}
            displayName={displayName}
            notice={notice}
            photoURL={photoURL}
            uid={uid}
            noticedAt={noticedAt}
            read={read}
            postId={postId}
            tag={tag}
          />
        );
      })}
    </div>
  );
};

export default Notice;
