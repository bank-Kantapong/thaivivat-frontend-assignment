import { Divider, Flex, Input, Typography } from "antd";
import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  BookOutlined,
  SendOutlined,
  HeartFilled,
} from "@ant-design/icons";
import MiniProfile from "./MiniProfile";
import useResponsive from "../hooks/useResponsive";
import styled from "styled-components";

const { Text } = Typography;
const { TextArea } = Input;

type PostItemType = {
  _id: number;
  name: string;
  imageUrl: string;
  handleClickOnImage: () => void;
  isLike?: boolean;
  canComment?: boolean;
  handleLikePost: () => void;
  handleDisLikePost: () => void;
  isLastItem: boolean;
  likeId?: number | null;
  commentValue?: string;
  onChangeComment: ({ _id, value }: { _id: number; value: string }) => void;
};

const PostItem = ({
  _id,
  name,
  imageUrl,
  handleClickOnImage,
  isLike,
  canComment,
  handleLikePost,
  handleDisLikePost,
  isLastItem,
  likeId,
  commentValue = "",
  onChangeComment,
}: PostItemType) => {
  const { isFitAppSize } = useResponsive();

  return (
    <Flex vertical>
      <Flex vertical>
        <div style={{ padding: isFitAppSize ? "12px 14px 0" : "0" }}>
          <MiniProfile
            style={{
              padding: "0 0 12px 4px",
            }}
            imageUrl={imageUrl}
            name={name}
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
        <ImageContainer onClick={handleClickOnImage}>
          <img
            src={imageUrl}
            alt="post"
            width={468}
            style={{
              objectFit: "cover",
              width: "min(470px, 100vw)",
              borderRadius: "4px",
              border: "1px solid var(--ig-separator)",
            }}
          />
          <HeartIcon className={likeId && likeId === _id ? "show" : ""} />
        </ImageContainer>
        <Flex vertical style={{ padding: isFitAppSize ? "16px 16px 0" : "0" }}>
          <Flex
            align="center"
            justify="space-between"
            style={{ padding: isFitAppSize ? "0 0 12px" : "12px 0" }}
          >
            <Flex gap="middle">
              {isLike ? (
                <HeartFilled
                  style={{
                    fontSize: 24,
                    color: "var(--ig-badge)",
                    cursor: "pointer",
                  }}
                  onClick={handleDisLikePost}
                />
              ) : (
                <HeartOutlined
                  style={{
                    fontSize: 24,
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={handleLikePost}
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
              {name}
            </Text>
            <Text style={{ color: "white" }}>Hello</Text>
          </Flex>
          {canComment && (
            <Flex align="center">
              <CommentInput
                placeholder="Add a comment..."
                autoSize={{ minRows: 1, maxRows: 4 }}
                variant="borderless"
                value={commentValue}
                onChange={(e) =>
                  onChangeComment({
                    value: e.target.value,
                    _id,
                  })
                }
              />
              {commentValue && (
                <Text
                  style={{
                    color: "var(--ig-primary-button)",
                    textWrap: "nowrap",
                    cursor: "pointer"
                  }}
                  strong
                >
                  Post
                </Text>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
      <Divider
        style={{
          marginBottom: isLastItem ? 100 : 20,
          borderColor: "var(--ig-separator)",
        }}
      />
    </Flex>
  );
};

export default PostItem;

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
