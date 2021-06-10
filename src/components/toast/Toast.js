import React, { useState, useEffect } from "react";
import "./toast.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Toast = ({ toastList, autoDelete, dismissTime }) => {
  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList(toastList);
  }, [toastList, list]);

  //* Auto deleting
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, dismissTime);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete, dismissTime, list]);

  const deleteToast = (id) => {
    const listItemIndex = list.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    setList([...list]);
  };

  return (
    <>
      <div className="notification-container top-right">
        <TransitionGroup>
          {list.map((toast, i) => (
            <CSSTransition key={i} timeout={500} classNames="transition">
              <div
                key={i}
                style={{ backgroundColor: toast.backgroundColor }}
                className="notification toast top-right"
              >
                <button id="deleteBtn" onClick={() => deleteToast(toast.id)}>
                  X
                </button>
                <div className="notification-image">
                  <img src={toast.icon} alt="" />
                </div>
                <div>
                  <p className="notification-title">{toast.title}</p>
                  <p className="notification-message">{toast.description}</p>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </>
  );
};

export default Toast;
