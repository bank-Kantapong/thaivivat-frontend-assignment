import { Flex } from "antd";
import { CSSProperties, ReactNode } from "react";

type FlexBoxType = {
  padding?: string;
  margin?: string;
  style?: CSSProperties;
  width?: string | number;
  height?: string | number;
  gap?: string | number;
  justify?: string;
  align?: string;
  vertical?: boolean;
  children: ReactNode;
};

const FlexBox = ({
  padding,
  margin,
  style,
  width,
  height,
  gap,
  justify,
  align,
  vertical = false,
  children,
}: FlexBoxType) => {
  return (
    <Flex
      vertical={vertical}
      justify={justify}
      align={align}
      gap={gap}
      style={{ ...style, width, height, margin, padding }}
    >
      {children}
    </Flex>
  );
};

export default FlexBox;
