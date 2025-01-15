import MiniProfile from "./MiniProfile";
import Profile_image from "../assets/profile.jpg";
import { Button } from "antd";
import TextTypo from "./TextTypo";

const MyProfile = () => {
  return (
    <MiniProfile
      imageUrl={Profile_image}
      imageSize={44}
      name="Guest"
      description={
        <TextTypo color="var(--ig-secondary-text)" text="Mock User" />
      }
      suffix={<Button type="link">Switch</Button>}
    />
  );
};

export default MyProfile;
