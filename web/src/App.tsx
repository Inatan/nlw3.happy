import { prototype } from 'events';
import React from 'react';

import './styles/global.css'
import 'leaflet/dist/leaflet.css';
import Routes from './routes' 

interface TitleProps {
  text: string;
}

function Title(props: TitleProps){
  return <h1>{props.text}</h1>
}

function App() {
  return (
    <Routes/>
  );
}

export default App;