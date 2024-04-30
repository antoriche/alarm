import React, { useState } from "react";
import { Avatar, Popover } from "antd";
import { Auth } from "aws-amplify";
import { useUser } from "../../services/auth";
import classNames from "./UserMenu.module.css";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const UserDropdown = ({ logOut }) => (
  <div role="button" tabIndex={0} className={classNames.userMenuMenuItem} onClick={logOut} onKeyDown={logOut}>
    <LogoutOutlined style={{ marginRight: 8 }} />
    Log out
  </div>
);

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { email: username } = useUser();
  const logout = () => Auth.signOut();
  const user = username ? username.split("@")[0] : "";
  if (user) {
    return (
      <Popover
        className={classNames.userMenuPopover}
        trigger="click"
        placement="bottomRight"
        content={<UserDropdown logOut={logout} />}
        open={open}
        onOpenChange={setOpen}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ marginBottom: 0, marginRight: 8 }}>{user}</p>
          <Avatar icon={<UserOutlined />} size="large" />
        </div>
      </Popover>
    );
  }
  return null;
};

export default UserMenu;
