import { Col, Flex, Layout, Menu, MenuProps, Row } from "antd";
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
import styled from "styled-components";
import Stories from "./components/Stories";
import Posts from "./components/Posts";
import MyProfile from "./components/MyProfile";
import Suggest from "./components/Suggest";
import FooterInfo from "./components/FooterInfo";
import Instagram_text_logo from "./assets/Instagram_text_logo.png";
import Profile from "./assets/Profile.jpg";
import Instagram_logo from "./assets/Instagram_logo.webp";
import thread_logo from "./assets/thread_logo.png";
import useResponsive from "./hooks/useResponsive";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import { useState } from "react";
import SerachDrawer from "./components/SerachDrawer";

const { Sider, Header, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "home",
    label: "Home",
    icon: <HomeFilled />,
  },
  {
    key: "search",
    label: "Search",
    icon: <SearchOutlined />,
  },
  {
    key: "explore",
    label: "Explore",
    icon: <CompassOutlined />,
  },
  {
    key: "reels",
    label: "Reels",
    icon: <PlaySquareOutlined />,
  },
  {
    key: "messages",
    label: "Messages",
    icon: <CommentOutlined />,
  },
  {
    key: "notification",
    label: "Notification",
    icon: <HeartOutlined />,
  },
  {
    key: "create",
    label: "Create",
    icon: <PlusSquareOutlined />,
  },
  {
    key: "profile",
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

const FooterMenuItems: MenuItem[] = [
  {
    key: "thread",
    label: "Thread",
    icon: <img src={thread_logo} alt="thread" width={22} height={22} />,
  },
  {
    key: "more",
    label: "More",
    icon: <MenuOutlined />,
  },
];

function App() {
  const [activeMenu, setActiveMenu] = useState<string>("home");
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const { isHideNavMenu, isHideRightContent, isAppSize } = useResponsive();

  const isCollapseNav = isHideNavMenu || collapsed;

  const onClickMenu = (key: string) => {
    setActiveMenu(key);
    if (key === "search") {
      setCollapsed(true);
      setOpenSearch(true);
    } else {
      setCollapsed(false);
      setOpenSearch(false);
    }
  };

  return (
    <LayoutStyle hasSider>
      {!isAppSize && (
        <SiderStyle
          collapsed={isCollapseNav}
          collapsedWidth="72px"
          zeroWidthTriggerStyle={{ display: "none" }}
          width={244}
          style={{ zIndex: 1001 }}
        >
          <Flex justify="space-between" vertical style={{ height: "100%" }}>
            <Flex vertical>
              <div style={{ padding: "25px 12px 0px", marginBottom: "19px" }}>
                <img
                  alt="logo"
                  src={isCollapseNav ? Instagram_logo : Instagram_text_logo}
                  width={isCollapseNav ? 22 : 103}
                  height={isCollapseNav ? 22 : 40}
                  style={{ filter: isCollapseNav ? "none" : "invert(1)" }}
                />
              </div>
              <MenuStyle
                mode="inline"
                selectedKeys={[activeMenu]}
                items={items}
                style={{ height: "100%" }}
                onClick={({ key }: { key: string }) => onClickMenu(key)}
              />
            </Flex>
            <div>
              <MenuStyle mode="inline" items={FooterMenuItems} />
            </div>
          </Flex>
        </SiderStyle>
      )}
      <Layout
        style={{
          height: "100vh",
        }}
      >
        {isAppSize && (
          <HeaderStyle>
            <AppHeader />
          </HeaderStyle>
        )}
        <Content style={{ paddingTop: isAppSize ? "60px" : "" }}>
          <RowStyle
            wrap={false}
            style={{
              width: isAppSize
                ? "100%"
                : isHideNavMenu
                ? "calc(100% + 72px)"
                : "calc(100% + 300px)",
            }}
          >
            <ColStyle
              span={isHideRightContent ? 24 : 16}
              style={{ maxWidth: 630, width: "100%" }}
            >
              <Flex vertical style={{ height: "100%", paddingBottom: "100px" }}>
                <Stories />
                <Posts />
              </Flex>
            </ColStyle>
            {!isHideRightContent && (
              <ColStyle
                span={8}
                style={{ maxWidth: 383, paddingLeft: 64, width: "100%" }}
              >
                <Flex vertical style={{ marginTop: "36px", padding: "0 16px" }}>
                  <MyProfile />
                  <Suggest />
                  <FooterInfo />
                </Flex>
              </ColStyle>
            )}
          </RowStyle>
        </Content>
        {isAppSize && (
          <FooterStyle>
            <AppFooter />
          </FooterStyle>
        )}
      </Layout>
      <SerachDrawer
        open={openSearch}
        onClose={() => {
          setActiveMenu("home");
          setCollapsed(false);
          setOpenSearch(false);
        }}
      />
    </LayoutStyle>
  );
}

export default App;

const LayoutStyle = styled(Layout)`
  height: 100vh;
`;

const SiderStyle = styled(Sider)`
  background: black;
  padding: 8px 12px 20px;
  border-right: 1px solid var(--ig-separator);
  position: fixed;
  height: 100%;
  &.ant-layout-sider .ant-layout-sider-trigger {
    display: none;
  }
`;

const MenuStyle = styled(Menu)`
  height: 100%;
  background-color: var(--ig-primary-background) !important;
  color: white;
  li.ant-menu-item {
    padding: 12px !important;
    height: 56px;
    margin: 4px 0px;
  }
  .ant-menu-item:hover {
    background-color: var(--ig-hover-overlay) !important;
  }
  .ant-menu-item.ant-menu-item-selected {
    background-color: var(--primary-background) !important;
  }
  .ant-menu-item.ant-menu-item-selected > .ant-menu-title-content {
    font-weight: 700;
  }
  .ant-menu-title-content {
    color: white;
    font-size: var(--system-16-font-size);
    font-weight: 400;
    margin-inline-start: 16px !important;
  }
  span.anticon.ant-menu-item-icon {
    color: white;
    font-size: 22px;
  }
`;

const RowStyle = styled(Row)`
  height: 100%;
  width: calc(100% + 244px);
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

const ColStyle = styled(Col)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HeaderStyle = styled(Header)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 10;
  background-color: var(--ig-primary-background);
  border-bottom: 1px solid var(--ig-separator);
  padding: 0 16px;
  display: flex;
  align-items: center;
`;

const FooterStyle = styled(Footer)`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 48px;
  z-index: 10;
  background-color: var(--ig-primary-background);
  border-top: 1px solid var(--ig-separator);
  display: flex;
`;
