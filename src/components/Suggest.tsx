import { Button, Flex, Typography } from "antd";
import { useGetUserQuery, UserItemType } from "../api/apiSlice";
import { useMemo } from "react";
import MiniProfile from "./MiniProfile";

const { Text } = Typography;

const Suggest = () => {
  const { data: chracters, error, isLoading } = useGetUserQuery({});

  const suggestUsers = useMemo(() => {
    return chracters?.data?.slice(0, 5);
  }, [chracters?.data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: Something went wrong!</p>;

  return (
    <Flex vertical style={{ margin: "24px 0 20px" }}>
      <Flex justify="space-between" style={{ padding: "4px 16px 4px 0" }}>
        <Text style={{ color: "var(--ig-secondary-text)" }}>
          Suggested for you
        </Text>
        <Text style={{ color: "white" }}>See All</Text>
      </Flex>
      <Flex vertical style={{ padding: "8px 0" }}>
        {suggestUsers?.map((item: UserItemType) => (
          <MiniProfile
            key={item._id}
            imageUrl={item.imageUrl}
            style={{ padding: "8px 0" }}
            imageSize={44}
            name={item.name}
            description={
              <Text
                style={{
                  color: "var(--ig-secondary-text)",
                  fontSize: "var(--system-12-font-size)",
                  width: "97%"
                }}
                ellipsis
              >
                Followed by Mufasa + 10 more
              </Text>
            }
            suffix={<Button type="link">Follow</Button>}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Suggest;
