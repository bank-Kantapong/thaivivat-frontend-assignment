import { Drawer, Input, Skeleton, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useSearchData from "../hooks/useSearchData";
import useDebouncedSearch from "../hooks/useDebounceSearch";
import { UserItemType } from "../api/apiSlice";
import MiniProfile from "./MiniProfile";
import FlexBox from "./FlexBox";
import TextTypo from "./TextTypo";

const { Title } = Typography;

type SearchDrawerType = {
  open: boolean;
  onClose: () => void;
};

const SearchDrawer = ({ open, onClose }: SearchDrawerType) => {
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
        <FlexBox vertical width="100%" height="100%">
          {isLoadingSearch ? (
            <FlexBox vertical>
              {Array.from(Array(5).keys()).map((index) => (
                <FlexBox gap="small" key={index} padding="8px 24px">
                  <Skeleton.Avatar active size={44} />
                  <FlexBox vertical gap="small" width="100%">
                    <Skeleton.Input active style={{ width: "100%" }} />
                    <Skeleton.Input active style={{ width: "80%" }} />
                  </FlexBox>
                </FlexBox>
              ))}
            </FlexBox>
          ) : searchedData?.length === 0 ? (
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
            <>
              <FlexBox vertical>
                {searchedData.map((item: UserItemType, index: number) => (
                  <MiniProfile
                    key={item._id}
                    imageUrl={item.imageUrl}
                    imageSize={44}
                    padding="8px 24px"
                    name={item.name}
                    description={
                      <TextTypo
                        color="var(--ig-secondary-text)"
                        fontSize="var(--system-12-font-size)"
                        style={{
                          width: "97%",
                        }}
                        ellipsis
                        text={`${(index + 1000).toLocaleString()} followers`}
                      />
                    }
                    showFullName
                  />
                ))}
              </FlexBox>
            </>
          )}
        </FlexBox>
      );
    } else {
      return (
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
      );
    }
  }, [isLoadingSearch, searchText, searchedData]);

  return (
    <DrawerStyle
      title={
        <FlexBox gap={40} vertical>
          <Title level={3} style={{ color: "white", margin: 0 }}>
            Search
          </Title>
          <SearchInput
            allowClear
            value={searchText}
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </FlexBox>
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

export default SearchDrawer;

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
