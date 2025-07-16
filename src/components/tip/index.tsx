import tipIcon from '../../assets/tip.svg';
import styles from './styles.module.css';

type Props = {
  tip: string;
};

export function Tip({ tip }: Props) {
  return (
    <div className={styles.tip}>
      <img src={tipIcon} alt="Icone de dica"  />

      <div>
        <h3>Dica</h3>
        <p>{tip}</p>
      </div>
    </div>
  );
}
