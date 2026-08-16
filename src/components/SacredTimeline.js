import Container from '@mui/material/Container';
import anime from 'animejs/lib/anime.es.js';
import { useEffect, useState } from 'react';
import '../css/sacredTimeline.css';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import moment from 'moment';

const SacredTimeline = ({ timelineEvents, nexusEvents }) => {

    useEffect(() => {

        anime({
            targets: '#timeline .curve',
            strokeDashoffset: [anime.setDashoffset, 2],
            easing: 'linear',
            duration: 5000,
            delay: function (el, i) { return i * 250 },
            direction: 'normal',
            loop: false
        });

    });

    const [loops] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    return (

        <Container id="timelineContainer" sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '1000px' }}>
            <svg id="timeline" height="500" width="5000px" viewBox='0 -250 1500 500'>
                <line x1="-200" y1="-300" x2="5000" y2="-300" stroke='red' strokeWidth="3px" />
                <path id="sacredTimeline" d="M -200, 0   C0,0  0,0   5000,0" stroke='white' fill='none' strokeWidth="3px" />

                {timelineEvents.sort((objA, objB) => Number(objA?.releaseDate) - Number(objB?.releaseDate)).map((eventData, key) => (
                    <>
                        <TimelineBranchPoint eventData={eventData} nexusData={nexusEvents.find((event) => event.code == eventData.code)} key={key} />
                        {/* <TimelineBranchPoint key={key} /> */}
                        {console.log("Event Data: " , eventData)}
                    </>
                ))}
                <line x1="-100" y1="300" x2="5000" y2="300" stroke='red' strokeWidth="3px" />
            </svg>
        </Container>

    );
}

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 500,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));


