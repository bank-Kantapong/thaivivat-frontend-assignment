import { Dropdown, Flex, Select, Typography } from "antd";
import Instagram_text_logo from "../assets/Instagram_text_logo.png";
import {
  UsergroupAddOutlined,
  StarOutlined,
  SearchOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const { Text } = Typography;

const AppHeader = () => {
  const items = [
    {
      label: (
        <Flex align="center" justify="space-between" gap={16}>
          <Text
            style={{
              color: "var(--ig-primary-text)",
              fontSize: "var(--system-16-font-size)",
            }}
          >
            Following
          </Text>
          <UsergroupAddOutlined
            style={{
              color: "var(--ig-primary-text)",
              fontSize: 22,
            }}
          />
        </Flex>
      ),
      key: "following",
    },
    {
      label: (
        <Flex align="center" justify="space-between" gap={16}>
          <Text
            style={{
              color: "var(--ig-primary-text)",
              fontSize: "var(--system-16-font-size)",
            }}
          >
            Favorites
          </Text>
          <StarOutlined
            style={{
              color: "var(--ig-primary-text)",
              fontSize: 22,
            }}
          />
        </Flex>
      ),
      key: "following",
    },
  ];

  const onChangeSearch = (value: string) => {
    console.log("value", value);
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      style={{ height: 40, width: "100%" }}
    >
      <DropsownStyle menu={{ items }} trigger={["click"]}>
        <img
          alt="logo"
          src={Instagram_text_logo}
          width={103}
          height={40}
          style={{ filter: "invert(1)" }}
        />
      </DropsownStyle>
      <Flex align="center" gap={20} style={{ position: "sticky", right: 16, zIndex: 2}}>
        <SearchInput
          showSearch
          allowClear
          optionFilterProp="label"
          suffixIcon={null}
          placeholder={
            <Flex align="center" gap="small">
              <SearchOutlined
                style={{
                  fontSize: "var(--system-16-font-size)",
                  color: "var(--ig-secondary-text)",
                }}
              />
              <Text
                style={{
                  fontSize: "var(--system-16-font-size)",
                  color: "var(--ig-secondary-text)",
                  fontWeight: 300,
                }}
              >
                Search
              </Text>
            </Flex>
          }
          //   onChange={onChangeSearch}
          onSearch={onChangeSearch}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />
        <HeartOutlined
          style={{
            fontSize: 24,
            color: "var(--ig-primary-text)",
          }}
        />
      </Flex>
    </Flex>
  );
};

export default AppHeader;

const DropsownStyle = styled(Dropdown)`
  cursor: pointer;
  .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item {
    padding: 8px 16px;
  }
`;

const SearchInput = styled(Select)`
  height: 36px;
  width: 268px;
  .ant-select-selector {
    background-color: var(--ig-search-input) !important;
    border: none !important;
    border-radius: 8px !important;
    padding: 0 16px !important;
  }
`;
