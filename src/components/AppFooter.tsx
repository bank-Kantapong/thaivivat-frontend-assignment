import FlexBox from "./FlexBox";
import { appFooterItems, MENU_KEY } from "../utils/constantData";
import { ReactNode } from "react";

const AppFooter = () => {
  return (
    <FlexBox justify="space-between" align="center" gap="large" width="100%">
      {appFooterItems.map((item: { key: MENU_KEY; icon: ReactNode }) => (
        <FlexBox key={item.key}>{item.icon}</FlexBox>
      ))}
    </FlexBox>
  );
};

export default AppFooter;
