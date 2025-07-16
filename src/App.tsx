import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { Button } from './components/button';
import { Header } from './components/header';
import { Input } from './components/input';
import { Letter } from './components/letter';
import { LettersUsed, type LettersUsedProps } from './components/letters-used';
import { Tip } from './components/tip';
import { type Challenge, WORDS } from './utils/words';

function App() {
  const [score, setScore] = useState(0);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [letter, setLetter] = useState('');
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);

  function handleRestartGame() {
    const isConfirmed = window.confirm("Tem certeza?")

    if(isConfirmed){
      startGame();
    }
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];

    setChallenge(randomWord);
    setScore(0);
    setLetter('');
    setLettersUsed([]);
  }

  function endGame(message: string) {
    alert(message);
    startGame();
  }

  function handleConfirm() {
    if (!challenge) {
      return;
    }

    if (!letter.trim()) {
      return alert('Digite uma letra');
    }

    const value = letter.toUpperCase();
    const exists = lettersUsed.find(used => used.value.toUpperCase() === value);

    if (exists) {
      setLetter('');
      return alert('Já utilizou a letra ' + value);
    }

    const hits = challenge.word
      .toUpperCase()
      .split('')
      .filter(char => char === value).length;

    const correct = hits > 0;
    const currentScore = score + hits;

    setLettersUsed(prevState => [...prevState, { value, correct }]);
    setScore(currentScore);
    setLetter('');
  }

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (!challenge) {
      return;
    }

    setTimeout(() => {
      if (score === challenge.word.length) {
        return endGame('Parabéns, você descobriu a palavra');
      }

      const attemptLimit = challenge.word.length + 5;
      if (lettersUsed.length === attemptLimit) {
        return endGame('Que pena, perdeu!');
      }
    }, 200);
  }, [score, lettersUsed.length]);

  if (!challenge) {
    return;
  }

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={lettersUsed.length}
          max={challenge.word.length + 5}
          onRestart={handleRestartGame}
        />
        <Tip tip={challenge.tip} />

        <div className={styles.word}>
          {challenge.word.split('').map((letter, index) => {
            const letterUsed = lettersUsed.find(
              used => used.value.toUpperCase() === letter.toUpperCase(),
            );

            return (
              <Letter
                key={index}
                value={letterUsed?.value}
                color={letterUsed?.correct ? 'correct' : 'default'}
              />
            );
          })}
        </div>

        <h4>Palpite</h4>
        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={e => setLetter(e.target.value)}
          />
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>

        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  );
}

export default App;
