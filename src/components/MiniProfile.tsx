import { ReactNode } from "react";
import FlexBox from "./FlexBox";
import TextTypo from "./TextTypo";

type MiniProfileProps = {
  padding?: string;
  imageUrl: string;
  imageSize?: number;
  name: string;
  activeTime?: string;
  description?: ReactNode;
  suffix?: ReactNode;
  showFullName?: boolean;
};

const MiniProfile = ({
  padding,
  imageUrl,
  imageSize = 32,
  name,
  activeTime,
  description,
  suffix,
  showFullName = false,
}: MiniProfileProps) => {
  return (
    <FlexBox align="center" justify="space-between" width="100%">
      <FlexBox
        gap={12}
        align="center"
        width="100%"
        padding={padding}
        style={{ maxWidth: showFullName ? "100%" : 221 }}
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
            aspectRatio: 1,
          }}
        />
        <FlexBox vertical width="100%">
          <FlexBox gap={4}>
            <TextTypo
              style={{ maxWidth: "80%" }}
              strong
              ellipsis
              pointer
              text={name}
            />
            {activeTime && (
              <FlexBox gap={4}>
                <TextTypo color="var(--ig-secondary-text)" text="•" />
                <TextTypo color="var(--ig-secondary-text)" text={activeTime} />
              </FlexBox>
            )}
          </FlexBox>
          {description}
        </FlexBox>
      </FlexBox>
      {suffix}
    </FlexBox>
  );
};

export default MiniProfile;
