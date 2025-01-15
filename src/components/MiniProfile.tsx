import { Flex, Typography } from "antd";
import { CSSProperties, ReactNode } from "react";

const { Text } = Typography;

type MiniProfileProps = {
  style?: CSSProperties;
  imageUrl: string;
  imageSize?: number;
  name: string;
  activeTime?: string;
  description?: ReactNode;
  suffix?: ReactNode;
};

const MiniProfile = ({
  style,
  imageUrl,
  imageSize = 32,
  name,
  activeTime,
  description,
  suffix,
}: MiniProfileProps) => {
  return (
    <Flex align="center" justify="space-between" style={{ width: "100%" }}>
      <Flex
        gap={12}
        align="center"
        style={{ ...style, maxWidth: 221, width: "100%" }}
      >
        <img
          src={imageUrl}
          width={imageSize}
          height={imageSize}
          alt="profile"
          style={{
            cursor: "pointer",
            borderRadius: "100%",
            objectFit: "cover",
          }}
        />
        <Flex vertical>
          <Flex gap={4}>
            <Text
              style={{ color: "white", cursor: "pointer", maxWidth: "80%" }}
              strong
              ellipsis
            >
              {name}
            </Text>
            {activeTime && (
              <Flex gap={4}>
                <Text style={{ color: "var(--ig-secondary-text)" }}>•</Text>
                <Text style={{ color: "var(--ig-secondary-text)" }}>
                  {activeTime}
                </Text>
              </Flex>
            )}
          </Flex>
          {description}
        </Flex>
      </Flex>
      {suffix}
    </Flex>
  );
};

export default MiniProfile;
