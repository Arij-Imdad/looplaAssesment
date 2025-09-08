import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function EventCard({data}) {
  return (
    <Card sx={{ minWidth: 275 , margin: '20px'}}>
      <CardContent>
        <Typography variant="h5">
          {data.title}
        </Typography>
        <Typography variant="light">
         Date: {data.date}
        </Typography>
        <Typography>
         Location: {data.location}
        </Typography>
      </CardContent>
    </Card>
  );
}