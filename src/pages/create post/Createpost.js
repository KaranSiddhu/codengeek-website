import axios from "axios";
import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./CreatePost.css";

import { BsPlusCircle } from "react-icons/bs";

const Createpost = () => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const {  userData } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();

    

    // const newPost = {
    //   userEmail: userData.email,
    //   title,
    //   desc
    // };

    // if (file) {
    //   const data = new FormData();
    //   const filename = Date.now() + file.name;
    //   data.append("name", filename);
    //   data.append("file", file);
    //   newPost.photo = filename;
    //   try {
    //     await axios.post("/upload", data);
    //   } catch (err) {
    //     console.log("ERROR - ", err);
    //   }
    // }
    
    // try {
    //   const res = await axios.post("/posts", newPost);
    //   window.location.replace("/post/" + res.data._id);
    // } catch (err) {
    //   console.log("ERROR - ", err);
    // }
  };

  return (
    <div className="write">
      {file && <img className="writeImg" src={URL.createObjectURL(file)} alt="" />}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            {/* <i className="writeIcon fas fa-plus"></i> */}
            <BsPlusCircle className="writeIcon" />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button style={{width:"20%", marginLeft:"20%", marginBottom:"20px"}} className="btn btn-primary" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Createpost;
