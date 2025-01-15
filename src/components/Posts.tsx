import { Divider, Flex, Input, Typography } from "antd";
import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  BookOutlined,
  SendOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { UserItemType, useGetUserQuery } from "../api/apiSlice";
import styled from "styled-components";
import { useEffect, useState } from "react";
import MiniProfile from "./MiniProfile";
import useResponsive from "../hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { initPost, likePost, disLikePost } from "../api/postSlice";
import { useDoubleClick } from "../hooks/useDoubleClick";

const { Text } = Typography;
const { TextArea } = Input;

const Posts = () => {
  const [commentValue, setCommentValue] = useState<string>("");
  const { isFitAppSize, isExtraSmallAppSize } = useResponsive();
  const { likeId, handleDoubleTap } = useDoubleClick();
  const { data: chracters, error, isLoading } = useGetUserQuery({});
  const userPostItems = useSelector((state: RootState) => state.userPost.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && chracters?.data) {
      dispatch(initPost(chracters.data));
    }
  }, [chracters, dispatch, isLoading]);

  const handleLikePost = (_id: number) => {
    dispatch(likePost(_id));
  };

  const handleDisLikePost = (_id: number) => {
    dispatch(disLikePost(_id));
  };

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
        {userPostItems
          ?.slice(0, 3)
          ?.map((item: UserItemType, index: number) => (
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
                <ImageContainer
                  onClick={() => {
                    handleDoubleTap(item._id);
                    handleLikePost(item._id);
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt="post"
                    width={468}
                    style={{
                      objectFit: "cover",
                      width: "min(470px, 100vw)",
                      borderRadius: "4px",
                      border: "1px solid var(--ig-separator)",
                    }}
                  />
                  <HeartIcon className={likeId === item._id ? "show" : ""} />
                </ImageContainer>
                <Flex
                  vertical
                  style={{ padding: isFitAppSize ? "16px 16px 0" : "0" }}
                >
                  <Flex
                    align="center"
                    justify="space-between"
                    style={{ padding: isFitAppSize ? "0 0 12px" : "12px 0" }}
                  >
                    <Flex gap="middle">
                      {item?.isLike ? (
                        <HeartFilled
                          style={{
                            fontSize: 24,
                            color: "var(--ig-badge)",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDisLikePost(item._id)}
                        />
                      ) : (
                        <HeartOutlined
                          style={{
                            fontSize: 24,
                            color: "white",
                            cursor: "pointer",
                          }}
                          onClick={() => handleLikePost(item._id)}
                        />
                      )}

                      <MessageOutlined
                        style={{
                          fontSize: 24,
                          color: "white",
                          cursor: "pointer",
                        }}
                      />
                      <SendOutlined
                        style={{
                          fontSize: 24,
                          color: "white",
                          cursor: "pointer",
                          transform: "rotate(-25deg)",
                          paddingBottom: "8px",
                        }}
                      />
                    </Flex>
                    <BookOutlined
                      style={{
                        fontSize: 24,
                        color: "white",
                        cursor: "pointer",
                      }}
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
              </Flex>
              <Divider
                style={{
                  marginBottom: index + 1 === 3 ? 100 : 20,
                  borderColor: "var(--ig-separator)",
                }}
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

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const HeartIcon = styled(HeartFilled)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  font-size: 100px;
  color: var(--ig-badge);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  pointer-events: none;

  &.show {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;
