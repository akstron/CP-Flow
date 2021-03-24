import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container';
import axios from 'axios';

const Profile = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('user/profile')
        .then((res) => {
            console.log(res);
            console.log(res.data.status);
            if(res.data.status) setIsLoading(() => false);
        }).catch(e => console.log(e))

        axios.get('user/questions/605b8b1444d256358c7fff66')
        .then((res) => {
            console.log(res);
        }).catch(e => console.log(e))
    }, [])

    if(isLoading){
        return (
            <Container >
                <h3>Loading...</h3>
            </Container>
        );
    }

    return (
        <div>
            Profile Section
        </div>
    )
}

export default Profile
