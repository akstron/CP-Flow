import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import { IconButton, Tabs, Typography } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";
import Icon from "@material-ui/core/Icon";
import AnswersPanel from "./AnswersPanel";
import ResponsePanel from "./ResponsePanel";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";


const Question = () => {
	const [isQuestionAvailable, setIsQuestionAvailable] = useState(false);
	const [question, setQuestion] = useState("");
	const [currentTab, setCurrentTab] = useState(0);
	const [answers, setAnswers] = useState([]);
	const [questionId, setQuestionId] = useState("");
	const [isLiked, setIsLiked] = useState(false);

	const handleChange = (e, newTab) => {
		setCurrentTab(() => newTab);
	};

	const handleLike = () => {
		if(isLiked){
			updateLike("decrement", questionId);
		} 
		else{
			updateLike("increment", questionId);
		}
	}

	const updateLike = async (option, questionId) => {
		try{
		const res = await axios.patch('/user/question/like', { option, questionId});
		setIsLiked((isLiked) => !isLiked);
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		const address = window.location.href;
		const addressParts = address.split("/");
		const id = addressParts[addressParts.length - 1];
		setQuestionId(() => id);

		axios
			.get(window.location.href)
			.then((res) => {
				setIsLiked(() => res.data.isLiked);
				setIsQuestionAvailable(() => true);
				setQuestion(() => res.data.question.question);
				setAnswers(() => res.data.question.answersId);
				console.log(res.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	if (!isQuestionAvailable) {
		return <h2>Loading...</h2>;
	}

	return (
		<Box px={4} py={4}>
			<Typography variant="h4">Question</Typography>
			<br />
			<Typography>{question}</Typography>
			<br />
			<IconButton onClick={handleLike}>
				{isLiked ? <EmojiObjectsIcon style={{color: "yellow"}} fontSize="large"/> : <EmojiObjectsOutlinedIcon fontSize="large"/>}
			</IconButton>
			<br />
			<Tabs
				value={currentTab}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="Responses" icon={<QuestionAnswerRoundedIcon />} />
				<Tab label="Answer it?" icon={<Icon className="fas fa-reply" />} />
			</Tabs>
			<AnswersPanel currentTab={currentTab} index={0} answers={answers} />
			<ResponsePanel
				currentTab={currentTab}
				index={1}
				questionId={questionId}
			/>
		</Box>
	);
};

export default Question;
