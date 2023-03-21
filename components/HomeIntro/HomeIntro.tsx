import { Title, Text, Button } from '@mantine/core'
import React from 'react'
import styles from './HomeIntro.module.css'
import { useRouter } from 'next/router'

type Props = {}

const HomeIntro = (props: Props) => {

	const router = useRouter();

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<Title order={3} align='center'>Welcome to</Title>
				<Title order={1} align='center'>MASTERMIND</Title>
			</div>
			<div className={styles.howToPlay}>
				<Text size='lg' align='left'>
					The aim of the game is to guess the computer&#39;s number
				</Text>
				<Text size='lg' align='left'>
					With each guess, you will find out whether each digit is correct and in the correct position.
				</Text>
			</div>
			<div className={styles.colorsAll}>

				<div className={styles.colorDetails}>
					<div className={styles.green}>?</div>
					<Text size='lg'>A correct digit in a correct position</Text>
				</div>

				<div className={styles.colorDetails}>
					<div className={styles.yellow}>?</div>
					<Text size='lg'>A correct digit in an incorrect position</Text>
				</div>

				<div className={styles.colorDetails}>
					<div className={styles.red}>?</div>
					<Text size='lg'>An incorrect digit</Text>
				</div>
			</div>
			<div className={styles.buttonsContainer}>
				<Button
					variant='outline'
					size='lg'
					onClick={()=>router.push('/game')}
					classNames={{
						root: styles.buttonPlayRoot
					}}
				>Let&#39;s Play</Button>
			</div>
		</div>
	)
}

export default HomeIntro