import { Flex, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useGetCharacterQuery } from "../api/apiSlice";
import { useMemo, useRef, useState } from "react";
import styled from "styled-components";

const { Text } = Typography;

interface StoriesItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const Stories = () => {
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: chracters, error, isLoading } = useGetCharacterQuery({});

  const characterList = useMemo(() => {
    return chracters?.data?.slice(0, 10);
  }, [chracters]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowPrev(scrollLeft > 0);
      setShowNext(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: Something went wrong!</p>;

  return (
    <div style={{ position: "relative" }}>
      {showPrev && (
        <ArrowButton onClick={handlePrev} style={{ left: 0 }}>
          <LeftOutlined />
        </ArrowButton>
      )}
      <Flex
        gap={14}
        style={{
          overflow: "auto hidden",
          scrollbarWidth: "none",
          margin: "16px 0 24px",
          padding: "8px 0",
          position: "relative",
        }}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {characterList?.map((item: StoriesItemProps) => (
          <Flex
            gap={4}
            align="center"
            vertical
            key={item.id}
            style={{ height: "max-content", maxWidth: 66 }}
          >
            <StoryBorder>
              <img
                src={item.imageUrl}
                alt="avatar"
                width={50}
                height={50}
                style={{
                  borderRadius: "100%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                }}
              />
            </StoryBorder>
            <Text
              ellipsis
              style={{
                color: "white",
                maxWidth: 66,
                padding: "0 2px",
                fontSize: "var(--system-12-font-size)",
              }}
            >
              {item.name}
            </Text>
          </Flex>
        ))}
      </Flex>
      {showNext && (
        <ArrowButton onClick={handleNext} style={{ right: 0 }}>
          <RightOutlined />
        </ArrowButton>
      )}
    </div>
  );
};

export default Stories;

const ArrowButton = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 30%;
  cursor: pointer;
  z-index: 5;
  box-shadow: 1px 1px rgba(255, 255, 255, 0.1);
`;

const StoryBorder = styled.div`
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: conic-gradient(
    #f09433,
    #e6683c,
    #dc2743,
    #cc2366,
    #bc1888,
    #f09433
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: black;
    padding: 2px;
    object-fit: cover;
  }
`;
