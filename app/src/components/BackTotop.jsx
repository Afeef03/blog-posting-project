import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const BackToTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true, // Show the button immediately on scroll down
    threshold: 100, // Adjust this value based on your preference
  });

  const handleClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Slide direction="up" in={trigger}>
      <Fab color="primary" onClick={handleClick} style={{ position: 'fixed', bottom: '16px', right: '16px' }}>
        <KeyboardArrowUpIcon />
      </Fab>
    </Slide>
  );
};

export default BackToTop;
