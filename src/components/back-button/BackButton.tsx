import styles from './BackButton.module.css';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <span
      onClick={() => navigate(-1)}
      className={`material-symbols-outlined ${styles['back-button']}`}
    >
      arrow_back
    </span>
  );
}
