import React, { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { TiPencil, TiTrash } from "react-icons/ti";
import { FiAlertCircle } from "react-icons/fi";
import { usePost } from "../hooks/usePost";
import "./editPost.css";

const EditPost = ({ postId }) => {
  const { deletePost } = usePost();
  const [showList, setShowList] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);

  const handleShowList = () => {
    setShowList(!showList);
  };
  const handleDelete = () => {
    setCheckDelete(!checkDelete);
    setShowList(false);
  };
  const handleCheckDelete = async () => {
    await deletePost({ postId });
    setCheckDelete(!checkDelete);
  };

  return (
    <>
      <BiDotsHorizontalRounded className="edit-icon" onClick={handleShowList} />
      {showList && (
        <div className="edit-menu">
          <div className="edit-list">
            <TiPencil />
            <span>編輯貼文</span>
          </div>
          <div className="edit-list" onClick={handleDelete}>
            <TiTrash />
            <span>刪除貼文</span>
          </div>
        </div>
      )}
      {checkDelete && (
        <div className="black-background">
          <div className="alert-box">
            <FiAlertCircle className="alert-icon" />
            <div>確定要刪除此貼文嗎？</div>
            <div className="alert-button">
              <div className="check" onClick={handleCheckDelete}>
                刪除
              </div>
              <div className="cancel" onClick={handleDelete}>
                取消
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPost;
