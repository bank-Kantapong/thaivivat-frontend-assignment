import { Typography } from "antd";
import { EllipsisConfig } from "antd/es/typography/Base";
import { CSSProperties } from "react";

const { Text } = Typography;

type TextTypoType = {
  text: string;
  color?: string;
  weight?: number;
  strong?: boolean;
  fontSize?: string;
  style?: CSSProperties;
  ellipsis?: EllipsisConfig | boolean;
  pointer?: boolean;
};

const TextTypo = ({
  text = "",
  color = "var(--ig-primary-text)",
  weight,
  strong,
  fontSize = "var(--system-14-font-size)",
  style,
  ellipsis,
  pointer,
}: TextTypoType) => {
  return (
    <Text
      strong={strong}
      ellipsis={ellipsis}
      style={{
        color,
        fontWeight: weight,
        fontSize,
        textWrap: "nowrap",
        cursor: pointer ? "pointer" : "default",
        ...style,
      }}
    >
      {text}
    </Text>
  );
};

export default TextTypo;
