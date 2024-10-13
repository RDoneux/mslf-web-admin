import { NavLink } from 'react-router-dom';
import styles from './EditPoemLink.module.css';
import { IPoem } from '../../../interfaces/IPoem';
import EditIcon from './EditIcon';
import DeletePoemButton from './DeletePoemButton';

interface EditPoemLinkProps {
  poem: IPoem;
  reloadPoems: () => void;
}

export default function EditPoemLink({ poem, reloadPoems }: EditPoemLinkProps) {
  return (
    <li className={styles['list-item']}>
      <NavLink to={`/create-poem/${poem.id}`}>
        <div className={styles['icon-wrapper']}>
          <EditIcon />
        </div>
        <p className="text-3xl">{poem.title}</p>
        <p className="text-base">
          {poem.dateCreated?.toDate().toLocaleString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </NavLink>
      <DeletePoemButton
        poemId={poem.id}
        poemTitle={poem.title}
        reloadPoems={reloadPoems}
      />
    </li>
  );
}
