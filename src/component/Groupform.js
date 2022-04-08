import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { createGroup, joinGroup } from "../graphql/mutation";
import { redirect } from "../middleware/build";

const Groupform = () => {
  const [flip, setFlip] = useState("");
  const [unflip, setUnflip] = useState("joingroup");
  const [newgroupInput, setNewgroupInput] = useState({});
  const [joingroupInput, setJoingroupInput] = useState({});

  const [CreateGroup, { loading: l1, error: e1, data: d1 }] = useMutation(
    createGroup,
    {
      variables: { newGroup: { ...newgroupInput } },
    }
  );

  const [JoinGroup, { loading: l2, error: e2, data: d2 }] = useMutation(
    joinGroup,
    {
      variables: {
        groupInput: { ...joingroupInput },
      },
    }
  );

  if (e1) console.log(e1);
  if (e2) console.log(e2);

  if (d2) {
    localStorage.setItem("groupId", d2.joinGroup.groupId);
    if (d2.joinGroup.status) {
      localStorage.setItem("userId", d2.joinGroup.userId);
      localStorage.setItem("token", d2.joinGroup.token);
    }
    redirect();
  }

  if (d1) {
    localStorage.setItem("groupId", d1.createGroup.id);
    redirect();
  }

  const handleClick = (e) => {
    setFlip(e.target.dataset.from);
    setUnflip(e.target.dataset.to);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (unflip === "creategroup")
      setNewgroupInput((values) => ({ ...values, [name]: value }));
    if (unflip === "joingroup")
      setJoingroupInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (unflip === "joingroup") JoinGroup();
    if (unflip === "creategroup") CreateGroup();
  };

  return (
    <div className="container d-flex flex-row mt-3 justify-content-center">
      <div
        className={`box border border-light shadow-lg p-3 p-md-5 mx-auto ${
          flip === "joingroup" && "flip"
        } ${unflip === "joingroup" && "unflip"}`}
      >
        <h2 className="text-center text-light">Join an existing group.</h2>
        <form action="/action_page.php" name="joingroup">
          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter group ID"
              name="groupId"
              value={joingroupInput.groupId || ""}
              onChange={handleChange}
            />
            <label htmlFor="groupId">Group ID</label>
          </div>
          <div className="form-floating mb-3 mt-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={joingroupInput.password || ""}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          {/* <p className="text-center text-light">Join with the group link</p> */}
          {!localStorage.verified && (
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                name="nickname"
                value={joingroupInput.nickname || ""}
                onChange={handleChange}
              />
              <label htmlFor="nickname">Username</label>
            </div>
          )}
          <button
            className="btn btn-light mt-2"
            // type="submit"
            style={{ width: "100%" }}
            onClick={handleSubmit}
          >
            {l2 && (
              <span className="spinner-border spinner-border-sm me-2"></span>
            )}
            Join Group Chat
          </button>
        </form>
        <div className="d-flex justify-content-between text-light mt-3">
          <hr style={{ margin: ".8rem 0", width: "45%" }} />
          <p>or</p>
          <hr style={{ margin: ".8rem 0", width: "45%" }} />
        </div>
        <button
          className="btn btn-light mt-2"
          type="submit"
          style={{ width: "100%" }}
          data-from="joingroup"
          data-to="creategroup"
          onClick={handleClick}
        >
          Create a new Group Chat
        </button>
      </div>

      <div
        className={`box border border-light shadow-lg p-3 p-md-5 mx-auto  ${
          flip === "creategroup" && "flip"
        } ${unflip === "creategroup" && "unflip"}`}
      >
        <h2 className="text-center text-light">Create a new Group</h2>
        <form action="/action_page.php" id="creategroup">
          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Group name"
              name="name"
              value={newgroupInput.name || ""}
              onChange={handleChange}
            />
            <label htmlFor="name">Group name</label>
          </div>
          <div className="form-floating mb-3 mt-3">
            <input
              type="password"
              className="form-control"
              placeholder="Group password"
              name="password"
              id="password"
              value={newgroupInput.password || ""}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            className="btn btn-light mt-2"
            type="submit"
            style={{ width: "100%" }}
            onClick={handleSubmit}
          >
            {l1 && (
              <span className="spinner-border spinner-border-sm me-2"></span>
            )}
            Create Group Chat
          </button>
        </form>
        <div className="d-flex justify-content-between text-light mt-3">
          <hr style={{ margin: ".8rem 0", width: "45%" }} />
          <p>or</p>
          <hr style={{ margin: ".8rem 0", width: "45%" }} />
        </div>
        <button
          className="btn btn-light mt-2"
          type="submit"
          style={{ width: "100%" }}
          data-from="creategroup"
          data-to="joingroup"
          onClick={handleClick}
        >
          Join existing Group chat
        </button>
      </div>
    </div>
  );
};

export default Groupform;
