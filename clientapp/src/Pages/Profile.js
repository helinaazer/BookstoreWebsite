import React from "react";
import ProfileInfo from "../Components/ProfileInfo";
import NavBar from "../Components/NavBar";

const Profile = () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    username: "johndoe123",
    password: "********",
    accountCreated: "2023-01-01",
    shippingAddress: "123 Main St, Anytown, USA",
    phoneNumber: "123-456-7890",
    email: "johndoe@example.com",
    avatar: "/image.png",
  };

  return (
    <div>
      <NavBar />
      <ProfileInfo user={user} />
    </div>
  );
};

export default Profile;
