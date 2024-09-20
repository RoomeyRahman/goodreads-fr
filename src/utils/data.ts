import { IHeaderNavItems, IPersonalInfoItems } from "./type";
import groupMessage from "/public/assets/icn_nav_discussions.svg";
import message from "/public/assets/icn_nav_msgs.svg";
import friends from "/public/assets/icn_nav_friend.svg";

export const headerNavItems: IHeaderNavItems[] = [
  {
    id: 1,
    name: "home",
    path: "/",
  },

  {
    id: 2,
    name: "my books",
    path: "/my-books",
  },

  {
    id: 3,
    name: "browse",
    path: "/browse",
  },

  {
    id: 4,
    name: "community",
    path: "/community",
  },
];

export const personalInfoItems: IPersonalInfoItems[] = [
  {
    id: 1,
    img: groupMessage,
    name: "group-message",
    path: "/group-message",
  },
  {
    id: 2,
    img: message,
    name: "message",
    path: "/message",
  },
  {
    id: 3,
    img: friends,
    name: "friends",
    path: "/friends",
  },
];
