import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SacredTimeline from '../components/SacredTimeline';
import { database } from '../firebase/auth';
import Box from '@mui/material/Box';
import TimelineEventList from '../components/TimelineEventList';


const NexusEventListPage = () => {

    const [nexusEvents, setNexusEventList] = useState([]);
    const [timelineEvents, setTimelineEvents] = useState([]);

    useEffect(() => {
        return database.collection('events').onSnapshot((snapshot) => {
            const eventData = [];
            snapshot.forEach(doc => eventData.push({ ...doc.data(), id: doc.id, firstName: doc.data().firstName, lastName: doc.data().lastName, role: doc.data().role, email: doc.data().email, bio: doc.data().bio }));
            setNexusEventList(eventData);
        });
    }, []);

    useEffect(() => {
        return database.collection('timelineEvents').onSnapshot((snapshot) => {
            const timelineEventData = [];
            snapshot.forEach(doc => timelineEventData.push({ ...doc.data(), id: doc.id, name: doc.data().name, phase: doc.data().phase, releaseDate: doc.data().releaseDate }));
            setTimelineEvents(timelineEventData);
        });
    }, []);

    return (
        <>
            <Container>
                <Grid container >
                    <Grid item xs={6} sm={6}>
                        <h1 className="pageHeader">Sacred Timeline</h1>
                    </Grid>
                    <Grid item xs={6} sm={6} container>
                        <Grid item xs={6} sm={6}>
                            <h4 className="pageHeader">Multiple Nexus Events Detected!</h4>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <div className="redLight"></div>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            <SacredTimeline timelineEvents={timelineEvents} nexusEvents={nexusEvents} />

            <Box sx={{ width: '80%', margin: '0 auto' }}>
                <TimelineEventList timelineEvents={timelineEvents} nexusEvents={nexusEvents} />
            </Box>
        </>
    )


}


export default NexusEventListPage;