const redirect = () => {
  if (localStorage.groupId && localStorage.groupId !== "null") {
    window.location.href = `/chatroom/${localStorage.groupId}`;
  } else if (localStorage.verified) {
    window.location.href = "/group";
  }
};

// const httplink = "https://groupconbackend.herokuapp.com";
// If on development use link like: http://localhost:4000

// const wslink = "wss:groupconbackend.herokuapp.com";
// If on development use link like: ws:localhost:4000

const httplink = "http://localhost:4000";

const wslink = "ws:localhost:4000";

export { redirect, httplink, wslink };
