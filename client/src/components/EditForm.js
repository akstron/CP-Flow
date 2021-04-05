import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Input from "./controls/Input";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import Loading from './Loading';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	large: {
		width: theme.spacing(15),
		height: theme.spacing(15),
	},
}));

const Spacing = (props) => {
	return (
		<Grid item>
			<Box py={props.space} />
		</Grid>
	);
};
const EditForm = () => {
    const history = useHistory();
    const classes = useStyles();
	let title = 'Edit';
	
	const details = {
		userName: "",
		fullName: "",
		email: "",
	};

	const [file, setFile] = useState(null);
	const [fileURL, setFileURL] = useState("");
	const [formFields, setFormFields] = useState(details);
	const [messages, setMessages] = useState([]);
	const [open, setOpen] = useState(true);
	const [result, setResult] = useState('error');
    const [isLoading, setIsLoading] = useState(true);

	const handleChange = (e) => {
		if (e.target.files) {
			if (e.target.files.length > 0) {
				setFile(() => e.target.files[0]);
				setFileURL(URL.createObjectURL(e.target.files[0]));
			}
		}

		const name = e.target.name;
		const value = e.target.value;
		setFormFields({ ...formFields, [name]: value });
	};

    useEffect(() => {
        axios.get('/user/isLoggedIn').then((res) => {
            const {data: {user: {userName, fullName, email, profilePicture}}} = res; 
            setFormFields({
                userName,
                fullName,
                email
            });
            setFileURL(() => profilePicture);
            setIsLoading(() => false);
        }).catch((e) => {
            console.log(e);
        })

    }, [])

	const onSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append("file", file);
		formData.append("userName", formFields.userName);
		formData.append("fullName", formFields.fullName);
		formData.append("email", formFields.email);
	
		try {
			const res = await axios.patch("/user/edit", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log(res);

			if(res.data.status) {
				setResult(() => "success");
                history.push('/user/profile');
			}
			else {
				setResult(() => "error");
			}
		
			setOpen(() => true);
			setMessages(() => res.data.msgs);
		} catch (e) {
			console.log(e);
		}
	};

    if(isLoading){
        return <Loading/>
    }

	return (
		<Box pt={6}>
			<Grid container>
				<Grid item xs={3} />
				<Grid item xs={6}>
					<Box py={2} px={2} border={1} borderRadius={16}>
						<Grid container direction="column" >
							<Grid container item justify="center">
								<Typography variant="h5" gutterBottom>
								<Icon
									className="fas fa-clipboard-check"
									style={{ color: "blue", fontSize: 25 }}
								/>
									{title}
								</Typography>
							</Grid>
							<Grid item>
								{messages.map((message, index) => {
									return (
										<Collapse in={open} key={index}>
											<Alert
												severity={result}
												onClose={() => {
													setOpen(() => false);
												}}
											>
												{message}
											</Alert>
										</Collapse>
									);
								})}
							</Grid>
							<Grid container item component="form" onSubmit={onSubmit}>
								<Grid
									item
									container
									sm={12}
									md={4}
									direction="column"
									justify="center"
									alignItems="center"
								>
									<Grid item>
										<input
											accept="image/*"
											style={{ display: "none" }}
											id="raised-button-file"
											type="file"
											hidden
											onChange={handleChange}
										/>
										<label htmlFor="raised-button-file">
											<Button component="span">
												<Avatar
													className={classes.large}
													src={fileURL}
												>
													A
												</Avatar>
											</Button>
										</label>
									</Grid>
									<Spacing space={3} />
									<Grid item>
										<Button variant="contained" style={{backgroundColor: 'lightGreen'}} type="submit">
											Save
										</Button>
									</Grid>
								</Grid>
								<Grid container item direction="column" sm={12} md={8}>
									<Grid item xs={12}>
										<Input
											label={"Username"}
											type={"text"}
											py={1}
											name={"userName"}
											value={formFields.userName}
											handleChange={handleChange}
										/>
									</Grid>
									<Grid item xs={12}>
										<Input
											label={"Full Name"}
											type={"text"}
											py={1}
											name={"fullName"}
											value={formFields.fullName}
											handleChange={handleChange}
										/>
									</Grid>
									<Grid item xs={12}>
										<Input
											label={"Email"}
											type={"text"}
											py={1}
											name={"email"}
											value={formFields.email}
											handleChange={handleChange}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</Grid>
				<Grid item xs={3} />
			</Grid>
		</Box>
	);
}

export default EditForm
