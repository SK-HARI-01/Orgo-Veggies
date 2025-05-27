import React from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import Toppage from './Toppage.jsx';
import React from 'react-ga4'
ReactGA.initialize("G-0NHSLTFVYD")
ReactGA.send("pageview");
createRoot(document.getElementById('root')).render(<Toppage />);
