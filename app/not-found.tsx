import "./globals.css";
import css from './page.module.css';
import Link from 'next/link';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: `Not found page`,
    description: "Sorry, the page you were looking for doesn't exist.",
    openGraph: {
      title: `Not found page`,
      description: "Sorry, the page you were looking for doesn't exist.",
      url: `https://notehub.com/404`,
      siteName: "Not found page",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Page not found image",
        },
      ],
      type: "article",
    },
  };

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