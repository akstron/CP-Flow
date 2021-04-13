import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useHistory } from 'react-router-dom';
import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
} from "@material-ui/core";


const AnswersPanel = (props) => {
	const { currentTab, index, answers } = props;
	const history = useHistory();

	const handleClick = (id) => {
		history.push(`/user/answer/${id}`);
	}

	return (
		<Box hidden={currentTab !== index} pt={4}>
			{answers.map((answerObject) => {
				const { _id, answer, answeredBy } = answerObject;

				return (
					<Box my={2} key={_id} onClick={() => handleClick(_id)}>
						<Card>
							<CardHeader
								avatar={<Avatar>A</Avatar>}
								title="Answered by:"
								subheader={answeredBy}
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
