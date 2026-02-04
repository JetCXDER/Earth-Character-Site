import React, { useState } from "react";
import { navItems } from "./utils";

function NavBar() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo">🌍 EarthApp</div>
        {navItems.map((item) => (
          <div key={item.title} className="nav-item">
            <button onClick={() => setOpenMenu(openMenu === item.title ? null : item.title)}>
            {item.icon && <item.icon size={18} />}
          <span>{item.title}</span>
        </button>

        {openMenu === item.title && item.submenu && (
          <div className="dropdown">
            {item.submenu.map((sub) => (
              <a key={sub.title} href={sub.href}>
                {sub.icon && <sub.icon size={16} />}
                {sub.title}
              </a>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
  <div className="nav-right">
    {/* Right side items */}
  </div>
</nav>

  );
}

export default NavBar;
