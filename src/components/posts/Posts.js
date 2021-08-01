import React from "react";
import { Link } from "react-router-dom";
import { API_IMG } from "../../api/backendApi";

import "./posts.css";

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post, index) => {
  
        let imageUrl = post.photo
          ? post.photo
          : "https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg";

        {/* console.log(post); */}

        return (
          <div key={index} className="post">
            <img className="postImg" src={imageUrl} alt="" />
            <div className="postInfo">
              {/* <div className="postCats">
                {post.categories.map((c) => (
                  <span className="postCat">{c.name}</span>
                ))}
              </div> */}
              <Link to={`/post/${post._id}`} className="link">
                <span className="postTitle">{post.title}</span>
              </Link>
              <hr />
              <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDesc">{post.desc}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
