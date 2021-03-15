import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link as RouterLink } from "react-router-dom";
import { links } from "./links";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	hover: {
		'&:hover': {
		  color: '#FFF',
		}
	  },
}));

const Navbar = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="sticky">
				<Toolbar>
					<Typography color="inherit" variant="h6" align="center">
						CP-Flow
					</Typography>
					<Grid container justify="space-around">
						{links.map((linkItem) => {
							const { id, link, name } = linkItem;
							return (
								<Grid item key={id}>
									<Button className={classes.hover} component={RouterLink} to={link} color="inherit" >
										{name}
									</Button>
								</Grid>
							);
						})}
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
};


export default Navbar;
