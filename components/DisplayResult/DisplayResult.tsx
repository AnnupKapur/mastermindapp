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
					if(objGuess.result[index] === '0'){
						return (
							<div 
								key={objGuess.id} 
								className={styles.incorrect}
							>
								{char}
							</div>
						)
					} else if(char === '1'){
						return (
							<div 
								key={objGuess.id} 
								className={styles.halfCorrect}
							>
								{char}
							</div>
						)
					} else if(objGuess.result[index] === '2'){
						return (
							<div 
								key={objGuess.id} 
								className={styles.correct}
							>
								{char}
							</div>
						)
					}
			})}
		</div>
	)
}

export default DIsplayResult