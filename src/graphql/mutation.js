import { gql } from "@apollo/client";

export const signupUser = gql`
  mutation SignupUser($newUser: newUser!) {
    signupUser(newUser: $newUser) {
      fullname
      email
      id
    }
  }
`;

export const signinUser = gql`
  mutation SigninUser($confirmUser: confirmUser) {
    signinUser(confirmUser: $confirmUser) {
      token
      verified
      groupId
      userId
    }
  }
`;

export const createGroup = gql`
  mutation CreateGroup($newGroup: newGroup!) {
    createGroup(newGroup: $newGroup) {
      id
      name
      adminId
    }
  }
`;

export const joinGroup = gql`
  mutation JoinGroup($groupInput: groupInput!) {
    joinGroup(groupInput: $groupInput) {
      token
      status
      groupId
      userId
    }
  }
`;

export const editProfile = gql`
  mutation EditProfile($profileInput: profileInput!) {
    editProfile(profileInput: $profileInput) {
      userId
      bio
      phone
      image
    }
  }
`;

export const sendMessage = gql`
  mutation SendMessage($messageInput: messageInput!) {
    sendMessage(messageInput: $messageInput) {
      id
      text
      senderId
      audio
      audioTrans
      audioTime {
        word
        start
        end
        occurrence
      }
      recieverId
      sender {
        fullname
        nickname
      }
      createdAt
      anonymous
    }
  }
`;

export const leaveGroup = gql`
  mutation LeaveGroup($groupId: String!) {
    leaveGroup(groupId: $groupId) {
      message
      admin
    }
  }
`;
