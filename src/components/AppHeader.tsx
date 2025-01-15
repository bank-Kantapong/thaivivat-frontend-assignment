import { Dropdown, Select, Skeleton, Typography } from "antd";
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
import FlexBox from "./FlexBox";
import TextTypo from "./TextTypo";

const { Title } = Typography;

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
        <FlexBox align="center" justify="space-between" gap={16}>
          <TextTypo fontSize="var(--system-16-font-size)" text="Following" />
          <UsergroupAddOutlined
            style={{
              color: "var(--ig-primary-text)",
              fontSize: 22,
            }}
          />
        </FlexBox>
      ),
      key: "following",
    },
    {
      label: (
        <FlexBox align="center" justify="space-between" gap={16}>
          <TextTypo fontSize="var(--system-16-font-size)" text="Favorites" />
          <StarOutlined
            style={{
              color: "var(--ig-primary-text)",
              fontSize: 22,
            }}
          />
        </FlexBox>
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
    <FlexBox align="center" justify="space-between" height="40px" width="100%">
      <DropsownStyle menu={{ items }} trigger={["click"]}>
        <img
          alt="logo"
          src={Instagram_text_logo}
          width={103}
          height={40}
          style={{ filter: "invert(1)" }}
        />
      </DropsownStyle>
      <FlexBox
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
            <FlexBox align="center" gap="small">
              <SearchOutlined
                style={{
                  fontSize: "var(--system-16-font-size)",
                  color: "var(--ig-secondary-text)",
                }}
              />
              <TextTypo
                fontSize="var(--system-16-font-size)"
                color="var(--ig-secondary-text)"
                weight={300}
                text="Search"
              />
            </FlexBox>
          }
          onSearch={onChangeSearch}
          options={searchOptions}
          notFoundContent={
            <>
              {isLoadingSearch ? (
                <FlexBox vertical>
                  {Array.from(Array(5).keys()).map((index) => (
                    <FlexBox gap="small" key={index} padding="8px 0px">
                      <Skeleton.Avatar active size={44} />
                      <FlexBox vertical gap="small" width="100%">
                        <Skeleton.Input active style={{ width: "100%" }} />
                        <Skeleton.Input active style={{ width: "80%" }} />
                      </FlexBox>
                    </FlexBox>
                  ))}
                </FlexBox>
              ) : searchText && searchedData?.length === 0 ? (
                <FlexBox width="100%" height="100%">
                  <TextTypo
                    color="var(--ig-secondary-text)"
                    style={{
                      textAlign: "center",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    text="No results found."
                  />
                </FlexBox>
              ) : (
                <FlexBox vertical width="100%" height="100%">
                  <Title level={5} style={{ color: "white", margin: 0 }}>
                    Recent
                  </Title>
                  <FlexBox width="100%" height="100%">
                    <TextTypo
                      color="var(--ig-secondary-text)"
                      style={{
                        textAlign: "center",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      text="No recent searches."
                    />
                  </FlexBox>
                </FlexBox>
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
                  padding="8px 0px"
                  name={getProfileData.name}
                  description={
                    <TextTypo
                      color="var(--ig-secondary-text)"
                      fontSize="var(--system-12-font-size)"
                      style={{
                        width: "97%",
                      }}
                      ellipsis
                      text={`${(info.index + 1000).toLocaleString()} followers`}
                    />
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
      </FlexBox>
    </FlexBox>
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
