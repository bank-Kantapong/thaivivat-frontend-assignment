import MiniProfile from "./MiniProfile";
import Profile_image from "../assets/profile.jpg";
import { Button, Typography } from "antd";

const { Text } = Typography;

const MyProfile = () => {
  return (
    <MiniProfile
      imageUrl={Profile_image}
      imageSize={44}
      name="Guest"
      description={
        <Text style={{ color: "var(--ig-secondary-text)" }}>Mock User</Text>
      }
      suffix={<Button type="link">Switch</Button>}
    />
  );
};

export default MyProfile;
