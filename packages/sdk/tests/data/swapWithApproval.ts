import { Execute } from "../../src/types";


export const swapWithApproval: Execute = {
    "steps": [
        {
            "id": "approve",
            "action": "Confirm transaction in your wallet",
            "description": "Sign an approval for WETH",
            "kind": "transaction",
            "items": [
                {
                    "status": "incomplete",
                    "data": {
                        "to": "0x4200000000000000000000000000000000000006",
                        "data": "0x095ea7b300000000000000000000000000000000bb6dd3b0032d930f72cac8e56166d93c0000000000000000000000000000000000000000000000000de0b6b3a7640000",
                        "value": "0",
                        "maxFeePerGas": "15579003",
                        "maxPriorityFeePerGas": "2282326",
                        "chainId": 8453
                    }
                }
            ]
        },
        {
            "id": "swap",
            "action": "Confirm transaction in your wallet",
            "description": "Swapping WETH for USDC",
            "kind": "transaction",
            "items": [
                {
                    "status": "incomplete",
                    "data": {
                        "to": "0x00000000bb6dd3b0032d930f72cac8e56166d93c",
                        "data": "0x79aeeb9200000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000ba000000000000000000000000003508bb71268bba25ecacc8f620e01866650532c0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000420000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000042000000000000000000000000000000000000060000000000000000000000004200000000000000000000000000000000000006000000000000000000000000def1c0ded9bec7f1a1670819833240f027b25eff00000000000000000000000000000000bb6dd3b0032d930f72cac8e56166d93c000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000009200000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000def1c0ded9bec7f1a1670819833240f027b25eff0000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000def1c0ded9bec7f1a1670819833240f027b25eff0000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000768415565b00000000000000000000000004200000000000000000000000000000000000006000000000000000000000000833589fcd6edb6e08f4c7c32d4f71b54bda029130000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000c8daaa5000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000004200000000000000000000000000000000000000000000000000000000000000520000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000360000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004200000000000000000000000000000000000006000000000000000000000000833589fcd6edb6e08f4c7c32d4f71b54bda0291300000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000320000000000000000000000000000000000000000000000000000000000000032000000000000000000000000000000000000000000000000000000000000002e00000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000012556e69737761705633000000000000000000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000c927e8bd000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000002626664c2603336e57b271c5c0b26f421741e48100000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002b4200000000000000000000000000000000000006000064833589fcd6edb6e08f4c7c32d4f71b54bda029130000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000833589fcd6edb6e08f4c7c32d4f71b54bda0291300000000000000000000000000000000000000000000000000000000004d3e6d000000000000000000000000ad01c20d5886137e056775af56915de824c8fce50000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000020000000000000000000000004200000000000000000000000000000000000006000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000000869584cd00000000000000000000000094d325a6b31ae7bb78f43fb97da437c1c3f42f960000000000000000000000000000000000000000a3cfbcd40cb0e29c8703b35a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000443dad0c9c000000000000000000000000833589fcd6edb6e08f4c7c32d4f71b54bda0291300000000000000000000000003508bb71268bba25ecacc8f620e01866650532c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000403cb991ae058ce0ab1f934d70d5f83de9974224fa255f0fa3c7b329c0199320",
                        "value": "0",
                        "maxFeePerGas": "15579003",
                        "maxPriorityFeePerGas": "2282326",
                        "chainId": 8453
                    },
                    "check": {
                        "endpoint": "/intents/status?requestId=0x403cb991ae058ce0ab1f934d70d5f83de9974224fa255f0fa3c7b329c0199320",
                        "method": "GET"
                    }
                }
            ]
        }
    ],
    "fees": {
        "gas": {
            "currency": {
                "chainId": 8453,
                "address": "0x0000000000000000000000000000000000000000",
                "symbol": "ETH",
                "name": "Ether",
                "decimals": 18,
                "metadata": {
                    "logoURI": "https://assets.relay.link/icons/1/light.png",
                    "verified": true,
                    "isNative": true
                }
            },
            "amount": "7144531600000",
            "amountFormatted": "0.0000071445316",
            "amountUsd": "0.024415"
        },
        "relayer": {
            "currency": {
                "chainId": 8453,
                "address": "0x0000000000000000000000000000000000000000",
                "symbol": "ETH",
                "name": "Ether",
                "decimals": 18,
                "metadata": {
                    "logoURI": "https://assets.relay.link/icons/1/light.png",
                    "verified": true,
                    "isNative": true
                }
            },
            "amount": "0",
            "amountFormatted": "0.0",
            "amountUsd": "0.000000"
        },
        "relayerGas": {
            "currency": {
                "chainId": 8453,
                "address": "0x0000000000000000000000000000000000000000",
                "symbol": "ETH",
                "name": "Ether",
                "decimals": 18,
                "metadata": {
                    "logoURI": "https://assets.relay.link/icons/1/light.png",
                    "verified": true,
                    "isNative": true
                }
            },
            "amount": "0",
            "amountFormatted": "0.0",
            "amountUsd": "0.000000"
        },
        "relayerService": {
            "currency": {
                "chainId": 8453,
                "address": "0x0000000000000000000000000000000000000000",
                "symbol": "ETH",
                "name": "Ether",
                "decimals": 18,
                "metadata": {
                    "logoURI": "https://assets.relay.link/icons/1/light.png",
                    "verified": true,
                    "isNative": true
                }
            },
            "amount": "0",
            "amountFormatted": "0.0",
            "amountUsd": "0.000000"
        },
        "app": {
            "currency": {
                "chainId": 8453,
                "address": "0x0000000000000000000000000000000000000000",
                "symbol": "ETH",
                "name": "Ether",
                "decimals": 18,
                "metadata": {
                    "logoURI": "https://assets.relay.link/icons/1/light.png",
                    "verified": true,
                    "isNative": true
                }
            },
            "amount": "0",
            "amountFormatted": "0.0",
            "amountUsd": "0.000000"
        }
    },
    "breakdown": [
        {
            "value": "3403862900",
            "timeEstimate": 12
        }
    ],
    "details": {
        "sender": "0x03508bB71268BBA25ECaCC8F620e01866650532c",
        "recipient": "0x03508bB71268BBA25ECaCC8F620e01866650532c",
        "currencyIn": {
            "currency": {
                "chainId": 8453,
                "address": "0x4200000000000000000000000000000000000006",
                "symbol": "WETH",
                "name": "Wrapped Ether",
                "decimals": 18,
                "metadata": {
                    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
                    "verified": false,
                    "isNative": false
                }
            },
            "amount": "1000000000000000000",
            "amountFormatted": "1.0",
            "amountUsd": "3417.250000"
        },
        "currencyOut": {
            "currency": {
                "chainId": 8453,
                "address": "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
                "symbol": "USDC",
                "name": "USD Coin",
                "decimals": 6,
                "metadata": {
                    "logoURI": "https://ethereum-optimism.github.io/data/USDC/logo.png",
                    "verified": false,
                    "isNative": false
                }
            },
            "amount": "3403862900",
            "amountFormatted": "3403.8629",
            "amountUsd": "3404.203286"
        },
        "totalImpact": {
            "usd": "-13.046714",
            "percent": "-0.38"
        },
        "swapImpact": {
            "usd": "-13.046714",
            "percent": "-0.38"
        },
        "rate": "3403.8629",
        "slippageTolerance": {
            "origin": {
                "usd": "0.000000",
                "value": "0",
                "percent": "0"
            },
            "destination": {
                "usd": "0",
                "value": "0",
                "percent": "0"
            }
        }
    }
}