import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Input from "./controls/Input";
import Avatar from "@material-ui/core/Avatar";
import LockIcon from "@material-ui/icons/Lock";
import axios from 'axios';
import Button from '@material-ui/core/Button'

function LoginForm() {
	const [formFields, setFormFields] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormFields({ ...formFields, [name]: value });
	};

    const onSubmit = async (e) => {
        e.preventDefault();

		try {
			const res = await axios.post("/login", 
			{"email": formFields.email, 
			"password": formFields.password});

			console.log('done');
			console.log(res);
		} catch (e) {
			console.log(e);
		}
    }

	return (
		<Box pt={6}>
			<Grid container>
				<Grid item xs={3} md={4} />
				<Grid item xs={6} md={4}>
					<Box py={1} px={1} border={1} borderRadius={16}>
						<Grid container component="form" onSubmit={onSubmit} direction="column" alignItems="center">
							<Grid item xs={12}>
								<Avatar>
									<LockIcon />
								</Avatar>
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
                            <Grid item>
									<Button variant="contained" color="primary" type="submit">
										Submit
									</Button>
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
