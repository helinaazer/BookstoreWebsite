import React from "react";
import { useParams } from "react-router-dom";
import ProfileInfo from "../Components/ProfileInfo";
import NavBar from "../Components/NavBar";
import { UserProvider } from "../Components/UserAdminContext";

// Sample users data (in case you're not using a backend or context for user management)
const usersData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    username: "johndoe123",
    password: "********",
    accountCreated: "2023-01-01",
    shippingAddress: "123 Main St, Anytown, USA",
    phoneNumber: "123-456-7890",
    email: "johndoe@example.com",
    avatar: "/male.png",
    gender: "Male",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    username: "janesmith456",
    password: "********",
    accountCreated: "2023-03-15",
    shippingAddress: "456 Oak St, Sometown, USA",
    phoneNumber: "987-654-3210",
    email: "janesmith@example.com",
    avatar: "/female.png",
    gender: "Female",
  },
];

const Profile = () => {
  const { id } = useParams(); // Get user ID from the route params
  const user = usersData.find((u) => u.id === parseInt(id));

  if (!user) {
    return (
      <div>
        <h2>User not found</h2>
      </div>
    );
  }

  return (
    <div>
      <UserProvider>
        <NavBar
          logoSrc="/St_Mary_COC_Logo_No_Background.png"
          title="St. Mary's Coptic Orthodox Church Bookstore"
        />
      </UserProvider>
      <ProfileInfo user={user} />
    </div>
  );
};

export default Profile;
