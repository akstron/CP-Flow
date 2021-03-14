import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment'

function Input(props) {
    const { label, type } = props;

    return (

            <TextField variant="outlined" 
            fullWidth 
            size="small" 
            label={label}
            type={type}/>
    )
}

export default Input
