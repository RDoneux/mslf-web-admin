import styles from './Footer.module.css';
import { version, name } from '../../../package.json';
import Logout from '../../authentication/Logout';

export default function Footer() {
  return (
    <footer className={styles['footer']}>
      <span className={`${styles['app-title']} dots`}>{name}</span>
      <span className={styles['app-version']}>App Version: {version}</span>
      <Logout />
    </footer>
  );
}
