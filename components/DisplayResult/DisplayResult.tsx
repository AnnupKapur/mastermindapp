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
		<div className={styles.container}>
			{objGuess.guess.split('').map((char, index) => {
				switch(objGuess.result[index]){
					case '0':
						return (
							<div 
								key={objGuess.id} 
								className={styles.incorrect}
							>
								{char}
							</div>
						)
					case '1':
						return (
							<div 
								key={objGuess.id} 
								className={styles.halfCorrect}
							>
								{char}
							</div>
						)
					case '2':
						return (
							<div 
								key={objGuess.id} 
								className={styles.correct}
							>
								{char}
							</div>
						)
					default:
						return (
							<div 
								key={objGuess.id} 
								className={styles.error}
							>
								X
							</div>
						)
				}
			})}
		</div>
	)
}

export default DIsplayResult