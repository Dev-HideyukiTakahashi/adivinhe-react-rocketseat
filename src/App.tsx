import styles from './app.module.css';
import { Button } from './components/button';
import { Header } from './components/header';
import { Input } from './components/input';
import { Letter } from './components/letter';
import { LettersUsed } from './components/letters-used';
import { Tip } from './components/tip';


function handleRestartGame() {
  alert('Reiniciar o jogo');
}

function App() {
  return (
    <div className={styles.container}>
      <main>
        <Header current={5} max={10} onRestart={handleRestartGame} />
        <Tip tip="Linguagem de programação dinâmica" />

        <div className={styles.word}>
          <Letter value="R" />
          <Letter value="E" />
          <Letter value="A" />
          <Letter value="C" />
          <Letter value="T" />
        </div>

        <h4>Palpite</h4>
        <div className={styles.guess}>
          <Input autoFocus maxLength={1} placeholder='?'/>
          <Button title="Confirmar"/>
        </div>

        <LettersUsed/>
      </main>
    </div>
  );
}

export default App;
