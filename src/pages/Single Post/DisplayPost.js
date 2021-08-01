import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { API, API_IMG } from "../../api/backendApi";
import AuthContext from "../../context/AuthContext";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import "./displayPost.css";
const DisplayPost = ({ match, history }) => {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userData } = useContext(AuthContext);
  console.log("SINGLE POST - ", post);
  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      const res = await axios.get(`${API}/blog/${match.params.postId}`);
      setLoading(false);
      setPost(res.data.blog);
      console.log("AXIO", res);

      setTitle(res.data.blog.title);
      setDesc(res.data.blog.desc);
    };
    getPost();
  }, [match.params.postId]);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`${API}/blog/delete/${post._id}`, {
        data: { userEmail: userData.email }
      });
      setLoading(false);

      history.push("/");
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  const handleUpdate = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      console.log("Inside");
      setLoading(true);
      await axios.put(
        `${API}/blog/update/${post._id}`,
        {
          user: userData._id,
          title,
          desc
        },
        config
      );
      setLoading(false);
      setUpdateMode(false);
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  let imageUrl = post.photo
    ? post.photo
    : "https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg";

  const displayPostContent = () => {
    return (
      <div className="singlePost">
        <div className="singlePostWrapper">
          <img className="postImg" src={imageUrl} alt="" />

          {updateMode ? (
            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="singlePostTitle">
              {title}

              {
                (post.user === undefined 
                  ? "" 
                  : post.user.email) === userData.email && (
                <div className="singlePostEdit">
                  <FaEdit
                    className="singlePostIcon far fa-edit"
                    onClick={() => setUpdateMode(true)}
                  />
                  <MdDelete className="singlePostIcon far fa-trash-alt" onClick={handleDelete} />
                </div>
              )}
            </h1>
          )}
          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author:
              <Link
                to={`/?user=${post.user === undefined ? "" : post.user._id}`}
                className="link_query"
              >
                <b>{post.user === undefined ? "" : post.user.email}</b>
              </Link>
            </span>
            <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
          </div>
          {updateMode ? (
            <textarea
              className="singlePostDescInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          ) : (
            <p className="singlePostDesc">{desc}</p>
          )}
          {updateMode && (
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        displayPostContent()
      )}
    </>
  );
};

export default DisplayPost;
