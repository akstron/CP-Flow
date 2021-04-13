import { Box, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Loading from './Loading';

const Home = () => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    if(isLoading){
        return <Loading/>;
    }

    return (
        <Box py={4} px={4}>
            <Typography variant="h4">
                Recent questions
            </Typography>
            
        </Box>
    )
}

export default Home
