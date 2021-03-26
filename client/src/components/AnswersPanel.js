import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	Collapse,
	IconButton,
} from "@material-ui/core";


const AnswersPanel = (props) => {
	const { currentTab, index, answers } = props;

	return (
		<Box hidden={currentTab !== index} pt={4}>
			{answers.map((answerObject, index) => {
				const { _id, answer } = answerObject;
				console.log(index);

				return (
					<Box my={2} key={_id}>
						<Card>
							<CardHeader
								avatar={<Avatar>A</Avatar>}
								title="Answered by:"
								subheader="someone"
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
