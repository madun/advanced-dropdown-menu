import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";

import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

function App() {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />

      <NavItem icon={<CaretIcon />}>
        {/* dropdown goes here */}
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main"); // settings, animals
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className={props.avatar ? "icon-avatar" : "icon-button"}>
          {props.leftIcon}
        </span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight} // onEnter from life cycle React Hooks
      >
        <div className="menu">
          <DropdownItem
            leftIcon={
              <img src="https://scontent-xsp1-2.cdninstagram.com/v/t51.2885-19/s320x320/81695115_883103332128890_6165597987754999808_n.jpg?_nc_ht=scontent-xsp1-2.cdninstagram.com&_nc_cat=102&_nc_ohc=ykVV-sIzPMEAX_7Z9bk&oh=63e99d75397aa1ca87e76efb670161b5&oe=5EC30043" />
            }
            avatar
          >
            Ilman Manarul Qori
          </DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight} // onEnter from life cycle React Hooks
      >
        <div className="menu">
          <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main">
            Settings
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>1</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>2</DropdownItem>
          <DropdownItem>3</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false); // default value false

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

export default App;
