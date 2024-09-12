import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Box, Button, Container } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/inspect.png';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'InspectAI',
  description: 'Empowering smarter vehicle inspections with AI-driven insights',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ minHeight: '100vh', height: '100%' }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Link href={'/'}>
              <Button key={'home'} sx={{ color: '#fff' }}>
                <Image src={logo} alt={''} />
              </Button>
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link href={'/'}>
              <Button key={'home'} sx={{ color: '#fff' }}>
                Home
              </Button>
            </Link>
            <Link href={'/demo'}>
              <Button key={'demo'} sx={{ color: '#fff' }} variant='outlined'>
                Try Demo
              </Button>
            </Link>
          </Box>
        </Container>
        {children}
        <Container sx={{ paddingY: 2, textAlign: 'center' }}>
          <footer>
            InspectAI © 2024. All rights reserved. Empowering smarter vehicle
            inspections with AI-driven insights.
          </footer>
        </Container>
      </body>
    </html>
  );
}
