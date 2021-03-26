import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const ResponsePanel = (props) => {
	const { currentTab, index } = props;
    const [answer, setAnswer] = useState('');

    const handleChange = (e) => {
        setAnswer(() => e.target.value);
    }

	return (
		<Box 
        conponent="form"
        hidden={currentTab !== index}
        pt={4}
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
