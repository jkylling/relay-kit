import { type FC } from 'react'
import {
  Anchor,
  Box,
  Button,
  Flex,
  Pill,
  Text
} from '../../../primitives/index.js'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation'
import ErrorWell from '../../ErrorWell.js'
import { truncateAddress } from '../../../../utils/truncate.js'
import getChainBlockExplorerUrl from '../../../../utils/getChainBlockExplorerUrl.js'
import { type Address } from 'viem'
import { type TxHashes } from '../TransactionModalRenderer.js'
import { useRelayClient } from '../../../../hooks/index.js'
import {
  faArrowUpRightFromSquare,
  faRotateRight
} from '@fortawesome/free-solid-svg-icons/index.js'
import type { useRequests } from '@reservoir0x/relay-kit-hooks'
import { isAPIError } from '@reservoir0x/relay-sdk'

type ErrorStepProps = {
  error?: Error | null
  address?: Address
  allTxHashes: TxHashes
  transaction?: ReturnType<typeof useRequests>['data']['0']
  onOpenChange: (open: boolean) => void
}

export const ErrorStep: FC<ErrorStepProps> = ({
  error,
  address,
  allTxHashes,
  transaction,
  onOpenChange
}) => {
  const errorMessage = transaction?.data?.failReason ?? error?.message
  const isRefund =
    errorMessage?.toLowerCase()?.includes('refunded') ||
    transaction?.status === 'refund'
  const relayClient = useRelayClient()
  const baseTransactionUrl = relayClient?.baseApiUrl.includes('testnets')
    ? 'https://testnets.relay.link'
    : 'https://relay.link'
  const depositTx = allTxHashes ? allTxHashes[0] : undefined
  const depositExplorer = getChainBlockExplorerUrl(
    depositTx?.chainId,
    relayClient?.chains
  )
  let fillTx =
    allTxHashes && allTxHashes.length > 1
      ? allTxHashes[allTxHashes.length - 1]
      : undefined
  if (
    transaction &&
    transaction.status === 'refund' &&
    transaction.data?.outTxs
  ) {
    fillTx = {
      txHash: transaction.data.outTxs[0].hash as Address,
      chainId: transaction.data.outTxs[0].chainId as number
    }
  }
  const fillExplorer = getChainBlockExplorerUrl(
    fillTx?.chainId,
    relayClient?.chains
  )
  const mergedError =
    error && isAPIError(error) ? error : new Error(errorMessage)
  const refundDetails = transaction?.data?.refundCurrencyData
  const refundChain = transaction?.data?.refundCurrencyData?.currency?.chainId
    ? relayClient?.chains.find(
        (chain) =>
          chain.id === transaction.data?.refundCurrencyData?.currency?.chainId
      )
    : null

  return (
    <Flex
      direction="column"
      align="center"
      justify="between"
      css={{ width: '100%' }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20
        }}
      >
        {isRefund ? (
          <Box css={{ color: 'gray9', mr: '$2' }}>
            <FontAwesomeIcon icon={faRotateRight} style={{ height: 40 }} />
          </Box>
        ) : (
          <Box css={{ color: 'red9', mr: '$2' }}>
            <FontAwesomeIcon
              icon={faCircleExclamation}
              style={{ height: 40 }}
            />
          </Box>
        )}
      </motion.div>

      {isRefund ? (
        <Text style="subtitle2" css={{ my: '4', textAlign: 'center' }}>
          {refundDetails
            ? `It looks like an unknown issue occurred during the transaction. We’ve
          refunded ${refundDetails.amountFormatted} ${refundDetails.currency?.symbol} on ${refundChain?.displayName}.`
            : `It looks like an unknown issue occurred during the transaction. We apologize for the inconvenience, a refund has been sent to your wallet address.`}
        </Text>
      ) : (
        <ErrorWell
          error={mergedError}
          hasTxHashes={allTxHashes && allTxHashes.length > 0}
        />
      )}

      <Flex
        direction="column"
        css={{
          px: '4',
          py: '3',
          gap: '3',
          '--borderColor': 'colors.subtle-border-color',
          border: '1px solid var(--borderColor)',
          borderRadius: 12,
          width: '100%',
          mb: 24
        }}
      >
        <Flex justify="between" align="center" css={{ gap: '3' }}>
          <Text style="subtitle1">Deposit Tx</Text>
          {depositTx ? (
            <Anchor
              href={`${depositExplorer}/tx/${depositTx.txHash}`}
              target="_blank"
              css={{ display: 'flex', alignItems: 'center', gap: '1' }}
            >
              {truncateAddress(depositTx.txHash)}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                style={{ width: 16, height: 16 }}
              />
            </Anchor>
          ) : (
            <Text color="red" style="subtitle2">
              Order has not been filled
            </Text>
          )}
        </Flex>
        <Flex justify="between" align="center" css={{ gap: '3' }}>
          <Flex align="center" css={{ gap: '2' }}>
            <Text style="subtitle1">Fill Tx</Text>
            {isRefund ? (
              <Pill
                color="gray"
                css={{ p: '1', display: 'flex', alignItems: 'center' }}
              >
                <FontAwesomeIcon
                  icon={faRotateRight}
                  style={{ width: 16, height: 16, marginRight: 4 }}
                  color="#889096"
                />{' '}
                <Text style="subtitle2">Refunded</Text>
              </Pill>
            ) : null}
          </Flex>
          {fillTx ? (
            <Anchor
              href={`${fillExplorer}/tx/${fillTx.txHash}`}
              target="_blank"
              css={{ display: 'flex', alignItems: 'center', gap: '1' }}
            >
              {truncateAddress(fillTx.txHash)}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                style={{ width: 16, height: 16 }}
              />
            </Anchor>
          ) : (
            <Text color="red" style="subtitle2">
              Order has not been filled
            </Text>
          )}
        </Flex>
      </Flex>

      <Flex css={{ gap: '3', width: '100%' }}>
        <Button
          color="secondary"
          onClick={() => {
            window.open(
              depositTx
                ? `${baseTransactionUrl}/transaction/${depositTx.txHash}`
                : `${baseTransactionUrl}/transactions?address=${address}`,
              '_blank'
            )
          }}
          css={{
            justifyContent: 'center',
            width: '100%'
          }}
        >
          View Details
        </Button>
        <Button
          onClick={() => {
            onOpenChange(false)
          }}
          css={{
            justifyContent: 'center',
            width: '100%'
          }}
        >
          Done
        </Button>
      </Flex>
    </Flex>
  )
}
