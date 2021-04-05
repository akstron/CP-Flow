import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Icon } from "@material-ui/core";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';

const AskForm = () => {
	const [question, setQuestion] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		axios.get('/user/isLoggedIn').then((res) => {
			if(res.data.status){
				setIsLoggedIn(() => true);
			}
			setIsLoading(() => false);
		}).catch((e) => {
			console.log(e);
		})
	}, [])

	const onSubmit = async (e) => {
		e.preventDefault();

		try{
			const res = await axios.post('user/ask', {
				question
			})
			setQuestion('');

			console.log(res);
			console.log("submitted");
		} catch (e) {
			console.log(e);
		}

	};

	const handleChange = (e) => {
		const value = e.target.value;
		setQuestion(() => value);
	};

	if(isLoading){
		return <Loading/>
	}

	if(!isLoggedIn){
		return <Redirect to={'/login'}/>
	}

	return (
		<Box px={4} py={4} component="form" onSubmit={onSubmit}>
			<Typography variant="h3">
				<Icon className="fas fa-question" fontSize="large" color="primary" />
				Ask
			</Typography>
			<br />
			<TextField
				multiline
				fullWidth
				variant="outlined"
				rows={12}
				value={question}
				onChange={handleChange}
				autoFocus
				placeholder={'Write your question here...'}
			/>
			<br />
			<br />
			<Button
				color="primary"
				variant="outlined"
				type="submit"
				endIcon={<PublishRoundedIcon />}
			>
				Submit
			</Button>
		</Box>
	);
};

export default AskForm;
