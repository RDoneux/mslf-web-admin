import { NavLink } from 'react-router-dom';
import styles from './HomeNavigationButton.module.css';
import { PropsWithChildren } from 'react';

interface HomeNavigationButtonProps {
  title: string;
  icon?: string;
  route: string;
}

export default function HomeNavigationButton({
  title,
  route,
  children
}: PropsWithChildren<HomeNavigationButtonProps>) {
  return (
    <li
      className={`${styles['container']} relative bg-[#353535] overflow-hidden rounded-md text-center`}
    >
      <NavLink className="block h-full" to={route}>
        <h2 className="text-3xl pt-5">{title}</h2>
        {children}
      </NavLink>
    </li>
  );
}
