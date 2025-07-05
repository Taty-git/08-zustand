'use client';

import css from './TagsMenu.module.css';
import React, {useState} from 'react';
import Link from 'next/link';

export const TagsMenu = () => {
    const tagList = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className={css.menuContainer}>
          <button
            onClick={() => setOpenMenu((prev) => !prev)}
            className={css.menuButton}
          >
            Notes{" "}
            <span
              style={
                openMenu !== false
                  ? { display: "inline-block", transform: "rotate(60deg)" }
                  : {}
              }
            >       
            </span>
          </button>
          {openMenu && (
            <ul className={css.menuList}>
              {tagList.map((tag) => {
                return (
                  <li key={tag} className={css.menuItem}>
                    <Link
                      onClick={() => setOpenMenu((prev) => !prev)}
                      href={`/notes/filter/${tag}`}
                      className={css.menuLink}
                    >
                      {tag}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      );
    };