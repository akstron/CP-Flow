import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const ResponsePanel = (props) => {
	const { currentTab, index, questionId } = props;
    const [answer, setAnswer] = useState('');

    const handleChange = (e) => {
        setAnswer(() => e.target.value);
    }

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("submit started!");

		try{
			const res = await axios.post('/user/answer', {
				"questionId": questionId, 
				"answer": answer
			})
			
		} catch(e) {
			console.log(e);
		}
	
	}

	return (
		<Box 
        component="form"
        hidden={currentTab !== index}
        pt={4}
		onSubmit={handleSubmit}
        >
			<TextField
				multiline
				fullWidth
				variant="outlined"
				rows={8}
				value={answer}
				onChange={handleChange}
				autoFocus
                placeholder={'Write your response here...'}
			/>
            <br/>
            <br/>
            <Button
				color="primary"
				variant="outlined"
				type="submit"
				endIcon={<Icon className="fas fa-reply"/>}
			>
				Answer
			</Button>
		</Box>
	);
};

export default ResponsePanel;
