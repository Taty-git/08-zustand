'use client';

import css from './SidebarNotes.module.css';
import React from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';

const NotesSidebar = () => {
  const tagsList = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];
  const pathname = usePathname();

  return (
    <ul className={css.menuList}>
      {tagsList.map((tag, index) => {
        return (
          <li key={index} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`}
              className={clsx(css.menuLink, pathname === `/notes/filter/${tag}` && css.active)}
            >
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NotesSidebar;