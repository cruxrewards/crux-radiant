import React, { useEffect, useState } from "react";
import Router from "next/router";
import CircularProgress, {
CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function IDV() {
    const [progress, setProgress] = useState(10);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
            const newProgress = prevProgress >= 100? 100 : prevProgress + 10;

            if (newProgress === 100) {
                clearInterval(timer);
                Router.push("/dash");
            }

            return newProgress;
        })
      }, 800);
      
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return (
      <div className='grow flex flex-col bg-white gradient-background '>
          <h1 style={{marginBottom: '30px', textAlign: 'center', marginTop: '50px'}}>
            Verifying Identity...
          </h1>
            <CircularProgressWithLabel value={progress} />
      </div>
    );
  }
  
  function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
    return (
      <Box sx={{ position: 'relative', textAlign: 'center' }}>
        <CircularProgress
          variant="determinate"
          {...props}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        />
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '52%',
            transform: 'translate(-50%, 50%)', // Adjust this value
          }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    );
  }
  
  