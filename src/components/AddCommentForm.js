
import React, {useState} from 'react';

const AddCommentForm = ({ threatName, setThreatInfo }) => {

    const [username, setUsername] = useState('');
    const [statusText, setStatusText] = useState('');

    const addStatus = async () => {
        const result = await fetch(`/api/threat/${threatName}/add-comment`, {
            method: 'post',
            body: JSON.stringify({ username, text: statusText }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const body = await result.json();
        setThreatInfo(body);
        setUsername('');
        setStatusText('');
    }

    return(
        <div>
            <h3>What is your status?</h3>

            <label htmlFor="agent-name">
                <input type="text" placeholder="Agent Number" name="agent-name" value={username} onChange={(event) => setUsername(event.target.value)}/>
            </label>

            <label htmlFor="agent-status">
                <textarea rows="4" cols="50" placeholder="Status" name="agent-status" value={statusText} onChange={(event) => setStatusText(event.target.value)}/>
            </label>

            <button onClick={() => addStatus()}>Add Status</button>
        </div>
    );
    
};


export default AddCommentForm;