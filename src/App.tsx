import { Col, Flex, Grid, Layout, Menu, MenuProps, Row } from "antd";
import {
  HomeFilled,
  SearchOutlined,
  CompassOutlined,
  PlaySquareOutlined,
  CommentOutlined,
  HeartOutlined,
  PlusSquareOutlined,
  AntDesignOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useMemo } from "react";
import styled from "styled-components";
import Stories from "./components/Stories";
import Posts from "./components/Posts";
import MyProfile from "./components/MyProfile";
import Suggest from "./components/Suggest";
import FooterInfo from "./components/FooterInfo";
import Instagram_logo from "./assets/Instagram_logo.png";

const { Sider, Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

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
];

const FooterMenuItems: MenuItem[] = [
  {
    key: "thread",
    label: "Thread",
    icon: <AntDesignOutlined />,
  },
  {
    key: "more",
    label: "More",
    icon: <MenuOutlined />,
  },
];

function App() {
  const screens = useBreakpoint();

  const isHideRightContent = useMemo(() => {
    return !screens.lg;
  }, [screens.lg]);

  const isAppSize = useMemo(() => {
    return !screens.md;
  }, [screens.md]);

  return (
    <LayoutStyle>
      {!isAppSize && (
        <SiderStyle
          breakpoint="xl"
          collapsedWidth="0"
          zeroWidthTriggerStyle={{ display: "none" }}
        >
          <Flex justify="space-between" vertical style={{ height: "100%" }}>
            <Flex vertical>
              <div style={{ padding: "25px 12px 0px", marginBottom: "19px" }}>
                <img
                  alt="logo"
                  src={Instagram_logo}
                  width={103}
                  height={40}
                  style={{ filter: "invert(1)" }}
                />
              </div>
              <MenuStyle
                mode="inline"
                defaultSelectedKeys={["home"]}
                items={items}
                style={{ height: "100%" }}
              />
            </Flex>
            <div>
              <MenuStyle mode="inline" items={FooterMenuItems} />
            </div>
          </Flex>
        </SiderStyle>
      )}
      <Layout>
        {isAppSize && <Header />}
        <Content>
          <RowStyle>
            <ColStyle
              span={isHideRightContent ? 24 : 16}
              style={{ maxWidth: 630, width: "100%" }}
            >
              <Flex vertical style={{ height: "100%" }}>
                <Stories />
                <Posts />
              </Flex>
            </ColStyle>
            {!isHideRightContent && (
              <ColStyle span={8} style={{ width: 319, paddingLeft: 64 }}>
                <Flex vertical style={{ marginTop: "36px" }}>
                  <MyProfile />
                  <Suggest />
                  <FooterInfo />
                </Flex>
              </ColStyle>
            )}
          </RowStyle>
        </Content>
        {isAppSize && (
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        )}
      </Layout>
    </LayoutStyle>
  );
}

export default App;

const LayoutStyle = styled(Layout)`
  height: 100%;
`;

const SiderStyle = styled(Sider)`
  background: black;
  padding: 8px 12px 20px;
  border-right: 1px solid var(--ig-separator);
  &.ant-layout-sider.ant-layout-sider-dark {
    flex: 0 0 244px !important;
    max-width: 244px !important;
    min-width: 244px !important;
    width: 244px !important;
  }
  &.ant-layout-sider.ant-layout-sider-dark.ant-layout-sider-collapsed.ant-layout-sider-below.ant-layout-sider-zero-width {
    flex: 0 0 72px !important;
    max-width: 72px !important;
    min-width: 72px !important;
    width: 72px !important;
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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

const ColStyle = styled(Col)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
