import React from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box'

function Input(props) {
    const { label, type, py, name, value, handleChange} = props;

    return (
        <Box py={py}>
            <TextField variant="outlined" 
            fullWidth 
            size="small" 
            name={name}
            value={value}
            label={label}
            type={type}
            onChange={handleChange}/>
        </Box>
    )
}

export default Input
