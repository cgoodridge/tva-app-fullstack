import React from 'react';
import Container from '@mui/material/Container';


const AboutPage = () => (
    <>
        <Container>
            <h1 className="pageHeader">History of the TVA</h1>
            <p className="pageText">"Long ago, there was a vast multiversal war. Countless unique timelines battled each other for supremacy, nearly resulting in the total destruction of... well, everything. 
                But then, the all-knowing Time-Keepers emerged, bringing peace by reorganizing the multiverse into a single timeline, the Sacred Timeline." </p>
            <p className="pageText">
                Countless timelines battled one another for dominance across the Multiverse in a cataclysmic war that lasted for eons and nearly resulted in the absolute destruction of existence. 
                To prevent this, the Time-Keepers brought peace and order to the Multiverse by arranging the timelines into a single "Sacred Timeline". 
                In order to preserve the timeline's proper flow, the Time-Keepers then created the Time Variance Authority to police the Multiverse from Variants who create nexus events by stepping off of the path that the Time-Keepers created. 
                If nexus events are left unchecked, the timeline could branch off and lead to another multiversal war.
            </p>
            <div className="pageImage">
                <img src="images/Time-Keepers_Character_Poster.jpg" alt="The timekeepers" style={{width:'80%', paddingBottom: '16px'}}/>
            </div>
        </Container>
        
    </>
    
)

export default AboutPage;