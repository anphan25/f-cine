import { Card, CardMedia } from '@mui/material';

const UpcomingCard = () => {
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: '10px',
          border: '1px solid #e3e3e3',
          cursor: 'pointer',
        }}
      >
        <CardMedia
          component="img"
          height="500px"
          image="https://i.rada.vn/data/image/2022/05/05/doctor-strange-2-poster.jpg"
          alt="green iguana"
        />
      </Card>
    </>
  );
};

export default UpcomingCard;
