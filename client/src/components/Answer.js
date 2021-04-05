import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import IconButton from '@material-ui/core/IconButton';

const Answer = () => {
	const [isAnswerAvailable, setIsAnswerAvailable] = useState(false);
	const [answer, setAnswer] = useState('Nothing till now');
	const [answerId, setAnswerId] = useState('');
	const [isLiked, setIsLiked] = useState(false);

	const handleLike = () => {
		if(isLiked){
			updateLike("decrement", answerId);
		} 
		else{
			updateLike("increment", answerId);
		}
	}
	
	const updateLike = async (option, answerId) => {
		try{
		const res = await axios.patch('/user/answer/like', { option, answerId});
		setIsLiked((isLiked) => !isLiked);
		console.log(res);
		} catch (e) {
			console.log(e);
		}
	}

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
				setIsLiked(() => res.data.isLiked);
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
			<IconButton onClick={handleLike}>
				{isLiked ? <EmojiObjectsIcon style={{color: "yellow"}} fontSize="large"/> : <EmojiObjectsOutlinedIcon fontSize="large"/>}
			</IconButton>
		</Box>
	);
};

export default Answer;
