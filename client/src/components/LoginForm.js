import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Input from "./controls/Input";
import Avatar from "@material-ui/core/Avatar";
import LockIcon from "@material-ui/icons/Lock";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

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

function LoginForm() {
	const classes = useStyles();

	const [formFields, setFormFields] = useState({
		email: "",
		password: "",
	});

	const [isloggedIn, setIsLoggedIn] = useState(false);
	const [redirectURL, setRedirectURL] = useState("/something");

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormFields({ ...formFields, [name]: value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post("/login", {
				email: formFields.email,
				password: formFields.password,
			});

			const { status, msg } = res;
			if (status) {
				setRedirectURL("/");
				setIsLoggedIn(true);
			} else {
				console.log(res);
			}
		} catch (e) {
			console.log(e);
		}
	};

	if (isloggedIn) {
		return <Redirect to={redirectURL} />;
	}

	return (
		<Box pt={6}>
			<Grid container>
				<Grid item xs={3} md={4} />
				<Grid item xs={6} md={4}>
					<Box py={1} px={1} border={1} borderRadius={16}>
						<Grid
							container
							spacing={1}
							component="form"
							onSubmit={onSubmit}
							direction="column"
						>
							<Grid
								container
								item
								direction="column"
								xs={12}
								alignItems="center"
							>
								<Grid item>
									<Avatar style={{backgroundColor: 'orange'}}>
										<LockIcon  fontSize="large" />
									</Avatar>
								</Grid>
								<Grid item>
									<Typography>
										Sign In
									</Typography>
								</Grid>
							</Grid>
							<Spacing space={1}/>
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
							<Spacing space={1}/>
							<Grid container item>
								<Grid item xs={12}>
									<Button fullWidth={true} variant="contained" color="primary" type="submit">
										Submit
									</Button>
								</Grid>
							</Grid>
							<Grid container item>
								<Grid item xs>
									<Link component={RouterLink} to="/forgot" variant="body2">
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link component={RouterLink} to="/register" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</Grid>
				<Grid item xs={3} md={4} />
			</Grid>
		</Box>
	);
}

export default LoginForm;
