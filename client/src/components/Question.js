import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import { Tabs, Typography } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import Icon from '@material-ui/core/Icon';
import AnswersPanel from './AnswersPanel';
import ResponsePanel from './ResponsePanel';

const Question = (props) => {
	const { questionId } = props;
	const [isQuestionAvailable, setIsQuestionAvailable] = useState(false);
	const [question, setQuestion] = useState('');
	const [currentTab, setCurrentTab] = useState(0);
    const [answers, setAnswers] = useState([]);

	console.log(questionId);

	const handleChange = (e, newTab) => {
        setCurrentTab(() => newTab);
    };

	useEffect(() => {
		axios
			.get(`user/question/${questionId}`, )
			.then((res) => {
				setIsQuestionAvailable(() => true);
                setQuestion(() => res.data.question.question);
				console.log(res.data.question);
				setAnswers(() => res.data.question.answersId);
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
			<Typography variant="h4">
				Question
			</Typography>
			<br />
			<Typography>
				{question}
			</Typography>
			<br />
			<Tabs
				value={currentTab}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="Responses" icon={<QuestionAnswerRoundedIcon/>}/>
				<Tab label="Answer it?" icon={<Icon className="fas fa-reply"/>}/>
			</Tabs>
            <AnswersPanel currentTab={currentTab} index={0} answers={answers}/>
            <ResponsePanel currentTab={currentTab} index={1}/>
		</Box>
	);
};

export default Question;
