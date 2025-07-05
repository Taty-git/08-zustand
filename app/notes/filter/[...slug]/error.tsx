'use client';

import css from "./NotesPage.module.css";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <>
      {error && (
        <div className="error">
          <p>
            Something went wrong. <br />
            {error.message}
          </p>
          <button className={css.button} onClick={() => reset()}>
            Try againe
          </button>
        </div>
      )}
    </>
  );
};

export default Error;
