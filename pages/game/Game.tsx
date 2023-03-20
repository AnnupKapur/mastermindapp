import { Button, PinInput, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import styles from './Game.module.css'
import DisplayResult from '../../components/DisplayResult'
import { Guess } from '../../types/Guess'
import cloneDeep from 'lodash/cloneDeep'
import { funcCheckGuess } from '../../utils/funcCheckGuess'

type Props = {}

const Game = (props: Props) => {

	const [strUserInput, setstrUserInput] = useState<string>();
	const [arrComputerNumber, setarrComputerNumber] = useState<string[]>()
	const [arrGuesses, setarrGuesses] = useState<Guess[]>();
	const [bChecking, setbChecking] = useState<boolean>(false);

	const arrValidOptions = ['0','1','2','3','4','5','6','7','8','9'];

	const funcValidInput = ():boolean => {
		if(!strUserInput) return false;
		if(strUserInput && strUserInput.length !== 4) return false;
		return true;
	}

	const funcCreateGameNumber = ():string[] => {
		let arrOptions = ['0','1','2','3','4','5','6','7','8','9'];
		let arrOutput:string[] = [];
		for(let n = 0; n <= 3; n++){
			const intRandom = Math.floor(Math.random() * arrOptions.length);
			arrOutput.push(arrOptions[intRandom])
			arrOptions = [
				...arrOptions.slice(0, intRandom),
				...arrOptions.slice(intRandom+1)
			];
		}
		return arrOutput
	}

	const funcProcessResult = ():string => {
		let resultTracker = [ '0', '0', '0', '0' ];
		let user = cloneDeep(strUserInput) || [];
		let computer = cloneDeep(arrComputerNumber) || [];
		let index = 0;

		for(let char of user){
			if(computer.includes(char)){
				if(computer[index] === char){
					resultTracker[index] = '2';
				} else if (!computer.slice(0, index).includes(char)) {
					resultTracker[index] = '1';
				}
				let indexPrev = 0;
				for(let prev of user.slice(0, index)){
					if(
						prev === char &&
						resultTracker[index] >= resultTracker[indexPrev]
					){
						resultTracker[indexPrev] = '0';
					}
					indexPrev += 1
				}
			}
			index += 1;
		}

		return resultTracker.join('');
	}

	const funcAddToGuesses = (strGuess:string, strResult:string):void => {
		let guessesUpdated = cloneDeep(arrGuesses) || [];
		guessesUpdated.push({id: crypto.randomUUID(), guess: strGuess, result: strResult});
		setarrGuesses(guessesUpdated);
	}

	const funcHandleCheckButton = () => {
		if(strUserInput && arrComputerNumber){
			const checkResult = funcCheckGuess(arrComputerNumber.join('') ,strUserInput);
			funcAddToGuesses(strUserInput, checkResult.join(''));
			setstrUserInput('');
		}
	}

	useEffect(()=>{
		setarrComputerNumber(funcCreateGameNumber());
	},[])

	useEffect(()=>{console.log(arrComputerNumber)},[arrComputerNumber])

	return (
		<div className={styles.container}>
			<div className={styles.input}>
				<PinInput 
					length={4} 
					type="number"
					value={strUserInput}
					onChange={(e) => setstrUserInput(e)}
					classNames={{
						input: styles.pinsInput,
						root: styles.pinsRoot
					}}
				/>
				{funcValidInput() && (
					<Button 
						loading={bChecking}
						loaderPosition='right'
						variant='outline'
						uppercase
						disabled={!funcValidInput()}
						onClick={funcHandleCheckButton}
						classNames={{
							root: styles.checkButtonRoot,
						}}
					>
						Check
					</Button>
				)}
				{!funcValidInput() && (
					<Title order={2}>Enter A Number</Title>
				)}
			</div>
			<div className={styles.guesses}>
				{arrGuesses?.map(objGuess => (
					<DisplayResult 
						key={objGuess.id}
						objGuess={objGuess}
					/>
				))}
			</div>
			<div className={styles.footer}>
				<p>
					This game was made by Annup Raj Kapur of Skittles.School Tuition
				</p>
			</div>
		</div>
	)
}

export default Game