import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useHistory } from 'react-router-dom';
import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
} from "@material-ui/core";


const QuestionsPanel = (props) => {
	const history = useHistory();
	const { currentTab, index, questions } = props;

	const onClick = (index) => {
		history.push(`/user/question/${questions[index]._id}`);
	}

	return (
		<Box hidden={currentTab !== index} pt={4}>
			{questions.map((questionObject, index) => {
				const { _id, question } = questionObject;

				return (
					<Box my={2} key={_id} onClick={() => onClick(index)}>
						<Card>
							<CardHeader
								avatar={<Avatar>A</Avatar>}
								title="Asked by:"
								subheader="someone"
							/>
							<CardContent>
								<Typography variant="body2">{question}</Typography>
							</CardContent>
						</Card>
					</Box>
				);
			})}
		</Box>
	);
};

export default QuestionsPanel;
