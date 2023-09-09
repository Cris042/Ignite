import Link from 'next/link';

// Styles
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href="/">
          <img src="/images/logo.svg" alt="logo" />
        </Link>
      </div>
    </header>
  );
}
