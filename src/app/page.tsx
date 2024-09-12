import { Container, Button, Box, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container
      maxWidth='md'
      style={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box textAlign={'center'}>
        <Typography
          variant='h1'
          sx={{ fontSize: '60px', textAlign: 'center' }}
          fontWeight={'bold'}
        >
          Revolutionize Vehicle Inspections with AI-Powered Precision.
        </Typography>
        <Link href={'/demo'}>
          <Button
            key={'demo'}
            sx={{ color: '#554646', bgcolor: 'white', margin: 2 }}
            variant='outlined'
          >
            Try Demo
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
