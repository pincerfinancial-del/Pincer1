import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { ReserveWithMetadataType } from 'stores/pools';
import {
  formatCompact,
  formatPercent,
  formatToken,
  formatUsd,
} from 'utils/numberFormatter';
import Token from 'components/Token/Token';
import { U64_MAX } from '@solendprotocol/solend-sdk';

function amount(value: { isGreaterThan: (n: number) => boolean }, symbol: string) {
  const shown = value.isGreaterThan(1000000)
    ? formatCompact(value as never)
    : formatToken(value as never, 2);
  return `${shown} ${symbol}`;
}

export default function PoolList({
  selectReserveWithModal,
  reserves,
}: {
  selectReserveWithModal: (reserve: string) => void;
  reserves: Array<ReserveWithMetadataType>;
}) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4} pt={4}>
      {reserves.map((reserve) => {
 const atSupplyLimit =
  reserve.reserveSupplyLimit.eq(0) ||
  reserve.totalSupply.isGreaterThanOrEqualTo(
    reserve.reserveSupplyLimit.times(
      Math.min(0.9999, 1 - 1 / Number(reserve.reserveSupplyLimit)),
    ),
  );

const atBorrowLimit =
  reserve.reserveBorrowLimit.eq(0) ||
  reserve.totalBorrow.isGreaterThanOrEqualTo(
    reserve.reserveBorrowLimit.times(
      Math.min(0.9999, 1 - 1 / Number(reserve.reserveBorrowLimit)),
    ),
  );
        const symbol =
          reserve.symbol ??
          `${reserve.mintAddress.slice(0, 4)}...${reserve.mintAddress.slice(-4)}`;

        return (
          <Box
            key={reserve.address}
            as="button"
            type="button"
            w="100%"
            textAlign="left"
            bg="neutralAlt"
            border="1px solid"
            borderColor="line"
            borderRadius="16px"
            p={4}
            cursor="pointer"
            transition="border-color 0.15s ease, transform 0.15s ease"
            _hover={{ borderColor: 'brand', transform: 'translateY(-2px)' }}
            onClick={() => selectReserveWithModal(reserve.address)}
          >
            <Flex align="center" justify="space-between" mb={4}>
              <Flex align="center" gap={3}>
                <Token size={40} reserve={reserve} />
                <Box>
                  <Text fontWeight="600">{symbol}</Text>
                  <Text variant="caption" color="secondary">
                    {formatUsd(reserve.price)}
                  </Text>
                </Box>
              </Flex>
              <Text fontSize="sm" color="secondary">
                {formatPercent(reserve.loanToValueRatio, false, 0)} LTV
                {reserve.addedBorrowWeightBPS.toString() !== U64_MAX
                  ? ` / ${formatToken(reserve.borrowWeight.toString(), 2, false, true)}`
                  : ''}
              </Text>
            </Flex>
            <SimpleGrid columns={2} spacing={3}>
              <Box>
                <Text fontSize="xs" color="secondary">Supply APR</Text>
                <Text fontSize="md">{formatPercent(reserve.supplyInterest)}</Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="secondary">Borrow APR</Text>
                <Text fontSize="md">{formatPercent(reserve.borrowInterest)}</Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="secondary">Total supply</Text>
                <Text fontSize="sm" color={atSupplyLimit ? 'secondary' : 'primary'}>
                  {amount(reserve.totalSupply, symbol)}
                </Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="secondary">Total borrow</Text>
                <Text fontSize="sm" color={atBorrowLimit ? 'secondary' : 'primary'}>
                  {amount(reserve.totalBorrow, symbol)}
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        );
      })}
    </SimpleGrid>
  );
}