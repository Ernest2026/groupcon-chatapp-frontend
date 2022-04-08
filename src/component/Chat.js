import { useMutation, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGroup, getUsers } from "../graphql/query";
import { sendMessage, leaveGroup } from "../graphql/mutation";
import { userleftSub, userSubscription } from "../graphql/subscription";
import Messages from "./Messages";
import { Apartment, Send, Users, Menu } from "./Svgs";
import { redirect } from "../middleware/build";
import Record from "./Record";
import Profile from "./Profile";

// ********************************************************************************************************

const Chat = (props) => {
  const [users, setUsers] = useState([]);
  const [sendmsgInputs, setSendmsgInputs] = useState({});
  const [active, setActive] = useState(false);
  const [profiletoView, setProfiletoView] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [blobLink, setBlobLink] = useState({});
  const [notification, setNotification] = useState({});
  const [anonymous, setAnonymous] = useState(false);

  useEffect(() => {
    anonymous
      ? document.getElementById("rec-start").classList.add("hide")
      : document.getElementById("rec-start").classList.remove("hide");
  }, [anonymous]);

  const callbackFunction = (data) => {
    setBlobLink({ data });
  };

  const hide = (data) => {
    setShowProfile(data);
  };

  const { groupId } = useParams();

  document.addEventListener("click", (e) => {
    if (
      e.target === document.getElementById("msgbox") ||
      document.getElementById("msgbox").contains(e.target)
    )
      setActive(false);
  });

  const { error: e2 } = useQuery(getUsers, {
    variables: { groupId: groupId },
    onCompleted(data) {
      setUsers([...data.getUsers]);
    },
  });

  const { data: d4 } = useQuery(getGroup, {
    variables: { groupId: groupId },
  });

  const [SendMessage] = useMutation(sendMessage);

  const [LeaveGroup, { error: e3 }] = useMutation(leaveGroup, {
    variables: { groupId: groupId },
    onCompleted() {
      if (!localStorage.verified) {
        localStorage.clear();
        window.location.href = "/group";
      } else {
        localStorage.removeItem("groupId");
        redirect();
      }
    },
  });

  useSubscription(userSubscription, {
    onSubscriptionData({ subscriptionData: { data } }) {
      setUsers((msg) => [...msg, data.userJoined]);
      setNotification({ ...data.userJoined, status: true });
      setTimeout(() => {
        setNotification({});
      }, 3000);
    },
  });

  useSubscription(userleftSub, {
    onSubscriptionData({ subscriptionData: { data } }) {
      const index = users.indexOf(
        users.find((obj) => obj.id === data.userLeft.id.toString())
      );
      index !== -1 && users.splice(index, 1);
      setNotification({ ...data.userLeft, status: false });
      setTimeout(() => {
        setNotification({});
      }, 3000);
    },
  });

  if (e2) console.log(e2.message);
  if (e3) console.log(e3.message);

  const handleClick = (e) => {
    if (e.target.dataset.list === "users") {
      setActive(true);
      showProfile && setShowProfile(false);
    }
    e.target.dataset.list === "group" && LeaveGroup();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSendmsgInputs((values) => ({ ...values, [name]: value }));
    value.trim().length >= 1
      ? document.getElementById("rec-start").classList.add("rec-hide")
      : document.getElementById("rec-start").classList.remove("rec-hide");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let blobFile;
    if (blobLink.data) {
      blobFile = new File([blobLink.data.blob], "test.wav", {
        lastModified: new Date().getTime(),
        type: blobLink.data.type,
      });
    }
    await SendMessage({
      variables: {
        messageInput: {
          ...sendmsgInputs,
          recieverId: groupId,
          blobFile,
          anonymous,
        },
      },
    });
    setSendmsgInputs({});
    setBlobLink({});
    document.getElementById("rec-clear").classList.add("rec-hide");
    document.getElementById("rec-div").innerHTML = "";
    document.getElementById("msg-input").classList.remove("vsb-hdn");
    document.getElementById("rec-start").classList.remove("rec-hide");
    document.querySelector(".audio-react-recorder__canvas").style.display =
      "none";
    document.getElementById("rec-div").style.display = "none";
  };

  return (
    <>
      <div
        className="navbar text-white py-4"
        style={{
          padding: "0",
          height: "13vh",
        }}
      >
        <div className="nav-brand">
          <img src="/images/Logo.png" alt="Groupcon Logo" />
        </div>
        <ul className="nav align-items-md-center">
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle text-light"
              data-bs-toggle="dropdown"
              to="#"
              style={{ padding: "5px" }}
            >
              <Menu />
            </Link>
            <ul className="dropdown-menu dropdown-menu-end">
              <li
                className="dropdown-item"
                onClick={() => {
                  setProfiletoView(
                    users.find((user) => user.id === localStorage.userId)
                  );
                  setShowProfile(true);
                }}
              >
                View Profile
              </li>
              <li className="dropdown-item">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="mySwitch"
                    name="darkmode"
                    onChange={(e) =>
                      anonymous ? setAnonymous(false) : setAnonymous(true)
                    }
                  />
                  <label className="form-check-label" htmlFor="mySwitch">
                    Anonymous
                  </label>
                </div>
              </li>
              {
                <li
                  className="d-block d-sm-none dropdown-item"
                  onClick={handleClick}
                  data-list="users"
                >
                  Users
                </li>
              }
              <li
                className="dropdown-item"
                onClick={handleClick}
                data-list="group"
              >
                {d4 &&
                  d4.getGroup.adminId === +localStorage.userId &&
                  "Close group"}
                {d4 &&
                  d4.getGroup.adminId !== +localStorage.userId &&
                  "Leave group"}
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="row" style={{ height: "87vh" }}>
        {/* ***************************** Side bar *********************************** */}

        <div
          className={`${active ? "slideout" : "slidein"} navbar-sm-collapse ${
            showProfile && "d-none d-lg-block"
          } col-md-4 col-lg-3 bg-blue-b p-3`}
          style={{ height: "100%", overflowY: "scroll", zIndex: 9 }}
        >
          <h4>
            <Apartment />
            Room Name
          </h4>
          <div className="bg-primary">
            <h5 className="px-3 py-2 text-light">
              {d4 && d4.getGroup.name}
              <br />
              <small>
                <b>ID: </b>
                {d4 && d4.getGroup.id}
              </small>
            </h5>
          </div>
          <h4>
            <Users />
            Users
          </h4>
          <div>
            {users &&
              users.map((data) => {
                return (
                  <h5
                    key={data.id}
                    className={`text-white ${data.verified && "user"}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (data.verified) {
                        setProfiletoView(data);
                        setShowProfile(true);
                        setActive(false);
                      }
                    }}
                  >
                    {data.fullname || data.nickname} {data.verified ? "✅" : ""}
                  </h5>
                );
              })}
          </div>
        </div>
        {/* ********************************* Chat messages ****************************** */}
        <div
          className={`${!active && "col"} ${
            showProfile ? "d-none d-md-flex col-lg-6" : "col-lg-9"
          } col-md-8 col-md-8 bg-blue-a d-flex flex-column`}
          id="msgbox"
          style={{
            height: "87vh",
            overflowY: "scroll",
            padding: 0,
            position: "relative",
          }}
        >
          <div
            className="p-3"
            style={{
              height: "74vh",
              position: "absolute",
              top: 0,
              overflowY: "scroll",
            }}
            id="msg-div"
          >
            {Object.keys(notification).length !== 0 && (
              <div
                className="alert bg-primary text-light alert-dismissible"
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "50%",
                  zIndex: 9,
                  transform: "translateX(-50%)",
                }}
              >
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                ></button>
                <strong>
                  {notification.fullname || notification.nickname}
                </strong>
                {notification.status
                  ? " joined the group."
                  : " left the group."}
              </div>
            )}

            <Messages />
          </div>

          {/* ************************** Footer text input ******************************* */}
          <div
            className=" bg-blue-c p-3"
            style={{
              height: "13vh",
              position: "absolute",
              bottom: 0,
              width: "100%",
              display: "grid",
              alignItems: "center",
            }}
          >
            <form>
              <div
                className="input-group"
                style={{ position: "relative", height: "45px" }}
              >
                <Record parentCallback={callbackFunction} />
                <input
                  type="text"
                  className="form-control p-2 align-middle message-input"
                  id="msg-input"
                  placeholder="Send message"
                  name="text"
                  value={sendmsgInputs.text || ""}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-primary d-flex align-items-center justify-content-center message-button"
                  style={{ borderRadius: 0 }}
                  onClick={handleSubmit}
                >
                  <Send />
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* **************************** Profile ******************************** */}
        <Profile user={profiletoView} show={showProfile} hide={hide} />
      </div>
    </>
  );
};

export default Chat;
