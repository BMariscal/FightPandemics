import React, { useState, useEffect, useRef } from "react";
import { Menu, Dropdown } from "antd";

import { ReactComponent as SubMenuIcon } from "assets/icons/submenu.svg";

const SubMenuButton = ({ deletePost }) => {
  const [visible, setVisible] = useState(false);

  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };
  const handleMenuClick = (e) => {
    setVisible(false);
  };

  const handleSubMenuClick = (e) => {
    setVisible(true);
    setIsComponentVisible(!isComponentVisible);
  };
  const DropDownMenu = () => {
    return (
      <div ref={ref}>
        {isComponentVisible ? (
          <Dropdown
            onVisibleChange={handleVisibleChange}
            onBlur={() => {
              setVisible(false);
            }}
            visible={visible}
            overlay={
              <Menu onClick={handleMenuClick}>
                <Menu.Item key="0">
                  <a>Edit</a>
                </Menu.Item>
                <Menu.Item key="1">
                  <a onClick={deletePost}>Delete</a>
                </Menu.Item>
              </Menu>
            }
          >
            <a className="ant-dropdown-link" onClick={handleSubMenuClick}>
              <SubMenuIcon />
            </a>
          </Dropdown>
        ) : (
          <a className="ant-dropdown-link" onClick={handleSubMenuClick}>
            <SubMenuIcon />
          </a>
        )}
      </div>
    );
  };
  return <DropDownMenu />;
};

export default SubMenuButton;
