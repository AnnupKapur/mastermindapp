import React from 'react'
import { Guess } from '../../types/Guess'
import styles from './DisplayResult.module.css'

type Props = {
	objGuess: Guess;
}

const DIsplayResult = ({
	objGuess
}: Props) => {
	return (
		<div className={styles.container} data-result={objGuess.result}>
			{objGuess.guess.split('').map((char, index) => {
				switch(objGuess.result[index]){
					case '0':
						return (
							<div 
								key={`${objGuess.id}${index}`} 
								className={styles.incorrect}
							>
								{char}
							</div>
						)
					case '1':
						return (
							<div 
								key={`${objGuess.id}${index}`} 
								className={styles.halfCorrect}
							>
								{char}
							</div>
						)
					case '2':
						return (
							<div 
								key={`${objGuess.id}${index}`} 
								className={styles.correct}
							>
								{char}
							</div>
						)
					default:
						return (
							<div 
								key={`${objGuess.id}${index}`} 
								className={styles.error}
							>
								X
							</div>
						)
				}
			})}
			{objGuess.result === '2222' && (
				<>
					<div className={styles.winner_right}>
						🥳
					</div>
					<div className={styles.winner_left}>
						🥳
					</div>
				</>
				)}
		</div>
	)
}

export default DIsplayResult