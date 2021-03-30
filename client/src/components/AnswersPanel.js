import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
} from "@material-ui/core";


const AnswersPanel = (props) => {
	const { currentTab, index, answers } = props;

	return (
		<Box hidden={currentTab !== index} pt={4}>
			{answers.map((answerObject) => {
				const { _id, answer, userId } = answerObject;

				return (
					<Box my={2} key={_id}>
						<Card>
							<CardHeader
								avatar={<Avatar>A</Avatar>}
								title="Answered by:"
								subheader={userId.userName}
							/>
							<CardContent>
								<Typography variant="body2">{answer}</Typography>
							</CardContent>
						</Card>
					</Box>
				);
			})}
		</Box>
	);
};

export default AnswersPanel;
