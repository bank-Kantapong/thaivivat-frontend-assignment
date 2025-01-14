import { Col, Flex, Grid, Layout, Menu, MenuProps, Row } from "antd";
import {
  HomeFilled,
  SearchOutlined,
  CompassOutlined,
  PlaySquareOutlined,
  CommentOutlined,
  HeartOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useMemo } from "react";
import styled from "styled-components";
import Stories from "./components/Stories";
import Posts from "./components/Posts";
import MyProfile from "./components/MyProfile";
import Suggest from "./components/Suggest";
import FooterInfo from "./components/FooterInfo";

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
    icon: <PlusSquareOutlined />
  }
];

function App() {
  const screens = useBreakpoint();

  const isHideRightContent = useMemo(() => {
    return !screens.lg;
  }, [screens.lg]);

  const isAppSize = useMemo(() => {
    return !screens.md;
  }, [screens.md]);

  console.log("isAppSize", isAppSize);
  return (
    <LayoutStyle>
      {!isAppSize && (
        <SiderStyle
          breakpoint="xl"
          collapsedWidth="0"
          zeroWidthTriggerStyle={{ display: "none" }}
        >
          <MenuStyle
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
            style={{ height: "100%" }}
          />
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
              <Flex vertical style={{ marginTop: "16px", height: "100%" }}>
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
  border-right: 1px solid var(--ig-separator) !important;
  background-color: var(--ig-primary-background) !important;
  color: white;
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
