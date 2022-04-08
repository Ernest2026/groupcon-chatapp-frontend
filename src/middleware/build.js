export const redirect = () => {
  if (localStorage.groupId && localStorage.groupId !== "null") {
    window.location.href = `/chatroom/${localStorage.groupId}`;
  } else if (localStorage.verified) {
    window.location.href = "/group";
  }
};
