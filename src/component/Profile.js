import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { editProfile } from "../graphql/mutation";
import { getProfile } from "../graphql/query";
import { Arrowleft } from "./Svgs";

const Profile = ({ user, show, hide }) => {
  const [userProfile, setUserProfile] = useState({});
  const [edit, setEdit] = useState(false);
  const [profileInput, setProfileInput] = useState({});

  useEffect(() => {
    if (show && user.id !== userProfile.id) {
      setUserProfile({ ...user });
      GetProfile({ variables: { profileId: +user.id } });
    }
  }, [show, user]);

  const [GetProfile] = useLazyQuery(getProfile, {
    onCompleted(data) {
      setUserProfile((profile) => {
        return { ...profile, ...data.getProfile };
      });
    },
  });

  const [EditProfile] = useMutation(editProfile, {
    onCompleted(data) {
      setEdit(false);
      setUserProfile((msg) => {
        return { ...msg, ...data.editProfile };
      });
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (edit) {
      EditProfile({ variables: { profileInput } });
    } else {
      setEdit(true);
      setProfileInput({
        bio: userProfile.bio,
        phone: userProfile.phone,
      });
    }
  };
  const handleInputChange = () => {
    EditProfile({
      variables: {
        profileInput: { image: document.getElementById("imageFile").files[0] },
      },
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProfileInput((values) => ({ ...values, [name]: value }));
  };
  const inputStyle = { display: "block", textAlign: "left" };

  return (
    <>
      <div
        className={`${show ? "col-md-4 col-lg-3" : "rec-hide"} bg-blue-b p-3`}
        style={{ overflowY: "scroll", height: "87vh", position: "relative" }}
      >
        <span
          className="bg-blue-a p-1"
          style={{
            position: "absolute",
            zIndex: "9",
          }}
          onClick={() => {
            hide(false);
            setEdit(false);
          }}
        >
          <Arrowleft />
        </span>
        <div className="text-center text-white">
          <form>
            <div
              style={{
                marginTop: "1rem",
                position: "relative",
                width: "100px",
                height: "100px",
                margin: "1rem auto",
              }}
            >
              <img
                className="card-img-top bg-blue-c"
                width="100%"
                height="100%"
                alt="Profile pics"
                style={{ borderRadius: "50%", border: "5px solid #2d31fa" }}
                src={
                  userProfile && userProfile.image
                    ? `https://groupconbackend.herokuapp.com${userProfile.image}`
                    : "/images/avatar.jpg"
                }
              />
              {userProfile.id === localStorage.userId && (
                <>
                  <label
                    htmlFor="imageFile"
                    style={{ position: "absolute", bottom: "0", left: "55%" }}
                  >
                    <img
                      width="30"
                      src="/images/camera.png"
                      alt="Add img icon"
                    />
                  </label>
                  <input
                    type="file"
                    className="rec-hide"
                    id="imageFile"
                    onChange={handleInputChange}
                  />
                </>
              )}
            </div>

            <div className="card-body p-0">
              <h4 className="card-title ">{userProfile.fullname}</h4>
              <h6>{userProfile.email}</h6>
              {edit ? (
                <>
                  <div className="mb-3">
                    <label htmlFor="phone" style={inputStyle}>
                      <b>Phone:</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add phone"
                      name="phone"
                      id="phone"
                      value={profileInput.phone || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="bio" style={inputStyle}>
                      <b>Bio:</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add Bio"
                      name="bio"
                      id="bio"
                      value={profileInput.bio || ""}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <small>
                      <b>Phone no</b>
                    </small>
                    <p className="m-0">
                      {userProfile && userProfile.phone
                        ? userProfile.phone
                        : "Add phone"}
                    </p>
                  </div>
                  <div>
                    <small>
                      <b>About Me</b>
                    </small>
                    <p className="m-0">
                      {userProfile && userProfile.bio
                        ? userProfile.bio
                        : "Add bio..."}
                    </p>
                  </div>
                </>
              )}
              {userProfile.id === localStorage.userId && (
                <button
                  className="btn btn-primary mt-3"
                  type="submit"
                  onClick={handleClick}
                >
                  {edit ? "Save profile" : "Edit profile"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
