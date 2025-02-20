import React, { useState } from 'react';

// Define the component with React.FC (Function Component) type.
const Dashboard: React.FC = () => {
  const [status, setStatus] = useState<string>("disconnected");

  const sendCommand = async (command: string): Promise<void> => {
    try {
      // We assume the robot control endpoint is set up under /api/robotControl
      const res = await fetch('/api/robotControl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command })
      });
      const data = await res.json();
      console.log("Response from robot:", data);
      // Optionally update status based on successful response here
    } catch (error) {
      console.error("Error sending command", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Robot Dashboard</h1>
      <p>Robot status: {status}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "200px" }}>
        <button onClick={() => sendCommand('start')}>Start Robot</button>
        <button onClick={() => sendCommand('stop')}>Stop Robot</button>
        <button onClick={() => sendCommand('move-forward')}>Move Forward</button>
        <button onClick={() => sendCommand('move-backward')}>Move Backward</button>
      </div>
    </div>
  );
};

export default Dashboard; 