const TimelineBranchPoint = ({ eventData, nexusData }) => {

    /// Buckle up buttercup, this is gonna be complex.
    const mcuStartPoint = moment("2008-05-14 00:00:00");
    const yearConst = 365;
    let initialPoint = 10;
    let eventPosition = 0;
    //GET THE TOTAL NUMBER OF DAYS BETWEEN THE MCU START AND NOW
    /*
        diff/total days since start of mcu * 100 * 100| This will give us a number that we can use to scale the timeline based on the number of days since the start of the MCU. We can then use this number to calculate the position of each event on the timeline based on its release date.
    */

    // Calculate event position on timeline based on release date, relative to the start of the MCU
    const calculateEventPosition = (releaseDate, previousEvent) => {
        // console.log("Release Date: " + releaseDate?.toDate());

        if (typeof previousEvent === 'undefined' || previousEvent === null) {
            // return initialPoint;
            let diff = mcuStartPoint.diff(moment(releaseDate?.toDate()), 'days') * (-1);
            // console.log("Diff: " + diff);
            if (diff < 30) {
                // console.log("First Diff " + diff);
                // console.log("First Event " + (initialPoint * 1).toString());
                eventPosition = initialPoint;
                // console.log("Event Position 1: " + eventPosition);
                return eventPosition;
            } else if (diff >= 30) {
                // console.log("Second Diff " + diff);
                // console.log("Second Event " + (initialPoint * 10).toString());
                eventPosition = initialPoint * 10;
                // console.log("Event Position 2: " + eventPosition);
                return eventPosition;
            }
        } else {
            initialPoint = 10;

            let diff = 0;

            if (previousEvent && previousEvent.toDate && releaseDate && releaseDate.toDate) {
                diff = moment(previousEvent.toDate()).diff(moment(releaseDate.toDate()), 'days') * (-1);
            }
            if (diff < 30) {
                // console.log("First Diff " + diff);
                eventPosition = initialPoint * 1;
                console.log("Event Position 3: " + eventPosition);
                return eventPosition;
            } else if (diff >= 30) {
                // console.log("Second Diff " + diff);
                // In this approach we're assigning the event a place on the timeline based on the difference in days from the previous event
                // TODO - Expose multiplier value to give more fine control of timeline scale
                eventPosition = initialPoint * 5;
                console.log("Event Position 4: " + eventPosition);
                return eventPosition;
            }
        }
    }


    // Number of branch points on the timeline.
    const [branchPoints] = useState([1, 2, 3, 4, 5]);

    // By default curves have 3 points, lets call them A, B, C.
    const [controlVPoint, setVControlPoint] = useState(0);
    const [controlHPoint, setHControlPoint] = useState(100);

    // This is point A-Horizontal, where the curve starts on the X or Horizontal axis.
    const [timelineHStartLocation, setTimelineHStartLocation] = useState(0);
    // This is point A-Vertical, where the curve starts on the Y or Vertical axis
    const [timelineVStartLocation, setTimelineVStartLocation] = useState(0);

    // This is point B-Horizontal, where the midpoint of the exist on the X or Horizontal axis. This is the bending point for the curve.
    const [arcHorizontalNum, setArcHorizontalNum] = useState(0);
    // This is point B-Vertical, where the midpoint of the exist on the Y or Vertical axis.
    const [arcVerticalNum, setArcVerticalNum] = useState(0);

    // This is point C-Horizontal, where the curve ends on the X or Horizontal axis.
    const [timelineHEndLocation, setTimelineHEndLocation] = useState(0);
    // This is point C-Vertical, where the curve ends on the Y or Vertical axis.
    const [timelineVEndLocation, setTimelineVEndLocation] = useState(0);

    const randomNumberInRange = (min, max) => {
        // Get number between min (inclusive) and max (inclusive)
    }

    /// Makes sure all variables for the horizonal axis are relative to each other to avoid strange behaviour on the timeline
    const randomNumberChecker = (startPoint, endPoint) => {
        return startPoint >= endPoint;
    }

    useEffect(() => {

        setVControlPoint(randomNumberInRange(100, 200));
        // setArcVerticalNum(randomNumberInRange(-100, 100));
        setTimelineHStartLocation(randomNumberInRange(-170, 70));
        setTimelineVEndLocation(randomNumberInRange(-100, -95))
        setTimelineHEndLocation(randomNumberInRange(-170, 70));

    }, []);

    return (
        <>

            {eventData.isNexusEvent ?
                <g stroke='orange' stroke-width="2" fill='orange' >
                    <HtmlTooltip
                        title={
                            <>
                                <Typography variant="h6" gutterBottom component="div" color="inherit">{eventData.eventTitle}</Typography>
                                <Typography variant="subtitle1" gutterBottom component="div" color="inherit">{moment(eventData.releaseDate.toDate()).format("MMM-DD-YYYY")}</Typography>
                            </>
                        }
                    >
                        <circle id="timelinePoint" className='timelinePoint' cx={calculateEventPosition(eventData?.releaseDate, eventData?.previousEvent)} cy={timelineVStartLocation} r="8" />
                    </HtmlTooltip>
                    <LightTooltip
                        title={
                            <>
                                <Typography variant="h6" gutterBottom component="div" color="inherit">{nexusData.eventTitle}</Typography>
                                <Typography variant="subtitle1" gutterBottom component="div" color="inherit">{moment(nexusData.date.toDate()).format("MMM-DD-YYYY")}</Typography>
                            </>
                        }
                    >
                        <circle id="nexusPoint" className='timelinePoint' cx={calculateEventPosition(eventData?.releaseDate, eventData?.previousEvent) + 125} cy={timelineVStartLocation + (-150)} r="8" />
                    </LightTooltip>

                </g>

                :

                <g stroke='white' stroke-width="8" fill='white' >

                    <HtmlTooltip
                        title={
                            <>
                                <Typography variant="h6" gutterBottom component="div" color="inherit">{eventData.eventTitle}</Typography>
                                <Typography variant="subtitle1" gutterBottom component="div" color="inherit">{moment(eventData?.releaseDate.toDate()).format("MMM-DD-YYYY")}</Typography>
                            </>
                        }
                    >
                        <circle id="pointA" className='timelinePoint' cx={calculateEventPosition(eventData?.releaseDate, eventData?.previousEvent)} cy={timelineVStartLocation} r="4" />
                    </HtmlTooltip>

                </g>
            }

            {eventData.isNexusEvent ?
                <path className="curve" d={`M${eventData.timelinePoint},${timelineVStartLocation} Q${calculateEventPosition(eventData?.releaseDate) + 100},${timelineVStartLocation} ${parseInt(eventData.timelinePoint) + 125},${timelineVStartLocation + (-155)}`} stroke="orange" strokeWidth="5px" stroke-linecap="round" fill="none" />

                :

                <></>
            }

        </>
    );

}

export default SacredTimeline;