import { NavLink } from 'react-router-dom';
import styles from './EditPoemLink.module.css';
import { IPoem } from '../../../interfaces/IPoem';
import EditIcon from './EditIcon';

interface EditPoemLinkProps {
  poem: IPoem;
}

export default function EditPoemLink({ poem }: EditPoemLinkProps) {
  return (
    <li className={styles['list-item']}>
      <NavLink to="/create-poem">
        <div className={styles['icon-wrapper']}>
            <EditIcon />
        </div>
        <p>{poem.title}</p>
      </NavLink>
    </li>
  );
}
