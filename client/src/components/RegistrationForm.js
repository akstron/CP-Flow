import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Input from "./controls/Input";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

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

function RegistrationForm() {
	const classes = useStyles();

	const [file, setFile] = useState("");
	const [fileURL, setFileURL] = useState("");
	const [formFields, setFormFields] = useState({
		userName: "",
		fullName: "",
		email: "",
		password: "",
		retypedPassword: "",
	});

	const handleChange = (e) => {
		if(e.target.files){
			if(e.target.files.length > 0){
				setFile(() => e.target.files[0]);
				setFileURL(URL.createObjectURL(e.target.files[0]));
			}
		}

		const name = e.target.name;
		const value = e.target.value;
		setFormFields({ ...formFields, [name]: value });
	  };

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log("submitted");

		const formData = new FormData();

		console.log(file);

		formData.append("file", file);
		formData.append("formFields", formFields);

		try {
			const res = await axios.post("/register", formData, {
				"Content-Type": "multipart/form-data",
			});

			console.log(res);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Box pt={6}>
			<Grid container>
				<Grid item xs={3} />
				<Grid item xs={6}>
					<Box py={2} px={2} border={1} borderRadius={16}>
						<Grid container component="form" onSubmit={onSubmit}>
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
										className={classes.input}
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
												type="file"
												src={fileURL}
											>
												A
											</Avatar>
										</Button>
									</label>
								</Grid>
								<Spacing space={3} />
								<Grid item>
									<Button variant="contained" color="primary" type="submit">
										Submit
									</Button>
								</Grid>
							</Grid>
							<Grid item conatiner direction="column" sm={12} md={8}>
								<Grid item xs={12}>
									<Input label={"Username"} type={"text"} py={1} name={'userName'} value={formFields.userName} handleChange={handleChange}/>
								</Grid>
								<Grid item xs={12}>
									<Input label={"Full Name"} type={"text"} py={1} name={'fullName'} value={formFields.fullName} handleChange={handleChange}/>
								</Grid>
								<Grid item xs={12}>
									<Input label={"Email"} type={"text"} py={1} name={'email'} value={formFields.email} handleChange={handleChange}/>
								</Grid>
								<Grid item xs={12}>
									<Input label={"Password"} type={"password"} py={1} name={'password'} value={formFields.password} handleChange={handleChange}/>
								</Grid>
								<Grid item xs={12}>
									<Input label={"Retype password"} type={"password"} py={1} name={'retypedPassword'} value={formFields.retypedPassword} handleChange={handleChange}/>
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

export default RegistrationForm;