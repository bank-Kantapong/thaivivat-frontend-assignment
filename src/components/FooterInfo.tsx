import FlexBox from "./FlexBox";
import TextTypo from "./TextTypo";

type MenuInfoType = {
  key: string;
  name: string;
};

const FooterInfo = () => {
  return (
    <FlexBox vertical gap="large">
      <FlexBox gap={4} style={{ flexFlow: "wrap" }}>
        {MenuInfo.map((item: MenuInfoType, index: number) => (
          <FlexBox gap={4} key={item.key}>
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
            <TextTypo
              fontSize="var(--system-12-font-size)"
              color="var(--ig-tertiary-text)"
              text={index + 1 < MenuInfo.length ? "•" : ""}
            />
          </FlexBox>
        ))}
      </FlexBox>
      <TextTypo
        fontSize="var(--system-12-font-size)"
        color="var(--ig-tertiary-text)"
        text="© 2025 Instagram from Meta"
      />
    </FlexBox>
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
