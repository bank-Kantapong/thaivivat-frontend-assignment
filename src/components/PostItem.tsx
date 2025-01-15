import { Divider, Input } from "antd";
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
import FlexBox from "./FlexBox";
import TextTypo from "./TextTypo";

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
    <FlexBox vertical>
      <FlexBox vertical>
        <div style={{ padding: isFitAppSize ? "12px 14px 0" : "0" }}>
          <MiniProfile
            padding="0 0 12px 4px"
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
        <FlexBox vertical padding={isFitAppSize ? "16px 16px 0" : "0"}>
          <FlexBox
            align="center"
            justify="space-between"
            padding={isFitAppSize ? "0 0 12px" : "12px 0"}
          >
            <FlexBox gap="middle">
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
            </FlexBox>
            <BookOutlined
              style={{
                fontSize: 24,
                color: "white",
                cursor: "pointer",
              }}
            />
          </FlexBox>
          <TextTypo strong text="10 likes" />
          <FlexBox gap="small">
            <TextTypo strong text={name} />
            <TextTypo text="Hello" />
          </FlexBox>
          {canComment && (
            <FlexBox align="center">
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
                <TextTypo
                  color="var(--ig-primary-button)"
                  pointer
                  strong
                  text="Post"
                />
              )}
            </FlexBox>
          )}
        </FlexBox>
      </FlexBox>
      <Divider
        style={{
          marginBottom: isLastItem ? 100 : 20,
          borderColor: "var(--ig-separator)",
        }}
      />
    </FlexBox>
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
