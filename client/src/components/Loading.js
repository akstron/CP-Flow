import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const Loading = () => {
	return (
		<Grid
			container
			style={{ height: "100vh", width: "100vw"}}
		>
			<Grid container item alignItems="center" justify="center">
				<CircularProgress style={{color: 'green'}}/>
			</Grid>
		</Grid>
	);
};

export default Loading;
