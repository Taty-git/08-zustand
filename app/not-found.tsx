import "./globals.css";
import css from './page.module.css';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="error">
            <h1>404 - Page not found</h1>
            <p className={css.description}>
                Sorry, the page you are looking for does not exist.
            </p>
            <Link href="/" className={css.link}>← Back to home</Link>
        </div>
    );

}
export default NotFound;