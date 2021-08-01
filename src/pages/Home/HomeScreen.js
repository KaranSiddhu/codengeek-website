import React, { useState, useEffect } from "react";
import axios from "axios";
import { API, QuotesAPI } from "../../api/backendApi";
// import AuthContext from "../../context/AuthContext";
import "./HomeScreen.css";
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router-dom";
// import Particle from "../../components/Particles";

const HomeScreen = ({ history }) => {
  const [quotes, setQuotes] = useState({});
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const { search } = useLocation();


  // const {  } = useContext(AuthContext);

  const getQuotes = async () => {
    try {
      // setLoading(true);

      const { data } = await axios.get(QuotesAPI, { withCredentials: false });

      // setTimeout(() => {
      //   setLoading(false);
      // }, 500);

      const random = Math.floor(Math.random() * data.length);
      setQuotes(data[random]);

      // console.log("QUOTES", data[random]);
    } catch (error) {
      console.log("ERROR - ", error.message);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      // console.log("LOCATION - ",search);
      try {
        setLoading(true);
        const { data } = await axios.get(`${API}/blogs/${search}`);
        // console.log("BLOG DATA ", data);
        setLoading(false);

        setBlogs(data);
      } catch (error) {
        console.log("ERROR", error);
      }
    };

    fetchBlogs();

    getQuotes();
  }, []);

  const quote = (text, author) => {
    return (
      <p id="quote">
        <strong>"{text}"</strong> <br></br>
        <span> - {author === null ? "Anonymous" : author}</span>
      </p>
    );
  };

  const showBlogs = () => {
    console.log("USE STATE", blogs);
    return (
      <div className="blogs__container">
        {blogs.length === 0 ? "" : <Posts posts={blogs.blogs} />}
      </div>
    );
  };

  const homePageContent = () => {
    return (
      <>
        {quote(quotes.text, quotes.author)}
        {showBlogs()}
        
      </>
    );
  };

  return (
    <div className="homescreen-container">
      {/* <Particle /> */}
      <div className="home-content">
        {loading ? (
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          homePageContent()
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
