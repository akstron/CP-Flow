import React from "react";
import Grid from "@material-ui/core/Grid";
import Input from "./controls/Input";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

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

	return (
		<Box pt={6}>
			<Grid container>
				<Grid item xs={3} />
				<Grid item xs={6}>
					<Box py={2} px={2} border={1} borderRadius={16}>
						<Grid container>
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
									<Button>
										<Avatar className={classes.large}>A</Avatar>
									</Button>
								</Grid>
								<Spacing space={3} />
								<Grid item>
									<Button variant="contained" color="primary">Submit</Button>
								</Grid>
							</Grid>
							<Grid item conatiner direction="column" sm={12} md={8}>
								<Grid item xs={12}>
									<Input label={"Username"} type={"text"} />
								</Grid>
								<Spacing space={1} />
								<Grid item xs={12}>
									<Input label={"Full Name"} type={"text"} />
								</Grid>
								<Spacing space={1} />
								<Grid item xs={12}>
									<Input label={"Email"} type={"text"} />
								</Grid>
								<Spacing space={1} />
								<Grid item xs={12}>
									<Input label={"Password"} type={"password"} />
								</Grid>
								<Spacing space={1} />
								<Grid item xs={12}>
									<Input label={"Retype password"} type={"password"} />
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
