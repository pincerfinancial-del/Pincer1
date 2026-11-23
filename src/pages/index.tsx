import Head from 'next/head';
import Link from 'next/link';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import Image from 'next/image';

const buttonStyle = {
  size: 'lg' as const,
  borderRadius: 'full',
  bg: '#F7F3EA',
  color: '#1a1a1a',
  _hover: { bg: '#FFFDF8', color: '#1a1a1a' },
  _active: { bg: '#9d20a1', color: '#f0dbdb' },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Pincer Finance</title>
      </Head>
      <Box
        minH="100vh"
        color="white"
        bgImage="url('/title2.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
      >
        <Flex as="nav" p={6} justify="flex-end" gap={4}>
          <Button as={Link} href="/platform" {...buttonStyle}>
            Solana DeFi
          </Button>
          <Button as={Link} href="/about" {...buttonStyle}>
            About
          </Button>
        </Flex>
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="70vh"
          textAlign="center"
        >
        
        </Flex>
      </Box>
    </>
  );
}