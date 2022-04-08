import { gql } from "@apollo/client";

export const msgSubscription = gql`
  subscription Sender {
    messageAdded {
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

export const userSubscription = gql`
  subscription UserJoined {
    userJoined {
      fullname
      email
      nickname
      id
      verified
    }
  }
`;

export const userleftSub = gql`
  subscription UserLeft {
    userLeft {
      id
      groupId
      fullname
      nickname
    }
  }
`;
