import { Flex, Typography } from "antd";

const { Text } = Typography;

type MenuInfoType = {
  key: string;
  name: string;
};

const FooterInfo = () => {
  return (
    <Flex vertical gap="large">
      <Flex gap={4} style={{ flexFlow: "wrap" }}>
        {MenuInfo.map((item: MenuInfoType, index: number) => (
          <Flex gap={4} key={item.key}>
            <a
              style={{
                fontSize: "var(--system-12-font-size)",
                color: "var(--ig-tertiary-text)",
                textWrap: "nowrap",
              }}
              href="/"
            >
              {item.name}
            </a>
            <Text
              style={{
                fontSize: "var(--system-12-font-size)",
                color: "var(--ig-tertiary-text)",
              }}
            >
              {index + 1 < MenuInfo.length ? "•" : ""}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Text
        style={{
          fontSize: "var(--system-12-font-size)",
          color: "var(--ig-tertiary-text)",
          textWrap: "nowrap",
        }}
      >
        © 2025 Instagram from Meta
      </Text>
    </Flex>
  );
};

export default FooterInfo;

const MenuInfo = [
  {
    key: "about",
    name: "About",
  },
  {
    key: "help",
    name: "Help",
  },
  {
    key: "press",
    name: "Press",
  },
  {
    key: "api",
    name: "API",
  },
  {
    key: "jobs",
    name: "Jobs",
  },
  {
    key: "privacy",
    name: "Privacy",
  },
  {
    key: "terms",
    name: "Terms",
  },
  {
    key: "locations",
    name: "Locations",
  },
  {
    key: "language",
    name: "Language",
  },
  {
    key: "metaVerified",
    name: "Meta Verified",
  },
];
