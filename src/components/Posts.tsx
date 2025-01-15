import { Flex } from "antd";
import { UserItemType, useGetUserQuery } from "../api/apiSlice";
import styled from "styled-components";
import { memo, useEffect, useState } from "react";
import useResponsive from "../hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { initPost, likePost, disLikePost } from "../api/postSlice";
import { useDoubleClick } from "../hooks/useDoubleClick";
import PostItem from "./PostItem";
import InfiniteScroll from "react-infinite-scroll-component";

const Posts = () => {
  const [comments, setComments] = useState<Record<number, string>>({});
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { isExtraSmallAppSize } = useResponsive();
  const { likeId, handleDoubleTap } = useDoubleClick();
  const { data: chracters, error, isLoading } = useGetUserQuery({});
  const userPostItems = useSelector((state: RootState) => state.userPost.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && chracters?.data && userPostItems?.length === 0) {
      const mapNewData = chracters?.data
        ?.slice(0, 10)
        ?.map((item: UserItemType, index: number) => ({
          ...item,
          isLike: false,
          canComment: index % 2 === 0,
        }));
      dispatch(initPost(mapNewData));
    }
  }, [chracters?.data, dispatch, isLoading, userPostItems?.length]);

  const handleLikePost = (_id: number) => {
    dispatch(likePost(_id));
  };

  const handleDisLikePost = (_id: number) => {
    dispatch(disLikePost(_id));
  };

  const onChangeComment = ({ value, _id }: { value: string; _id: number }) => {
    setComments((prev) => ({
      ...prev,
      [_id]: value,
    }));
  };

  const fetchNewData = () => {
    const mapNewData = chracters?.data
      ?.slice(page * 10, (page + 1) * 10)
      ?.map((item: UserItemType, index: number) => ({
        ...item,
        isLike: false,
        canComment: index % 2 === 0,
      }));

    dispatch(initPost(mapNewData));
  };

  const loadMoreItems = () => {
    if (page * 10 >= chracters?.info?.count) {
      setHasMore(false); // No more items to load
      return;
    }

    setPage(page + 1);
    fetchNewData();
  };

  if (error)
    return <p style={{ color: "white" }}>Error: Something went wrong!</p>;

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
        <InfiniteScroll
          dataLength={userPostItems.length}
          next={() => !isLoading && loadMoreItems()}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {userPostItems?.map((item: UserItemType, index: number) => (
            <PostItem
              key={item._id}
              _id={item._id}
              name={item.name}
              imageUrl={item.imageUrl}
              handleClickOnImage={() => {
                handleDoubleTap(item._id);
                handleLikePost(item._id);
              }}
              isLike={item?.isLike}
              canComment={item?.canComment}
              handleLikePost={() => handleLikePost(item._id)}
              handleDisLikePost={() => handleDisLikePost(item._id)}
              isLastItem={index + 1 >= userPostItems?.length}
              likeId={likeId}
              commentValue={comments[item._id]}
              onChangeComment={onChangeComment}
            />
          ))}
        </InfiniteScroll>
      </PostBox>
    </Flex>
  );
};

export default memo(Posts);

const PostBox = styled.div`
  max-width: 100%;
  width: min(470px, 100vw);
  height: 500px;
`;
