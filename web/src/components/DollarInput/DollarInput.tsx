import styles from './DollarInput.module.css';

export const DollarInput = ({
  name,
  onChange,
}: {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={styles.container}>
      <p>$</p>
      <input type="number" name={name} onChange={onChange} />
    </div>
  );
};
