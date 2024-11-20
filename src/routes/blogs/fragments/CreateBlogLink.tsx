import { NavLink } from 'react-router-dom';
import styles from '../../poems/fragments/CreatePoemLink.module.css';
import Blog from '../../home/fragments/Blog';

export default function CreateBlogLink() {
  return (
    <li className={styles['list-item']}>
      <NavLink to="/create-blog">
        <div className={styles['icon-wrapper']}>
          <Blog />
        </div>
        <p className="sm:text-4xl">Create New Blog</p>
      </NavLink>
    </li>
  );
}
