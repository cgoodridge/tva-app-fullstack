import React, { useState, useEffect } from 'react';
import NotFoundPage from './NotFoundPage';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typical from 'react-typical';
import moment from 'moment';
import '../css/eventDetails.css';
import { useLocation } from 'react-router-dom';


const EventDetailPage = ({ match }) => {

    const location = useLocation();

    const code = location?.state?.eventData?.code;
    // console.log(location.state.eventData);

    const [eventInfo, setEventInfo] = useState({
        code: '',
        releaseDate: '',
        pageTitle: '',
        titleImg: '',
        introText: '',
        changedText: '',
        extraText: '',
        originalText: '',
        scenarioText: '',
        bodyImg: '',
        notableChanges: [],
    });

    useEffect(() => {
        if (location?.state?.eventData) {
            const eventData = location.state.eventData;
            setEventInfo({
                ...eventData,
                releaseDate: eventData.releaseDate?.seconds
                    ? moment(new Date(eventData.releaseDate.seconds * 1000)).format('MMM-DD-YYYY')
                    : eventData.releaseDate || 'Invalid Date',
            });
        }
    }, [location]);

    if (!code) return <NotFoundPage />

    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg">
                <Grid container style={{ paddingTop: '32px', paddingBottom: '32px' }}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5" component="h6" className="pageHeader" style={{ textAlign: 'left' }} gutterBottom>
                            {eventInfo?.eventTitle}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" component="h2" className="pageHeader" style={{ textAlign: 'right' }} gutterBottom>
                        {eventInfo.releaseDate}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container style={{ paddingTop: '32px', paddingBottom: '32px' }}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="h2" className="pageHeader" style={{ textAlign: 'left', lineHeight: '2.0' }} gutterBottom>
                            {eventInfo.introText}
                        </Typography>
                        {eventInfo.scenarioText === "" ? <></>

                            :

                            <Typography variant="body1" component="h2" className="pageHeader" style={{ textAlign: 'left', lineHeight: '2.0' }} gutterBottom>
                                {eventInfo.scenarioText} <Typical steps={[eventInfo.originalText, 8000, eventInfo.changedText, 3000]} loop={1} wrapper="span" />
                                {eventInfo.extraText === "" ? console.log("Extra text is empty") : <Typical steps={["", 15000, eventInfo.extraText, 5000]} loop={1} wrapper="span" />}
                            </Typography>
                        }

                        <Typography variant="body1" component="h2" className="pageHeader" style={{ textAlign: 'left', lineHeight: '2.0' }} gutterBottom>
                            {eventInfo.bodyText}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="pageImage">
                            <img src={eventInfo?.titleImg} alt="Captain Carter" style={{ width: '90%' }}></img>
                        </div>
                    </Grid>
                </Grid>



                <Grid container style={{ paddingTop: '32px', paddingBottom: '32px' }}>
                    <Grid item xs={12} sm={6}>
                        <div className="pageImage" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
                            <img src={eventInfo?.bodyImg} alt={eventInfo.pageTitle} style={{ width: '90%' }}></img>
                        </div>
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                        {eventInfo.notableChange.map((change, key) => (
                            <Typography key={key} variant="body1" component="h2" className="pageHeader" style={{ textAlign: 'left', lineHeight: '2.0' }} gutterBottom>
                                {change}
                            </Typography>
                        ))}
                    </Grid> */}
                </Grid>

                <Typography variant="body1" component="h2" className="pageHeader" style={{ textAlign: 'left', lineHeight: '2.0' }} gutterBottom>
                    Some info taken from Marvel Cinematic Universe Wiki pages
                </Typography>
            </Container>

            {/* <ThreatLevelSection threatName={name} threatLevel={threatInfo.threatLevel} setThreatInfo={setThreatInfo}/>
            {threat.content.map((paragraph, key) => (
                <p key={key}>{paragraph}</p>
            ))}
            <AddCommentForm threatName={name} setThreatInfo={setThreatInfo} />
            <CommentsList comments={threatInfo.comments} /> */}

        </>
    );


}

export default EventDetailPage;