import { Col, Layout, Row } from "antd";
import styled from "styled-components";
import Stories from "./components/Stories";
import Posts from "./components/Posts";
import MyProfile from "./components/MyProfile";
import Suggest from "./components/Suggest";
import FooterInfo from "./components/FooterInfo";
import useResponsive from "./hooks/useResponsive";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import { useState } from "react";
import SearchDrawer from "./components/SearchDrawer";
import NavMenu from "./components/NavMenu";
import { MENU_KEY } from "./utils/constantData";
import FlexBox from "./components/FlexBox";

const { Sider, Header, Content, Footer } = Layout;

function App() {
  const [activeMenu, setActiveMenu] = useState<MENU_KEY>(MENU_KEY.HOME);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const { isHideNavMenu, isHideRightContent, isAppSize } = useResponsive();

  const isCollapseNav = isHideNavMenu || collapsed;

  const onClickMenu = (key: MENU_KEY) => {
    setActiveMenu(key);
    if (key === MENU_KEY.SEARCH) {
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
          <NavMenu
            isCollapseNav={isCollapseNav}
            activeMenu={activeMenu}
            onClickMenu={onClickMenu}
          />
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
            <ColStyle span={isHideRightContent ? 24 : 16} max_width={630}>
              <FlexBox vertical height="100%">
                <Stories />
                <Posts />
              </FlexBox>
            </ColStyle>
            {!isHideRightContent && (
              <ColStyle span={8} max_width={383} style={{ paddingLeft: 64 }}>
                <FlexBox vertical margin="36px 0 0" padding="0 16px">
                  <MyProfile />
                  <Suggest />
                  <FooterInfo />
                </FlexBox>
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
      <SearchDrawer
        open={openSearch}
        onClose={() => {
          setActiveMenu(MENU_KEY.HOME);
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

const RowStyle = styled(Row)`
  height: 100%;
  width: calc(100% + 244px);
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

const ColStyle = styled(Col)<{ max_width?: number }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: ${({ max_width }) => max_width + "px"};
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
