import { Dropdown, Flex, Select, Skeleton, Typography } from "antd";
import Instagram_text_logo from "../assets/Instagram_text_logo.png";
import {
  UsergroupAddOutlined,
  StarOutlined,
  SearchOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useMemo, useState } from "react";
import useDebouncedSearch from "../hooks/useDebounceSearch";
import useSearchData from "../hooks/useSearchData";
import { UserItemType } from "../api/apiSlice";
import MiniProfile from "./MiniProfile";

const { Text, Title } = Typography;

const AppHeader = () => {
  const [searchText, setSearchText] = useState<string>("");
  const { debouncedSearchText, isLoadingSearch } = useDebouncedSearch(
    searchText,
    500
  );
  const searchedData = useSearchData(debouncedSearchText) as UserItemType[];

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
      key: "favorites",
    },
  ];

  const searchOptions = useMemo(() => {
    return searchedData?.map((item: UserItemType) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
  }, [searchedData]);

  const onChangeSearch = (value: string) => {
    setSearchText(value);
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
      <Flex
        align="center"
        gap={20}
        style={{ position: "sticky", right: 16, zIndex: 2 }}
      >
        <SearchSelection
          showSearch
          allowClear
          searchValue={searchText}
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
          onSearch={onChangeSearch}
          options={searchOptions}
          notFoundContent={
            <>
              {isLoadingSearch ? (
                <Flex vertical>
                  {Array.from(Array(5).keys()).map((index) => (
                    <Flex
                      gap="small"
                      key={index}
                      style={{ padding: "8px 0px" }}
                    >
                      <Skeleton.Avatar active size={44} />
                      <Flex vertical gap="small" style={{ width: "100%" }}>
                        <Skeleton.Input active style={{ width: "100%" }} />
                        <Skeleton.Input active style={{ width: "80%" }} />
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              ) : searchText && searchedData?.length === 0 ? (
                <Flex style={{ width: "100%", height: "100%" }}>
                  <Text
                    style={{
                      color: "var(--ig-secondary-text)",
                      textAlign: "center",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    No results found.
                  </Text>
                </Flex>
              ) : (
                <Flex vertical style={{ width: "100%", height: "100%" }}>
                  <Title level={5} style={{ color: "white", margin: 0 }}>
                    Recent
                  </Title>
                  <Flex style={{ width: "100%", height: "100%" }}>
                    <Text
                      style={{
                        color: "var(--ig-secondary-text)",
                        textAlign: "center",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      No recent searches.
                    </Text>
                  </Flex>
                </Flex>
              )}
            </>
          }
          optionRender={(option, info) => {
            const getProfileData: UserItemType | undefined = searchedData.find(
              (dataItem: UserItemType) => dataItem._id === option.value
            );
            if (getProfileData) {
              return (
                <MiniProfile
                  key={getProfileData._id}
                  imageUrl={getProfileData.imageUrl}
                  imageSize={44}
                  style={{ padding: "8px 0px" }}
                  name={getProfileData.name}
                  description={
                    <Text
                      style={{
                        color: "var(--ig-secondary-text)",
                        fontSize: "var(--system-12-font-size)",
                        width: "97%",
                      }}
                      ellipsis
                    >
                      {(info.index + 1000).toLocaleString()} followers
                    </Text>
                  }
                />
              );
            }
          }}
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

const SearchSelection = styled(Select)`
  height: 36px;
  width: 268px;
  color: white !important;
  caret-color: white;
  .ant-select-selector {
    background-color: var(--ig-search-input) !important;
    border: none !important;
    border-radius: 8px !important;
    padding: 0 16px !important;
  }
  .ant-select-selector input {
    color: white !important;
  }
  .ant-select-selector {
    color: white !important;
  }
  .ant-select-dropdown {
    background-color: black !important; /* Set dropdown background color to black */
  }
  .ant-select-item-option-selected {
    background-color: black !important; /* Customize selected item's background */
  }
`;
