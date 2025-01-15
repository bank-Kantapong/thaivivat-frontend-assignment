import { Drawer, Flex, Input, Skeleton, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useSearchData from "../hooks/useSearchData";
import useDebouncedSearch from "../hooks/useDebounceSearch";
import { UserItemType } from "../api/apiSlice";
import MiniProfile from "./MiniProfile";

const { Title, Text } = Typography;

type SerachDrawerType = {
  open: boolean;
  onClose: () => void;
};

const SerachDrawer = ({ open, onClose }: SerachDrawerType) => {
  const [searchText, setSearchText] = useState<string>("");
  const { debouncedSearchText, isLoadingSearch } = useDebouncedSearch(
    searchText,
    500
  );
  const searchedData = useSearchData(debouncedSearchText);

  useEffect(() => {
    if (open) {
      setSearchText("");
    }
  }, [open]);

  const handleClose = () => {
    setSearchText("");
    onClose();
  };

  const searchContent = useMemo(() => {
    if (searchText) {
      return (
        <Flex vertical style={{ width: "100%", height: "100%" }}>
          {isLoadingSearch ? (
            <Flex vertical>
              {Array.from(Array(5).keys()).map((index) => (
                <Flex gap="small" key={index} style={{ padding: "8px 24px" }}>
                  <Skeleton.Avatar active size={44} />
                  <Flex vertical gap="small" style={{ width: "100%" }}>
                    <Skeleton.Input active style={{ width: "100%" }} />
                    <Skeleton.Input active style={{ width: "80%" }} />
                  </Flex>
                </Flex>
              ))}
            </Flex>
          ) : searchedData?.length === 0 ? (
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
            <>
              <Flex vertical>
                {searchedData.map((item: UserItemType, index: number) => (
                  <MiniProfile
                    key={item._id}
                    imageUrl={item.imageUrl}
                    imageSize={44}
                    style={{ padding: "8px 24px" }}
                    name={item.name}
                    description={
                      <Text
                        style={{
                          color: "var(--ig-secondary-text)",
                          fontSize: "var(--system-12-font-size)",
                          width: "97%",
                        }}
                        ellipsis
                      >
                        {(index + 1000).toLocaleString()} followers
                      </Text>
                    }
                    showFullName
                  />
                ))}
              </Flex>
            </>
          )}
        </Flex>
      );
    } else {
      return (
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
      );
    }
  }, [isLoadingSearch, searchText, searchedData]);

  return (
    <DrawerStyle
      title={
        <Flex gap={40} vertical>
          <Title level={3} style={{ color: "white", margin: 0 }}>
            Search
          </Title>
          <SearchInput
            allowClear
            value={searchText}
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Flex>
      }
      onClose={handleClose}
      searched={!!searchText}
      open={open}
      width={397}
      closeIcon={null}
      placement="left"
    >
      {searchContent}
    </DrawerStyle>
  );
};

export default SerachDrawer;

const DrawerStyle = styled(Drawer)<{ searched?: boolean }>`
  border-radius: 0 8px 8px 0;
  .ant-drawer-header {
    padding: 16px 16px 24px;
    border-bottom: ${({ searched }) =>
      searched ? "none" : "1px solid var(--ig-separator)"};
  }
  .ant-drawer-body {
    padding: ${({ searched }) => (searched ? "0px" : "24px")};
    overflow: hidden;
  }
`;

const SearchInput = styled(Input)`
  height: 40px;
  color: white;
  caret-color: white;
  &.ant-input-outlined {
    background-color: var(--ig-search-input) !important;
    border: none !important;
    border-radius: 8px !important;
  }
  ::placeholder {
    color: var(--ig-secondary-text) !important;
  }
  .ant-input-suffix > button > span {
    color: var(--ig-secondary-text);
    font-size: var(--system-14-font-size);
  }
`;
