import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { SocketContext } from './context/SocketContext';
import { parseMessage } from './context/parseData';
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

function Home() {
  const socket = useContext(SocketContext);
  const [state, setState] = useState({
    src: {
      message: 'callPatient',
      body: {
        patientId: '123456789',
      },
    },
  });
  const [received, setReceived] = useState({
    src: {},
  });
  const handleSend = () => {
    localStorage.setItem('message', JSON.stringify(state.src));
    socket.write(JSON.stringify(state.src), () => {});
    console.log(state.src);
  };

  useEffect(() => {
    socket.on('data', (data: string) => {
      const message = parseMessage(data);
      setReceived({ src: message });
    });
  }, [socket]);

  useEffect(() => {
    const message = localStorage.getItem('message');
    console.log(message);
    if (message) {
      setState({ src: JSON.parse(message) });
    }
  }, []);

  return (
    <React.Fragment>
      <div
        style={{
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '20px',
          height: '100vh',
        }}>
        <textarea
          style={{ width: '100%', height: '400px' }}
          value={JSON.stringify(state.src, null, 2)}
          onChange={(e) => {
            setState({ src: JSON.parse(e.target.value) });
          }}
        />{' '}
        <DynamicReactJson src={received.src}></DynamicReactJson>
        <button onClick={handleSend}>send to server</button>
      </div>
    </React.Fragment>
  );
}

export default Home;
