import React from "react";
import { Menu, Dropdown } from "antd";

import { ReactComponent as SubMenuIcon } from "assets/icons/submenu.svg";

const SubMenuButton = ({ deletePost }) => {
  return (
    <div className="feed-posts">
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="0">
              <a>Edit</a>
            </Menu.Item>
            <Menu.Item key="1">
              <a onClick={deletePost}>Delete</a>
            </Menu.Item>
          </Menu>
        }
      >
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <SubMenuIcon />
        </a>
      </Dropdown>
    </div>
  );
};

export default SubMenuButton;
