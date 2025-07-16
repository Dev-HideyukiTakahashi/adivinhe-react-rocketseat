import styles from './app.module.css';
import { Header } from './components/header';

function handleRestartGame() {
  alert("Reiniciar o jogo")
}

function App() {
  return (
    <div className={styles.container}>
      <main>
        <Header current={5} max={10} onRestart={handleRestartGame} />
      </main>
    </div>
  );
}

export default App;
