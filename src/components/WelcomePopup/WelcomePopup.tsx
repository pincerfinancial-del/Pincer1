import { useEffect, useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import Head from 'next/head';

const SEEN_KEY = 'pincer-welcome-seen';

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(SEEN_KEY)) return;
    setOpen(true);
    const id = window.setTimeout(() => {
      localStorage.setItem(SEEN_KEY, '1');
    }, 400);
    return () => window.clearTimeout(id);
  }, []);

  if (!open) return null;

  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Special+Elite&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Box
        position='fixed'
        inset='0'
        bg='blackAlpha.500'
        zIndex={2000}
        display='flex'
        alignItems='center'
        justifyContent='center'
        px={4}
      >
        <Box
          bg='#f15a12'
          color='#1a0d08'
          maxW='380px'
          w='100%'
          p={5}
          border='3px solid #1a0d08'
        >
          <Text
            fontFamily="'Special Elite', 'Courier New', monospace"
            fontSize='md'
            lineHeight='1.55'
            mb={4}
          >
            Welcome to Pincer Financial, a Solana native lending platform.
            Please refresh the page after connecting your wallet.
          </Text>
          <Button
            onClick={() => setOpen(false)}
            size='sm'
            bg='#1a0d08'
            color='#fff7ed'
            fontFamily="'Special Elite', 'Courier New', monospace"
            _hover={{ bg: '#000' }}
          >
            OK
          </Button>
        </Box>
      </Box>
    </>
  );
}