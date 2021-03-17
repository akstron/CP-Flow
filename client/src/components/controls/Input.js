import React from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box'

function Input(props) {
    const { label, type, py} = props;

    return (
        <Box py={py}>
            <TextField variant="outlined" 
            fullWidth 
            size="small" 
            label={label}
            type={type}/>
        </Box>
    )
}

export default Input
