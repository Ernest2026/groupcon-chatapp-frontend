import { useLazyQuery, useSubscription } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMessages } from "../graphql/query";
import { msgSubscription } from "../graphql/subscription";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [msgCount, setMsgCount] = useState({});

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    GetMessages();
  }, [msgCount]);

  const { groupId } = useParams();

  const scrollBot = (x) => {
    document.getElementById("msg-div").scrollTo(0, x);
  };

  const [GetMessages, { data: d1, loading: l1, error: e1 }] = useLazyQuery(
    getMessages,
    {
      variables: { ...msgCount, groupId: groupId },
      onCompleted(data) {
        const scrHeight = document.getElementById("msg-div").scrollHeight;
        setMessages((msg) => [...data.getMessages, ...msg]);
        scrollBot(document.getElementById("msg-div").scrollHeight - scrHeight);
      },
    }
  );

  useSubscription(msgSubscription, {
    onSubscriptionData({ subscriptionData: { data } }) {
      setMessages((msg) => [...msg, data.messageAdded]);
      scrollBot(document.getElementById("msg-div").scrollHeight);
    },
  });

  if (e1) console.log(e1.message);

  const handleClick = () => {
    setMsgCount({ skip: messages.length });
  };

  const handlePlay = (e) => {
    const audioPlayed = document.getElementById(e.target.id);
    const transcript = messages.find((arr) => arr.id === +e.target.id);
    if (transcript.audioTime) {
      const words = transcript.audioTime;
      audioPlayed.addEventListener("timeupdate", (e) => {
        words.map((obj) => {
          if (
            obj.start < audioPlayed.currentTime &&
            audioPlayed.currentTime < obj.end
          ) {
            const highlight = transcript.audioTrans.replace(
              new RegExp(`(?:.*?${obj.word}){${obj.occurrence}}`, "is"),
              function (x) {
                return x.replace(
                  RegExp(`${obj.word}$`, "is"),
                  `<span class="bg-warning">${obj.word}</span>`
                );
              }
            );
            document.getElementById(`trans-${e.target.id}`).innerHTML =
              highlight;
          }
          return;
        });
      });
    }
  };

  return (
    <>
      {messages.length >= 1 && (
        <div className="d-flex justify-content-center w-100">
          <button className="btn btn-sm btn-primary" onClick={handleClick}>
            Refresh{" "}
            {l1 && <span className="spinner-border spinner-border-sm"></span>}
          </button>
        </div>
      )}
      {messages.map((msg) => {
        return (
          <div
            className={`d-flex msg ${
              msg.senderId === +localStorage.userId
                ? "justify-content-end"
                : "justify-content-start"
            } w-100% mt-3`}
            key={msg.id}
          >
            <div className="float-end bg-primary p-2 rounded msg-box">
              <h6 className="text-light">
                {msg.anonymous
                  ? "Anonymous☣"
                  : msg.sender.fullname
                  ? msg.sender.fullname
                  : msg.sender.nickname}
              </h6>
              {msg.text ? (
                <p className="text-light">{msg.text}</p>
              ) : (
                <>
                  <audio
                    src={`https://groupconbackend.herokuapp.com${msg.audio}`}
                    controls={true}
                    id={msg.id}
                    onPlay={handlePlay}
                    className="mt-2 mb-1 audio-rec"
                    style={{ display: "block" }}
                  ></audio>
                  {msg.audioTrans && (
                    <span className="trans">
                      <small
                        className="block text-light"
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                        onClick={(e) => {
                          document
                            .getElementById(`trans-${msg.id}`)
                            .classList.toggle("rec-hide");
                          document
                            .getElementById(`trans-${msg.id}`)
                            .classList.contains("rec-hide")
                            ? (e.target.innerText = "Show translation")
                            : (e.target.innerText = "Hide translation");
                        }}
                      >
                        Show translation
                      </small>
                      <p
                        className={`text-light trans-text rec-hide`}
                        id={`trans-${msg.id}`}
                      >
                        {msg.audioTrans}
                      </p>
                    </span>
                  )}
                </>
              )}
              <small className="float-end text-blue-a">
                {months[new Date(msg.createdAt).getUTCMonth()] +
                  " " +
                  new Date(msg.createdAt).getUTCDate() +
                  ", " +
                  new Date(msg.createdAt).toLocaleTimeString()}
              </small>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Messages;
