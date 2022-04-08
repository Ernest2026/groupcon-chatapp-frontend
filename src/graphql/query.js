import { gql } from "@apollo/client";

export const getMessages = gql`
  query GetMessages($groupId: String!, $skip: Int) {
    getMessages(groupId: $groupId, skip: $skip) {
      id
      text
      senderId
      sender {
        fullname
        nickname
      }
      recieverId
      createdAt
      audio
      audioTrans
      audioTime {
        word
        start
        end
        occurrence
      }
      anonymous
    }
  }
`;

export const getUsers = gql`
  query GetUsers($groupId: String!) {
    getUsers(groupId: $groupId) {
      fullname
      email
      nickname
      id
      verified
    }
  }
`;

export const getGroup = gql`
  query GetGroup($groupId: String!) {
    getGroup(groupId: $groupId) {
      id
      name
      adminId
    }
  }
`;

export const getProfile = gql`
  query GetProfile($profileId: Int!) {
    getProfile(profileId: $profileId) {
      userId
      bio
      phone
      image
    }
  }
`;
