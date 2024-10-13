import { NavLink } from 'react-router-dom';
import styles from './CreatePoemLink.module.css';
import Quill from '../../home/fragments/Quill';

export default function CreatePoemLink() {
  return (
      <li className={styles['list-item']}>
        <NavLink to="/create-poem">
          <div className={styles['icon-wrapper']}>
            <Quill />
          </div>
          <p>Create New Poem</p>
        </NavLink>
      </li>
  );
}
