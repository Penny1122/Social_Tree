import React, { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsImages } from "react-icons/bs";
import { TiPencil, TiTrash } from "react-icons/ti";
import { FiAlertCircle } from "react-icons/fi";
import { usePost } from "../hooks/usePost";
import "./editPost.css";

const EditPost = ({ postId, note, author, image }) => {
  const { editPost, deletePost } = usePost();
  const [showList, setShowList] = useState(false);
  const [checkDelete, setCheckDelete] = useState(false);
  const [checkEdit, setCheckEdit] = useState(false);
  const [newNote, setNewNote] = useState(note);
  const [newFile, setNewFile] = useState(null);

  const previewURL = newFile ? URL.createObjectURL(newFile) : "";

  const handleShowList = () => {
    setShowList(!showList);
  };
  const handleDelete = () => {
    setCheckDelete(!checkDelete);
    setShowList(false);
  };
  const handleEdit = () => {
    setCheckEdit(!checkEdit);
    setShowList(false);
    setNewFile(null);
  };
  const handleCheckDelete = async () => {
    await deletePost({ postId });
    setCheckDelete(!checkDelete);
  };
  const handleCheckEdit = async (e) => {
    const metaData = {
      contentType: newFile.type,
    };
    await editPost({ newNote, newFile, postId, metaData });
    setCheckEdit(!checkEdit);
    setNewFile(null);
  };

  return (
    <>
      <BiDotsHorizontalRounded className="edit-icon" onClick={handleShowList} />
      {showList && (
        <div className="edit-menu">
          <div className="edit-list" onClick={handleEdit}>
            <TiPencil />
            <span>編輯貼文</span>
          </div>
          <div className="edit-list" onClick={handleDelete}>
            <TiTrash />
            <span>刪除貼文</span>
          </div>
        </div>
      )}
      {checkEdit && (
        <div className="black-background">
          <div className="edit-alert-box">
            <div>編輯貼文</div>
            <hr />
            <div className="poster-box">
              <img className="poster-photo" src={author.photo} alt="" />
              <span className="poster-name">{author.displayName}</span>
            </div>
            <div className="edit-content">
              <textarea
                wrap="hard"
                type="text"
                placeholder="write something"
                onChange={(e) => setNewNote(e.target.value)}
                value={newNote}
                required
              />
              {!newFile && <img src={image} className="edit-image" />}
              {newFile && <img src={previewURL} className="edit-image" />}
            </div>
            <div className="post-bottom-images new-image">
              <label htmlFor="add-new-image">
                <BsImages className="BsImages" />
                <span>變更圖片</span>
              </label>
              <input
                type="file"
                id="add-new-image"
                style={{ display: "none" }}
                onChange={(e) => setNewFile(e.target.files[0])}
              />
            </div>
            <div className="alert-button">
              <div className="check" onClick={handleCheckEdit}>
                儲存
              </div>
              <div className="cancel" onClick={handleEdit}>
                取消
              </div>
            </div>
          </div>
        </div>
      )}
      {checkDelete && (
        <div className="black-background">
          <div className="delete-alert-box">
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
