import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { SocketContext } from './context/SocketContext';
import { parseMessage } from './context/parseData';
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

function Home() {
  const socket = useContext(SocketContext);
  const [state, setState] = useState({
    src: {
      message: 'testMessage',
      body: {
        patientId: 1,
      },
    },
  });
  const [received, setReceived] = useState({
    src: {},
  });
  const handleSend = () => {
    socket.write(JSON.stringify(state.src), () => {});
    console.log(state.src);
  };

  useEffect(() => {
    socket.on('data', (data: string) => {
      const message = parseMessage(data);
      setReceived({ src: message });
    });
  }, [socket]);

  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '20px',
          height: '100vh',
        }}>
        <DynamicReactJson
          displayDataTypes={false}
          onEdit={(e) => {
            console.log(e);
            setState({ src: e.updated_src });
          }}
          onDelete={(e) => {
            console.log(e);
            setState({ src: e.updated_src });
          }}
          onAdd={(e) => {
            console.log(e);
            setState({ src: e.updated_src });
          }}
          src={state.src}
        />{' '}
        <DynamicReactJson src={received.src}></DynamicReactJson>
        <button onClick={handleSend}>send to server</button>
      </div>
    </React.Fragment>
  );
}

export default Home;
