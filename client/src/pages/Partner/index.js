import { message, Tabs } from 'antd';
import TheatreList from './TheatreList';
import { useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Partner = () => {
  const navigate = useNavigate();

  const checkUser = useCallback(async () => {
    try {
      const user = await axios.get("/api/users/get-current-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (user.data.data.role === "user") {
        navigate("/");
        message.error("You are not allowed to access this page");
      } else if (user.data.data.role === "admin") {
        navigate("/admin");
        message.error("You are not allowed to access this page");
      }
      // You can handle other roles or conditions here
    } catch (error) {
      console.error('Error checking user:', error);
      // Handle error appropriately
    }
  }, [navigate]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const items = [
    {
      key: '1',
      label: 'Theatres',
      children: <TheatreList />,
    }
    // Add more tabs as needed
  ];

  return (
    <>
      <h1>Partner Page</h1>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
}

export default Partner;
