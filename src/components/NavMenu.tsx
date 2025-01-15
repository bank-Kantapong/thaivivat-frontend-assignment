import { Menu } from "antd";
import styled from "styled-components";
import Instagram_text_logo from "../assets/Instagram_text_logo.png";
import Instagram_logo from "../assets/Instagram_logo.webp";
import {
  FooterNavMenuItems,
  MENU_KEY,
  navMenuItems,
} from "../utils/constantData";
import FlexBox from "./FlexBox";

type NavMenuType = {
  isCollapseNav: boolean;
  activeMenu: string;
  onClickMenu: (key: MENU_KEY) => void;
};

const NavMenu = ({ isCollapseNav, activeMenu, onClickMenu }: NavMenuType) => {
  return (
    <FlexBox justify="space-between" vertical height="100%">
      <FlexBox vertical>
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
          items={navMenuItems}
          style={{ height: "100%" }}
          onClick={({ key }: { key: string }) => onClickMenu(key as MENU_KEY)}
        />
      </FlexBox>
      <div>
        <MenuStyle mode="inline" items={FooterNavMenuItems} />
      </div>
    </FlexBox>
  );
};

export default NavMenu;

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
