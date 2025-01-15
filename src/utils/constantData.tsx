import {
  HomeFilled,
  SearchOutlined,
  CompassOutlined,
  PlaySquareOutlined,
  CommentOutlined,
  HeartOutlined,
  PlusSquareOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import Profile from "../assets/Profile.jpg";
import thread_logo from "../assets/thread_logo.png";
import { ReactNode } from "react";

export type MenuItem = Required<MenuProps>["items"][number];

export enum MENU_KEY {
  HOME = "home",
  SEARCH = "search",
  EXPLORE = "explore",
  REELS = "reels",
  MESSAGES = "messages",
  NOTIFICATION = "notification",
  CREATE = "create",
  PROFILE = "profile",
  THREAD = "thread",
  MORE = "more",
}

export const navMenuItems: MenuItem[] = [
  {
    key: MENU_KEY.HOME,
    label: "Home",
    icon: <HomeFilled />,
  },
  {
    key: MENU_KEY.SEARCH,
    label: "Search",
    icon: <SearchOutlined />,
  },
  {
    key: MENU_KEY.EXPLORE,
    label: "Explore",
    icon: <CompassOutlined />,
  },
  {
    key: MENU_KEY.REELS,
    label: "Reels",
    icon: <PlaySquareOutlined />,
  },
  {
    key: MENU_KEY.MESSAGES,
    label: "Messages",
    icon: <CommentOutlined />,
  },
  {
    key: MENU_KEY.NOTIFICATION,
    label: "Notification",
    icon: <HeartOutlined />,
  },
  {
    key: MENU_KEY.CREATE,
    label: "Create",
    icon: <PlusSquareOutlined />,
  },
  {
    key: MENU_KEY.PROFILE,
    label: "Profile",
    icon: (
      <img
        src={Profile}
        alt="thread"
        width={22}
        height={22}
        style={{ borderRadius: "100%" }}
      />
    ),
  },
];

export const FooterNavMenuItems: MenuItem[] = [
  {
    key: MENU_KEY.THREAD,
    label: "Thread",
    icon: <img src={thread_logo} alt="thread" width={22} height={22} />,
  },
  {
    key: MENU_KEY.MORE,
    label: "More",
    icon: <MenuOutlined />,
  },
];

export const appFooterItems: { key: MENU_KEY; icon: ReactNode }[] = [
  {
    key: MENU_KEY.HOME,
    icon: (
      <HomeFilled style={{ color: "white", fontSize: 22, cursor: "pointer" }} />
    ),
  },
  {
    key: MENU_KEY.EXPLORE,
    icon: (
      <CompassOutlined
        style={{ color: "white", fontSize: 22, cursor: "pointer" }}
      />
    ),
  },
  {
    key: MENU_KEY.REELS,
    icon: (
      <PlaySquareOutlined
        style={{ color: "white", fontSize: 22, cursor: "pointer" }}
      />
    ),
  },
  {
    key: MENU_KEY.CREATE,
    icon: (
      <PlusSquareOutlined
        style={{ color: "white", fontSize: 22, cursor: "pointer" }}
      />
    ),
  },
  {
    key: MENU_KEY.MESSAGES,
    icon: (
      <CommentOutlined
        style={{ color: "white", fontSize: 22, cursor: "pointer" }}
      />
    ),
  },
  {
    key: MENU_KEY.PROFILE,
    icon: (
      <img
        src={Profile}
        width={22}
        height={22}
        alt="profile"
        style={{
          cursor: "pointer",
          borderRadius: "100%",
          objectFit: "cover",
        }}
      />
    ),
  },
];
