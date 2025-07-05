import css from "./Footer.module.css";

function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
            <p>Developer: Tetiana Bystrova</p>
            <p>
                Contact us: 
                <a href="<mailto:taty.bystrova@gmail.com>"> taty.bystrova@gmail.com</a>
            </p>                                                      
        </div>
      </div>
    </footer>
  );
}

export default Footer;