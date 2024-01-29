import styles from './InputError.module.scss';

export default function InputError({ children }) {
  return children ? (
    <p className={`${styles.InputError}`}>
      {children}
    </p>
  ) : null;
}
