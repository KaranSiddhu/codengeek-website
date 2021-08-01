import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./ProfilePage.css";
import Toast from "../../components/toast/Toast";
import { showToast } from "../../components/toast/helper/toastHelper";
import { API } from "../../api/backendApi";
import { TiTick } from "react-icons/ti";
import { GrFormClose } from "react-icons/gr";
import Modal from "react-modal";
import { BsPlusCircle } from "react-icons/bs";

// import { Link } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const ProfilePage = ({ history }) => {
  // const [error, setError] = useState("");
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerifyEmailModalOpen, setIsVerifyEmailModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  // const [title, setTitle] = useState("");
  // const [desc, setDesc] = useState("");
  // const [file, setFile] = useState(new FormData());

  const [values, setValues] = useState({
    title:"",
    desc:"",
    file:new FormData()
  });

  const { title, desc, file } = values;

  const [list, setList] = useState([]);
  let toastProperties = null;

  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  console.log("USER DATA 🔥- ", typeof userData.fullName);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleOnCheckboxClick = () => {
    setIsChecked(!isChecked);
    setShowPassword(!showPassword);
    setShowConfirmPassword(!showConfirmPassword);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/user`);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      console.log("DATA", data.user);
      setUserData(data.user);
    } catch (ere) {
      console.log("ERROR", ere);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSignOut = async () => {
    try {
      console.log("SIGN OUT");
      const { data } = await axios.get(`${API}/auth/signout`);
      console.log("DATa", data);
      await getLoggedIn();
    } catch (err) {
      console.log("SIGN OUT ERROR🔥 - ", err);
    }

    history.push("/login");
  };

  const handleVerifyEmail = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const { data } = await axios.post(
        `${API}/auth/email/verify`,
        { email: userData.email },
        config
      );
      console.log("EMAIl - ", data);

      if (data.success) {
        toastProperties = showToast("success", data.message);

        return setList([...list, toastProperties]);
      }
    } catch (err) {
      toastProperties = showToast("error", "Something went wrong please try again");
      setList([...list, toastProperties]);
    }
  };

  const createBlogPostHandler = () => {
    userData.isEmailVerified ? setIsBlogModalOpen(true) : setIsVerifyEmailModalOpen(true);
  };

  const leftSection = () => {
    return (
      <div className="user_navigation_con">
        <p className="heading_profile">
          {userData.role === 1 ? "Admin Navigation" : "User Navigation"}
        </p>
        <hr className="profile_page_seperator" />

        <ul className="navigation_list_group">
          <li className="navigation_list_group_item">
            <button className="btn btn-primary" onClick={() => setIsProfileModalOpen(true)}>
              Edit Profile
            </button>
          </li>

          <li className="navigation_list_group_item">
            <button className="btn btn-primary" onClick={createBlogPostHandler}>
              Create Blog
            </button>
          </li>

          <li className="navigation_list_group_item">
            <button className="btn btn-primary" onClick={() => setIsDeleteModalOpen(true)}>
              Delete Account
            </button>
          </li>

          <li className="navigation_list_group_item">
            <button onClick={handleSignOut} className="btn btn-primary">
              Sign out
            </button>
          </li>
        </ul>
      </div>
    );
  };

  const rightSection = () => {
    return (
      <>
        <p className="heading_profile">
          {userData.role === 1 ? "Admin Information" : "User Information"}
        </p>

        <hr className="profile_page_seperator" />

        <ul className="profile_list_group">
          <li className="profile_list_group_item">
            <span>Name: </span>
            {userData.fullName}
          </li>

          <li className="profile_list_group_item">
            <span>Email: </span>
            {userData.email}

            {userData.isEmailVerified ? (
              <>
                <TiTick />
                <button 
                  className="btn btn-primary" 
                  onClick={() => history.push(`/?user=${userData._id}`)}
                >
                  Manage your blogs
                </button>
              </>
            ) : (
              <ul className="verify_email_link_list">
                <li>
                  Email is not verified.&nbsp;
                  <button onClick={handleVerifyEmail} className="btn btn-primary">
                    Verify Email
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </>
    );
  };

  const profilePageContent = () => {
    return (
      <div className="grid_background">
        <div className="grid_container">
          <div className="grid_item">{leftSection()}</div>

          <div className="grid_item">{rightSection()}</div>
        </div>
      </div>
    );
  };

  const editProfileHandler = async (e) => {
    e.preventDefault();

    if (fullName.length < 5) {
      toastProperties = showToast("error", "Name is less than 5 characters");

      return setList([...list, toastProperties]);
    }

    if (password.length < 6) {
      toastProperties = showToast("error", "Password is less than 6 characters");

      return setList([...list, toastProperties]);
    }

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");

      toastProperties = showToast("error", "Passwords do not match");

      return setList([...list, toastProperties]);
    }

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    console.log("USER ID - ", userData._id);

    try {
      const { data } = await axios.put(
        `${API}/user/update/${userData._id}`,
        { fullName, email, password },
        config
      );
      console.log("UPDATED USER DATA", data);

      history.push("/");
    } catch (err) {
      toastProperties = showToast("error", err.response.data.message);
      console.log("ERROR - ", err);
      setList([...list, toastProperties]);
    }
  };

  const editProfileForm = () => {
    return (
      <form onSubmit={editProfileHandler} className="register-form">
        <h3 style={{ position: "absolute", left: "37%" }}>Edit Profile</h3>
        <div className="form-field">
          <label htmlFor="name">Full name:</label>
          <input
            name="name"
            required
            type="text"
            id="name"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            required
            type="email"
            value={email}
            id="email"
            placeholder="Enter Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            required
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Confirm Password:</label>
          <input
            name="password"
            required
            type={showConfirmPassword ? "text" : "password"}
            id="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
        </div>
        <div className="check">
          <input
            type="checkbox"
            id="check-box"
            checked={isChecked}
            onChange={handleOnCheckboxClick}
          />
          <label htmlFor="checkbox" id="show-pass" onClick={handleOnCheckboxClick}>
            Show password
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>

        <button onClick={() => setIsProfileModalOpen(false)} className="btn btn-primary">
          Close
        </button>
      </form>
    );
  };

  const handleDeleteAccount = async () => {
    console.log("Delete account successfully");
    try {
      const { data } = await axios.delete(`${API}/user/delete/${userData._id}`);
      console.log("UPDATED USER DATA", data);
      history.push("/");
      window.location.reload(false);
    } catch (err) {
      toastProperties = showToast("error", err.response.data.message);
      console.log("ERROR - ", err);
      setList([...list, toastProperties]);
    }
  };

  const handleBlogChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    file.set(name, value);
    setValues({ ...values, [name]: value });
  }

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    file.set("user", userData._id);

    try{

      const {data} = await axios.post(`${API}/blog`, file, {
        headers: {
          Accept: "application/json",
        }
      }) 

      console.log("DATA OF BLOG - ", data);
      history.push(`/post/${data.blog._id}`)

    }catch(err){
      console.log("Error in creating blog - ",err)
    }

    // fetch(`${API}/blog`,{
    //   method: "POST",
    //   headers: {
    //       Accept: "application/json",
    //   },
    //   body: file
    // })
    // .then(res => res.json())
    // .then(data => console.log("DATA AFTER POST ", data))
    // .catch(err => console.log("Error in creating Product - ",err));
   
  };

  const createBlogForm = () => {
    return (
      <form onSubmit={handleBlogSubmit} className="register-form">
        <h3 style={{ position: "absolute", left: "37%" }}>Create a blog</h3>

        <div style={{ marginTop: "35px", marginLeft: "15px" }}>
          <input 
            type="file" 
            id="fileInput" 
            onChange={handleBlogChange("photo")}
            />
        </div>

        <div className="form-field-blog">
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={handleBlogChange("title")}

          />
        </div>

        <div className="form-field-blog">
          <textarea
            placeholder="Your content..."
            type="text"
            // className="writeInput writeText"
            onChange={handleBlogChange("desc")}

          />
        </div>

        <button style={{ marginLeft: "10px" }} type="submit" className="btn btn-primary">
          Create
        </button>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => setIsBlogModalOpen(false)}
          className="btn btn-primary"
        >
          Close
        </button>
      </form>
    );
  };

  return (
    <div className="profile_page_container">
      <Toast toastList={list} autoDelete={true} dismissTime={3000} />
      {/* NOTE create blog modal */}
      <Modal
        isOpen={isBlogModalOpen}
        onRequestClose={() => setIsBlogModalOpen(false)}
        contentLabel="Create blog"
        style={customStyles}
      >
        {createBlogForm()}
      </Modal>

      {/* NOTE delete account modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Delete Account"
        style={customStyles}
      >
        <div className="delete_modal_content">
          <h3>Are you sure you want to delete your account?</h3>

          <div className="delete_modal_buttons">
            <button className="btn btn-primary" onClick={handleDeleteAccount}>
              Yes
            </button>

            <button className="btn btn-primary" onClick={() => setIsDeleteModalOpen(false)}>
              No
            </button>
          </div>
        </div>
      </Modal>

      {/* NOTE edit profile modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onRequestClose={() => setIsProfileModalOpen(false)}
        contentLabel="Edit Profile"
        style={customStyles}
      >
        {editProfileForm()}
      </Modal>

      {/* NOTE Verify email modal */}
      <Modal
        isOpen={isVerifyEmailModalOpen}
        onRequestClose={() => setIsVerifyEmailModalOpen(false)}
        contentLabel=""
        style={customStyles}
      >
        <h3 style={{ textAlign: "center" }}>
          You need to verify your email <br /> before creating a blog.
        </h3>
        <button
          style={{ marginLeft: "7px" }}
          className="btn btn-primary"
          onClick={() => setIsVerifyEmailModalOpen(false)}
        >
          Ok
        </button>
      </Modal>

      {loading ? (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        profilePageContent()
      )}
    </div>
  );
};

export default ProfilePage;
