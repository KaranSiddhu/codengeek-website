import checkIcon from "../../../assets/check.svg";
import errorIcon from "../../../assets/error.svg";
import infoIcon from "../../../assets/info.svg";
import warningIcon from "../../../assets/warning.svg";

export const showToast = (type, des) => {
  const id = Math.floor(Math.random() * 101 + 1);
  switch (type) {
    case "success":
      return{
        id,
        title: "Success",
        description: des,
        backgroundColor: "#5cb85c",
        icon: checkIcon
      };
      
    case "error":
      return {
        id,
        title: "Error",
        description: des,
        backgroundColor: "#d9534f",
        icon: errorIcon
      };
      
    case "info":
      return {
        id,
        title: "Info",
        description: des,
        backgroundColor: "#5bc0de",
        icon: infoIcon
      };
    case "warning":
      return {
        id,
        title: "Warning",
        description: des,
        backgroundColor: "#f0ad4e",
        icon: warningIcon
      };
      

    default:
      return [];
  }

  
};
