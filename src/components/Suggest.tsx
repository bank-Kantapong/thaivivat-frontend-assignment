import { Button } from "antd";
import { useGetUserQuery, UserItemType } from "../api/apiSlice";
import { useMemo } from "react";
import MiniProfile from "./MiniProfile";
import FlexBox from "./FlexBox";
import TextTypo from "./TextTypo";

const Suggest = () => {
  const { data: chracters, error } = useGetUserQuery({});

  const suggestUsers = useMemo(() => {
    return chracters?.data?.slice(0, 5);
  }, [chracters?.data]);

  if (error)
    return <p style={{ color: "white" }}>Error: Something went wrong!</p>;

  return (
    <FlexBox vertical margin="24px 0 20px">
      <FlexBox justify="space-between" padding="4px 16px 4px 0">
        <TextTypo color="var(--ig-secondary-text)" text="Suggested for you" />
        <TextTypo text="See All" />
      </FlexBox>
      <FlexBox vertical padding="8px 0">
        {suggestUsers?.map((item: UserItemType) => (
          <MiniProfile
            key={item._id}
            imageUrl={item.imageUrl}
            padding="8px 0"
            imageSize={44}
            name={item.name}
            description={
              <TextTypo
                color="var(--ig-secondary-text)"
                fontSize="var(--system-12-font-size)"
                style={{
                  width: "97%",
                }}
                ellipsis
                text="Followed by Mufasa + 10 more"
              />
            }
            suffix={<Button type="link">Follow</Button>}
          />
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export default Suggest;
