// Navbar.jsx
import { useState } from "react";
import { Menu, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const menuItems = [
    { key: "/", label: "Home", path: "/" },
    { key: "/about", label: "About", path: "/about" },
    { key: "/services", label: "Services", path: "/services" },
    { key: "/contact", label: "Contact", path: "/contact" },
  ];

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="https://assets.grok.com/users/2c61054b-87b9-42dd-b6e9-b1e4ce6d4e9c/xbrV6C7PDQWx3KQs-generated_image.jpg"
                alt="medHelp logo"
                className="h-10 w-auto" // Added size constraints
              />
              {/* Optional: Add text beside logo */}
              <span className="ml-2 text-2xl font-bold text-blue-600 hidden sm:inline">
                medHelp
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Menu
              theme="light"
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={menuItems.map((item) => ({
                key: item.key,
                label: (
                  <Link
                    to={item.path}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                ),
              }))}
              className="border-none"
            />
          </div>

          <div className="rounded-full w-[50px] h-[50px] border-2 border-blue-500"></div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={showDrawer}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <MenuOutlined className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer placement="right" onClose={onClose} open={visible}>
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems.map((item) => ({
            key: item.key,
            label: (
              <Link
                to={item.path}
                onClick={onClose}
                className="text-gray-700 hover:text-blue-600"
              >
                {item.label}
              </Link>
            ),
          }))}
        />
      </Drawer>
    </nav>
  );
};

export default NavBar;
