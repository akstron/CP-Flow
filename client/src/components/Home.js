import { Box, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Loading from './Loading';
import QuestionsPanel from './QuestionsPanel';

const Home = () => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('/questions')
        .then((res) => {
            const { data: {status, questions} } = res;
            if(status){
                setQuestions(questions);
                setIsLoading(false);
            }
        }).catch((e) => {
            console.log(e);
        })
    }, []);

    if(isLoading){
        return <Loading/>;
    }

    return (
        <Box py={4} px={4}>
            <Typography variant="h4">
                Recent questions
            </Typography>
            <QuestionsPanel currentTab={1} index={1} questions={questions}/>
        </Box>
    )
}

export default Home
