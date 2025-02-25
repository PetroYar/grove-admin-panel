import React from "react";

import styles from "./Loyout.module.css";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import Logo from "../logo/Logo";
import Button from "../button/Button";

const Loyout = ({ children }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.loyout}>
      <aside className={styles.aside}>
        <Logo />
        <nav>
          <ul className={styles.list}>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : styles.item
                }
                to={"/"}
              >
                Головна
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to={"/productsMeneger"}
              >
                Продукти
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to={"/warehouse"}
              >
                Склад
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to={"/reviews"}
              >
                Відгуки
              </NavLink>
            </li> */}
          </ul>
        </nav>
        <Button onClick={logout}>Вийти</Button>
      </aside>

      <section className={styles.content}>
        <Outlet />
      </section>
    </div>
  );
};

export default Loyout;
