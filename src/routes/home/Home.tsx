import styles from './Home.module.css';
import Blog from './fragments/Blog';
import Fingerprint from './fragments/Fingerprint';
import HomeNavigationButton from './fragments/HomeNavigationButton';
import Quill from './fragments/Quill';

export default function Home() {
  return (
    <div className={styles['container']}>
      <h1 className="text-5xl">MSLF | ADMIN</h1>
      <ul className="grid grid-cols-3 gap-16 justify-items-center self-start">
        <HomeNavigationButton
          title="Update Details"
          route="/update-information"
        >
          <Fingerprint />
        </HomeNavigationButton>
        <HomeNavigationButton title="Edit Poem" route="/poems">
          <Quill />
        </HomeNavigationButton>
        <HomeNavigationButton title="Edit Blog" route="/blogs">
          <Blog />
        </HomeNavigationButton>
      </ul>
    </div>
  );
}
