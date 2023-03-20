export const funcCheckGuess = (computerNumber: string, userGuess: string): string[] => {
	let result: Record<number, string> = []

	userGuess.split('').forEach((charA, indexA) => {
		if(computerNumber.includes(charA) && computerNumber[indexA] === charA){
			userGuess.slice(0,indexA).split('').forEach((charAA, indexAA) => {
				if(charAA === charA){
					result[indexAA] = '0'
				}
			})
			result[indexA] = '2'
		} else if(
			computerNumber.includes(charA) && 
			computerNumber[indexA] !== charA &&
			!userGuess.slice(0, indexA).includes(charA)
		){
			result[indexA] = '1'
		} else{
			result[indexA] = '0'
		}

	})

	return Object.values(result);
}