import {EvmBatchProcessor, EvmBatchProcessorFields, BlockHeader, Log as _Log, Transaction as _Transaction} from '@subsquid/evm-processor'
import * as contractAbi from './abi/0xdac17f958d2ee523a2206206994597c13d831ec7'

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: 'https://eth.archive.subsquid.io',
    })
    .setFields({
            log: {
                topics: true,
                data: true,
                transactionHash: true,
            },
            transaction: {
                hash: true,
                input: true,
                from: true,
                value: true,
                status: true,
        }
    })
    .addLog({
        address: ['0xdac17f958d2ee523a2206206994597c13d831ec7'],
        topic0: [
            contractAbi.events['Issue'].topic,
            contractAbi.events['Redeem'].topic,
            contractAbi.events['Deprecate'].topic,
            contractAbi.events['Params'].topic,
            contractAbi.events['DestroyedBlackFunds'].topic,
            contractAbi.events['AddedBlackList'].topic,
            contractAbi.events['RemovedBlackList'].topic,
            contractAbi.events['Approval'].topic,
            contractAbi.events['Transfer'].topic,
            contractAbi.events['Pause'].topic,
            contractAbi.events['Unpause'].topic,
        ],
        range: {
            from: 1000000,
        },
    })
    .addTransaction({
        to: ['0xdac17f958d2ee523a2206206994597c13d831ec7'],
        sighash: [
            contractAbi.functions['deprecate'].sighash,
            contractAbi.functions['approve'].sighash,
            contractAbi.functions['addBlackList'].sighash,
            contractAbi.functions['transferFrom'].sighash,
            contractAbi.functions['unpause'].sighash,
            contractAbi.functions['pause'].sighash,
            contractAbi.functions['transfer'].sighash,
            contractAbi.functions['setParams'].sighash,
            contractAbi.functions['issue'].sighash,
            contractAbi.functions['redeem'].sighash,
            contractAbi.functions['removeBlackList'].sighash,
            contractAbi.functions['transferOwnership'].sighash,
            contractAbi.functions['destroyBlackFunds'].sighash,
        ],
        range: {
            from: 1000000,
        },
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
