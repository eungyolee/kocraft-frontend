import React, { useState } from 'react';
import Box from '../components/Box';
import Sidebar from '../components/Sidebar';
import './styles/Home.css';

export default function Home() {
  const [items, setItems] = useState([]);
  const postObj = {setState : setItems};

  return (
    <>
      <Box setState={postObj} />
      <Sidebar />
    </>
  );
}