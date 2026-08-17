import React from 'react';

const ThreatLevelSection = ({ threatName, threatLevel, setThreatInfo }) => {

    const escalateThreat = async () => {
        const result = await fetch(`/api/threat/${threatName}/threat-level`, {
            method: 'post',
        });
        const body = await result.json();
        setThreatInfo(body);
    }
    return(
        <div>
            <button onClick={() => escalateThreat()}>Escalate Threat</button>
            <p>Threat level is currently at {threatLevel}!</p>
        </div>
    );
};


export default ThreatLevelSection;