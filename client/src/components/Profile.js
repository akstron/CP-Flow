import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { Avatar, Box, Grid, Typography, Tabs, Tab, Icon } from "@material-ui/core";
import QuestionsPanel from "./QuestionsPanel";
import AnswersPanel from "./AnswersPanel";

const Profile = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState({});
    const [currentTab, setCurrentTab] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

	useEffect(() => {
		axios
			.get("user/profile")
			.then((res) => {
				console.log(res);
				console.log(res.data);

				if (res.data.status) {
					setUser(() => res.data.user);
                    setAnswers(() => res.data.user.answers);
                    setQuestions(() => res.data.user.questions);
					setIsLoading(() => false);
				}
			})
			.catch((e) => console.log(e));
	}, []);

	const handleChange = (e, newTab) => {
        setCurrentTab(() => newTab);
    };

	if (isLoading) {
		return (
			<Container>
				<h3>Loading...</h3>
			</Container>
		);
	}

	return (
		<Box mx={4} mt={4}>
			<Grid container>
				<Grid container item xs={4} alignItems="center" direction="column">
					<Avatar>A</Avatar>
					<br />
					<Typography>{user.userName}</Typography>
				</Grid>
				<Grid item xs={8}>
					<Tabs
						value={currentTab}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						centered
					>
						<Tab label="Questions" icon={<Icon className="fas fa-question"/>} />
						<Tab label="Answers" icon={<Icon className="fas fa-reply" />} />
					</Tabs>

					<QuestionsPanel currentTab={currentTab} index={0} questions={questions}/>
                    <AnswersPanel currentTab={currentTab} index={1} answers={answers}/>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Profile;
