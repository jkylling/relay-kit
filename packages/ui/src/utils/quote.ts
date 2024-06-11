import type { Execute, RelayChain } from '@reservoir0x/relay-sdk'
import { formatBN, formatDollar } from './numbers'
import type { BridgeFee } from '../types'
import { formatSeconds } from './time'
import type { useQuote } from '@reservoir0x/relay-kit-hooks'

type ExecuteSwapResponse = ReturnType<typeof useQuote>['data']

export const parseFees = (
  selectedTo: RelayChain,
  selectedFrom: RelayChain,
  quote?: ReturnType<typeof useQuote>['data']
): {
  breakdown: BridgeFee[]
  totalFees: {
    usd?: string
    priceImpactPercentage?: string
    priceImpact?: string
    swapImpact?: string
  }
} => {
  const fees = quote?.fees
  const gasFee = BigInt(fees?.gas?.amount ?? 0)
  const formattedGasFee = formatBN(
    gasFee,
    5,
    Number(fees?.gas?.currency?.decimals ?? 18)
  )
  const relayerGasFee = BigInt(fees?.relayerGas?.amount ?? 0)
  const formattedRelayerGas = formatBN(
    relayerGasFee,
    5,
    Number(fees?.relayerGas?.currency?.decimals ?? 18)
  )
  const relayerFee = BigInt(fees?.relayerService?.amount ?? 0)
  const relayerFeeIsReward = relayerFee < 0
  const formattedRelayer = relayerFeeIsReward
    ? formatBN(
        BigInt(fees?.relayerService?.amount?.replace('-', '') ?? 0),
        5,
        Number(fees?.relayerService?.currency?.decimals ?? 18)
      )
    : formatBN(
        relayerFee,
        5,
        Number(fees?.relayerService?.currency?.decimals ?? 18)
      )
  const totalFeesUsd =
    Number(fees?.relayer?.amountUsd ?? 0) + Number(fees?.app?.amountUsd ?? 0)
  return {
    breakdown: [
      {
        raw: gasFee,
        formatted: `${formattedGasFee}`,
        usd: fees?.gas?.amountUsd
          ? formatDollar(Number(fees.gas.amountUsd))
          : '0',
        name: `Deposit Gas (${selectedFrom.displayName})`,
        tooltip: null,
        type: 'gas',
        id: 'origin-gas',
        currency: fees?.gas?.currency
      },
      {
        raw: relayerGasFee,
        formatted: `${formattedRelayerGas}`,
        usd: fees?.gas?.amountUsd
          ? formatDollar(Number(fees.relayerGas?.amountUsd))
          : '0',
        name: `Fill Gas (${selectedTo.displayName})`,
        tooltip: null,
        type: 'gas',
        id: 'destination-gas',
        currency: fees?.relayerGas?.currency
      },
      {
        raw: relayerFee,
        formatted: `${relayerFeeIsReward ? '+' : ''}${formattedRelayer}`,
        usd:
          `${relayerFeeIsReward ? '+' : ''}` + fees?.relayerService?.amountUsd
            ? formatDollar(Number(fees?.relayerService?.amountUsd))
            : '0',
        name: relayerFeeIsReward ? 'Reward' : 'Relay Fee',
        tooltip: null,
        type: 'relayer',
        id: 'relayer-fee',
        currency: fees?.relayerService?.currency
      }
    ],
    totalFees: {
      usd: formatDollar(totalFeesUsd),
      priceImpactPercentage: quote?.details?.totalImpact?.percent
        ? `${quote?.details?.totalImpact?.percent}%`
        : undefined,
      priceImpact: quote?.details?.totalImpact?.usd
        ? formatDollar(
            Math.abs(parseFloat(quote?.details?.totalImpact?.usd ?? 0))
          )
        : undefined,
      swapImpact: quote?.details?.swapImpact?.usd
        ? formatDollar(
            Math.abs(parseFloat(quote?.details?.swapImpact?.usd ?? 0))
          )
        : undefined
    }
  }
}

export const calculateRelayerFeeProportionUsd = (
  quote?: ExecuteSwapResponse
) => {
  const usdIn = quote?.details?.currencyIn?.amountUsd
    ? Number(quote.details.currencyIn.amountUsd)
    : null
  const relayerServiceFeeUsd = quote?.fees?.relayerService?.amountUsd
    ? Number(quote.fees.relayerService.amountUsd)
    : null

  if (!usdIn || !relayerServiceFeeUsd) {
    return 0n
  }

  return BigInt(Math.floor((relayerServiceFeeUsd * 100) / usdIn))
}

export const calculateRelayerFeeProportion = (
  totalAmount: { rawExcludingOriginGas: bigint },
  feeBreakdown: BridgeFee[]
) => {
  if (totalAmount.rawExcludingOriginGas > 0n) {
    const relayerFeeRaw =
      feeBreakdown.find((fee) => fee.id === 'relayer-fee')?.raw ?? 0n
    return (relayerFeeRaw * 100n) / totalAmount.rawExcludingOriginGas
  }
  return 0n
}

export const isHighRelayerServiceFeeUsd = (quote?: ExecuteSwapResponse) => {
  const usdIn = quote?.details?.currencyIn?.amountUsd
    ? Number(quote.details.currencyIn.amountUsd)
    : null
  const relayerServiceFeeUsd = quote?.fees?.relayerService?.amountUsd
    ? Number(quote.fees.relayerService.amountUsd)
    : null

  if (!usdIn || !relayerServiceFeeUsd) {
    return false
  }

  const fivePercentOfUsdIn = (usdIn * 5) / 100
  return relayerServiceFeeUsd >= fivePercentOfUsdIn
}

export const extractQuoteId = (steps?: Execute['steps']) => {
  if (
    steps &&
    steps[0] &&
    steps[0].items &&
    steps[0].items[0] &&
    steps[0].items[0].data &&
    steps[0].items[0].data.data
  ) {
    return (steps[0].items[0].data as any)?.data ?? ''
  } else if (
    steps &&
    steps[0] &&
    steps[0].items &&
    steps[0].items[0] &&
    steps[0].items[0].check?.endpoint
  ) {
    const endpoint = steps[0].items[0].check?.endpoint ?? ''
    const matches = endpoint.match(/requestId=([^&]*)/)
    return matches ? matches[1] : null
  }
  return ''
}

export const calculateTimeEstimate = (breakdown?: Execute['breakdown']) => {
  const time =
    breakdown?.reduce((total, breakdown) => {
      return total + (breakdown.timeEstimate ?? 0)
    }, 0) ?? 0
  const formattedTime = formatSeconds(time)

  return {
    time,
    formattedTime
  }
}
