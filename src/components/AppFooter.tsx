import { Flex } from "antd";
import {
  HomeFilled,
  CompassOutlined,
  PlaySquareOutlined,
  CommentOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
import Profile_image from "../assets/profile.jpg";

type MenuItem = {
  key: string;
  icon: ReactNode;
};

const items: MenuItem[] = [
  {
    key: "home",
    icon: (
      <HomeFilled style={{ color: "white", fontSize: 22, cursor: "pointer" }} />
    ),
  },
  {
    key: "explore",
    icon: (
      <CompassOutlined
        style={{ color: "white", fontSize: 22, cursor: "pointer" }}
      />
    ),
  },
  {
    key: "reels",
    icon: (
      <PlaySquareOutlined
        style={{ color: "white", fontSize: 22, cursor: "pointer" }}
      />
    ),
  },
  {
    key: "create",
    icon: (
      <PlusSquareOutlined
        style={{ color: "white", fontSize: 22, cursor: "pointer" }}
      />
    ),
  },
  {
    key: "messages",
    icon: (
      <CommentOutlined
        style={{ color: "white", fontSize: 22, cursor: "pointer" }}
      />
    ),
  },
  {
    key: "profile",
    icon: (
      <img
        src={Profile_image}
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

const AppFooter = () => {
  return (
    <Flex justify="space-between" align="center" gap="large" style={{ width: "100%" }}>
      {items.map((item: MenuItem) => (
        <Flex key={item.key}>{item.icon}</Flex>
      ))}
    </Flex>
  );
};

export default AppFooter;
