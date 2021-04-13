import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Input from "./controls/Input";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import registerImage from "../images/register.png";

const RegistrationForm = () => {

	const details = {
		userName: "",
		fullName: "",
		email: "",
		password: "",
		retypedPassword: "",
	};

	const [file, setFile] = useState(null);
	const [fileURL, setFileURL] = useState("");
	const [formFields, setFormFields] = useState(details);
	const [messages, setMessages] = useState([]);
	const [open, setOpen] = useState(true);
	const [result, setResult] = useState("error");

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

	const onSubmit = async (e) => {
		console.log('something');
		e.preventDefault();

		const formData = new FormData();

		formData.append("file", file);
		formData.append("userName", formFields.userName);
		formData.append("fullName", formFields.fullName);
		formData.append("email", formFields.email);
		formData.append("password", formFields.password);
		formData.append("retypedPassword", formFields.retypedPassword);

		try {
			const res = await axios.post("/register", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log(res);

			if (res.data.status) {
				setResult(() => "success");
				setFormFields(() => {
					return {
						userName: "",
						fullName: "",
						email: "",
						password: "",
						retypedPassword: "",
					};
				});
				setFileURL(() => "");
				setFile(() => null);
			} else {
				setResult(() => "error");
			}

			setOpen(() => true);
			setMessages(() => res.data.msgs);
		} catch (e) {
			console.log(e);
			setResult(() => "error");
			setMessages(() => ['Something went wrong! Try again']);
			setOpen(() => true);
		}
	};

	return (
		<Box pt={6}>
			<Grid container>
				<Grid item xs={2} />
				<Grid item xs={8}>
					<Box
						my={2}
						mx={2}
						py={2}
						px={2}
						borderRadius={16}
						style={{
							boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.25)",
						}}
					>
						<Grid container>
							<Grid container item justify="center" xs={12}>
								<Typography variant="h5" gutterBottom>
									<Icon
										className="fas fa-clipboard-check"
										style={{ color: "#3CB371", fontSize: "1.75rem" }}
									/>
									Register
								</Typography>
							</Grid>
							<Grid item xs={12}>
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
							<Grid
								item
								xs={12}
								md={7}
								style={{
									paddingTop: 20,
									paddingRight: 20,
									paddingLeft: 20,
								}}
							>
								<Grid
									container
									item
									justify="space-between"
									style={{ height: "100%" }}
									conponent="form"
								>
									<Grid container item justify="center" xs={12}>
										<input
											accept="image/*"
											id="imput-profile-pic"
											type="file"
											hidden
											onChange={handleChange}
										/>
										<label htmlFor="imput-profile-pic">
											<Button component="span">
												<Avatar
													src={fileURL}
													style={{ width: "100px", height: "100px", backgroundColor: '#6B8E23'}}
												>
													{formFields.userName?formFields.userName[0]:'N'}
												</Avatar>
											</Button>
										</label>
									</Grid>
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
									<Grid item xs={12}>
										<Input
											label={"Password"}
											type={"password"}
											py={1}
											name={"password"}
											value={formFields.password}
											handleChange={handleChange}
										/>
									</Grid>
									<Grid item xs={12}>
										<Input
											label={"Retype password"}
											type={"password"}
											py={1}
											name={"retypedPassword"}
											value={formFields.retypedPassword}
											handleChange={handleChange}
										/>
									</Grid>
									<Grid
										container
										item
										justify="center"
										style={{ paddingTop: 10 }}
									>
										<Button variant="contained" style={{backgroundColor: '#98FB98'}} onClick={onSubmit}>
											Submit
										</Button>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={false} md={5}>
								<img src={registerImage} style={{ width: "100%" }} />
							</Grid>
						</Grid>
					</Box>
				</Grid>
				<Grid item xs={2} />
			</Grid>
		</Box>
	);
};

export default RegistrationForm;
