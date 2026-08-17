import React, { useState, useEffect } from 'react';
import MembersList from '../components/MembersList';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { database } from '../firebase/auth';



const MembersListPage = ({ match }) => {

    const [members, setMembersList] = useState([]);

    useEffect(() => {
        return database.collection('users').onSnapshot((snapshot) => {
            const userData = [];
            snapshot.forEach(doc => userData.push({ ...doc.data(), id: doc.id, firstName: doc.data().firstName, lastName: doc.data().lastName, role: doc.data().role, email: doc.data().email, bio: doc.data().bio }));
            setMembersList(userData);
        });
    }, []);

    return (
        <>
            <Container>
                <h1 className="pageHeader" >Members</h1>
                <Grid container spacing={2} >
                    <MembersList members={members} />
                </Grid>
            </Container>
        </>
    )
}




export default MembersListPage;