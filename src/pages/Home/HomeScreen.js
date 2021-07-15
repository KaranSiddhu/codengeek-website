import React, {  useState, useEffect } from "react";
import axios from "axios";
import { QuotesAPI } from "../../api/backendApi";
// import AuthContext from "../../context/AuthContext";
import "./HomeScreen.css";
// import Particle from "../../components/Particles";

const HomeScreen = ({ history }) => {
  const [quotes, setQuotes] = useState({});
  const [loading, setLoading] = useState(false);

  // const { loggedIn } = useContext(AuthContext);
  
  const getQuotes = async () => {
    try {
      setLoading(true);
      
      const { data } = await axios.get(QuotesAPI, { withCredentials: false });
      
      setTimeout(() => {
        setLoading(false);
      }, 500);

      const random = Math.floor(Math.random() * data.length);
      setQuotes(data[random]);

      // console.log("QUOTES", data[random]);
    } catch (error) {
      console.log("ERROR - ", error.message);
    }
  };

  useEffect(() => {
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

  const homePageContent = () => {
    return (
      <>
        {quote(quotes.text, quotes.author)}
      </>
    );
  }

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
        ) : homePageContent()}

      </div>
    </div>
  );
};

export default HomeScreen;
