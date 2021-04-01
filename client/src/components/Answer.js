import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const Answer = () => {
	const [isAnswerAvailable, setIsAnswerAvailable] = useState(false);
	const [answer, setAnswer] = useState('Nothing till now');
	const [answerId, setAnswerId] = useState('');

	useEffect(() => {
		const address = window.location.href;
		const addressParts = address.split('/');
		const id = addressParts[addressParts.length - 1];
		setAnswerId(() => id);

		axios
			.get(window.location.href, )
			.then((res) => {
				setIsAnswerAvailable(() => true);
                setAnswer(() => res.data.answer.answer);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	if (!isAnswerAvailable) {
		return <h2>Loading...</h2>;
	}

	return (
		<Box px={4} py={4}>
			<Typography variant="h4">
				Answer
			</Typography>
			<br />
			<Typography>
				{answer}
			</Typography>
		</Box>
	);
};

export default Answer;
