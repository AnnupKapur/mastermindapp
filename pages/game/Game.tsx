import { Button, PinInput, Title, ActionIcon } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import styles from './Game.module.css'
import DisplayResult from '../../components/DisplayResult'
import { Guess } from '../../types/Guess'
import cloneDeep from 'lodash/cloneDeep'
import { funcCheckGuess } from '../../utils/funcCheckGuess'
import Head from 'next/head'
import { FaHome } from 'react-icons/fa'
import { useRouter } from 'next/router'

type Props = {}

const Game = (props: Props) => {

	const [strUserInput, setstrUserInput] = useState<string>();
	const [arrComputerNumber, setarrComputerNumber] = useState<string[]>()
	const [arrGuesses, setarrGuesses] = useState<Guess[]>();
	const [bChecking, setbChecking] = useState<boolean>(false);
	const [bLoading, setbLoading] = useState<boolean>(false);
	const [bWinner, setbWinner] = useState(false);
	const router = useRouter();

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
			setbLoading(true);
		}
	}

	const funcHandleInputKeyboardAction = (objEvent:  React.KeyboardEvent<HTMLDivElement>) => {
		switch(objEvent.key){
			case 'Enter':
				if(strUserInput?.length === 4){
					funcHandleCheckButton();
				}
				break;
		}
	}

	useEffect(()=>{
		setarrComputerNumber(funcCreateGameNumber());
	},[])

	useEffect(()=>{
		if(bLoading){
			setTimeout(()=>{
				setbLoading(false)
			}, 10)
		}
	},[bLoading])

	//USED FOR DEVELOPMENT
	// useEffect(()=>{console.log(arrComputerNumber)},[arrComputerNumber])

	return (
		<div className={styles.container}>      
			<Head>
				<title>Play The Game</title>
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>
			<Button
				variant='filled'
				radius='xl'
				onClick={()=>router.push('/')}
				classNames={{
					root: styles.homeButton,
					inner: styles.homeButtonIcon,
				}}
			>
				<FaHome />
			</Button>
			<div className={styles.input} data-result={arrGuesses ? arrGuesses[arrGuesses?.length-1].result : ''}>
				{(arrGuesses && arrGuesses.length>0 && arrGuesses[arrGuesses.length-1].result === '2222') && (
					<Title order={2}>{`You Won in ${arrGuesses.length} guesses !!!`}</Title>
				)}
				{(
					(!bLoading && !arrGuesses) || 
					(!bLoading && arrGuesses && arrGuesses.length>0 && arrGuesses[arrGuesses.length-1].result !== '2222') || 
					(!bLoading && arrGuesses && arrGuesses.length === 0)
				) && (
					<PinInput
						id='pins'
						autoFocus
						size='xl'
						length={4} 
						type="number"
						value={strUserInput}
						onChange={(e) => setstrUserInput(e)}
						onKeyDown={funcHandleInputKeyboardAction}
						classNames={{
							input: styles.pinsInput,
							root: styles.pinsRoot
						}}
					/>
				)}
				{funcValidInput() && (
					<Button 
						size='lg'
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
				{(
					!funcValidInput() &&
					(
						!arrGuesses ||
						(arrGuesses && arrGuesses.length>0 && arrGuesses[arrGuesses.length-1].result !== '2222') ||
						(arrGuesses && arrGuesses.length === 0)
					)
				) && (
					<Title order={2}>Enter A Number</Title>
				)}
				{(
					arrGuesses && arrGuesses.length>0 && arrGuesses[arrGuesses.length-1].result === '2222'
				) && (
					<Button 
						size='lg'
						variant='outline'
						uppercase
						onClick={()=>setarrGuesses(undefined)}
						classNames={{
							root: styles.replayButtonRoot,
						}}
					>
						Play Again
					</Button>
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