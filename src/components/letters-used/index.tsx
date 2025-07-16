import { Letter } from '../letter'
import styles from './styles.module.css'

export function LettersUsed() {
  
  return(
    <div className={styles.lettersUsed}>
      <h5>Letras utilizadas</h5>
      <div>

      <Letter value='R'  size='small' color='wrong'/>
      <Letter value='X'  size='small' />
      </div>
    </div>
  )
}