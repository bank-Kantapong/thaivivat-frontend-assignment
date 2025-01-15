import { Divider, Flex, Input, Typography } from "antd";
import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { UserItemType, useGetUserQuery } from "../api/apiSlice";
import styled from "styled-components";
import { useState } from "react";
import MiniProfile from "./MiniProfile";
import useResponsive from "../hooks/useResponsive";

const { Text } = Typography;
const { TextArea } = Input;

const Posts = () => {
  const [commentValue, setCommentValue] = useState<string>("");
  const { isFitAppSize, isExtraSmallAppSize } = useResponsive();
  const { data: chracters, error, isLoading } = useGetUserQuery({});

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: Something went wrong!</p>;

  return (
    <Flex
      vertical
      align="center"
      style={{
        width: isExtraSmallAppSize ? "100vw" : "100%",
        maxWidth: 630,
        overflow: "visible",
      }}
    >
      <PostBox>
        {chracters?.data?.slice(0, 3)?.map((item: UserItemType) => (
          <Flex vertical key={item._id}>
            <Flex vertical>
              <div style={{ padding: isFitAppSize ? "12px 14px 0" : "0" }}>
                <MiniProfile
                  style={{
                    padding: "0 0 12px 4px",
                  }}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  activeTime={isFitAppSize ? "" : "16m"}
                  suffix={
                    <EllipsisOutlined
                      style={{
                        fontSize: 24,
                        color: "white",
                        cursor: "pointer",
                      }}
                    />
                  }
                />
              </div>
              <img
                src={item.imageUrl}
                alt="post"
                width={468}
                style={{ objectFit: "cover", width: "min(470px, 100vw)" }}
              />

              <Flex
                align="center"
                justify="space-between"
                style={{ padding: "12px 0" }}
              >
                <Flex gap="middle">
                  <HeartOutlined
                    style={{ fontSize: 24, color: "white", cursor: "pointer" }}
                  />
                  <MessageOutlined
                    style={{ fontSize: 24, color: "white", cursor: "pointer" }}
                  />
                </Flex>
                <BookOutlined
                  style={{ fontSize: 24, color: "white", cursor: "pointer" }}
                />
              </Flex>
              <Text style={{ color: "white" }} strong>
                10 likes
              </Text>
              <Flex gap="small">
                <Text style={{ color: "white" }} strong>
                  {item.name}
                </Text>
                <Text style={{ color: "white" }}>Hello</Text>
              </Flex>
              <Flex align="center">
                <CommentInput
                  placeholder="Add a comment..."
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  variant="borderless"
                  onChange={(e) => setCommentValue(e.target.value)}
                />
                {commentValue && (
                  <Text
                    style={{
                      color: "var(--ig-primary-button)",
                      textWrap: "nowrap",
                    }}
                    strong
                  >
                    Post
                  </Text>
                )}
              </Flex>
            </Flex>
            <Divider
              style={{ marginBottom: 20, borderColor: "var(--ig-separator)" }}
            />
          </Flex>
        ))}
      </PostBox>
    </Flex>
  );
};

export default Posts;

const PostBox = styled.div`
  max-width: 100%;
  width: min(470px, 100vw);
  height: 500px;
`;

const CommentInput = styled(TextArea)`
  &.ant-input {
    padding: 4px 0px;
  }
  color: white;
  caret-color: white;
  &::placeholder {
    color: var(--ig-secondary-text);
  }
`;
