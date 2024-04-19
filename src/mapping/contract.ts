import {DataHandlerContext} from '@subsquid/evm-processor'
import {Store} from '../db'
import {EntityBuffer} from '../entityBuffer'
import {ContractEventIssue, ContractEventRedeem, ContractEventDeprecate, ContractEventParams, ContractEventDestroyedBlackFunds, ContractEventAddedBlackList, ContractEventRemovedBlackList, ContractEventApproval, ContractEventTransfer, ContractEventPause, ContractEventUnpause, ContractFunctionDeprecate, ContractFunctionApprove, ContractFunctionAddBlackList, ContractFunctionTransferFrom, ContractFunctionUnpause, ContractFunctionPause, ContractFunctionTransfer, ContractFunctionSetParams, ContractFunctionIssue, ContractFunctionRedeem, ContractFunctionRemoveBlackList, ContractFunctionTransferOwnership, ContractFunctionDestroyBlackFunds} from '../model'
import * as spec from '../abi/0xdac17f958d2ee523a2206206994597c13d831ec7'
import {Log, Transaction} from '../processor'

const address = '0xdac17f958d2ee523a2206206994597c13d831ec7'


export function parseEvent(ctx: DataHandlerContext<Store>, log: Log) {
    try {
        switch (log.topics[0]) {
            case spec.events['Issue'].topic: {
                let e = spec.events['Issue'].decode(log)
                EntityBuffer.add(
                    new ContractEventIssue({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Issue',
                        amount: e[0],
                    })
                )
                break
            }
            case spec.events['Redeem'].topic: {
                let e = spec.events['Redeem'].decode(log)
                EntityBuffer.add(
                    new ContractEventRedeem({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Redeem',
                        amount: e[0],
                    })
                )
                break
            }
            case spec.events['Deprecate'].topic: {
                let e = spec.events['Deprecate'].decode(log)
                EntityBuffer.add(
                    new ContractEventDeprecate({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Deprecate',
                        newAddress: e[0],
                    })
                )
                break
            }
            case spec.events['Params'].topic: {
                let e = spec.events['Params'].decode(log)
                EntityBuffer.add(
                    new ContractEventParams({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Params',
                        feeBasisPoints: e[0],
                        maxFee: e[1],
                    })
                )
                break
            }
            case spec.events['DestroyedBlackFunds'].topic: {
                let e = spec.events['DestroyedBlackFunds'].decode(log)
                EntityBuffer.add(
                    new ContractEventDestroyedBlackFunds({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'DestroyedBlackFunds',
                        blackListedUser: e[0],
                        balance: e[1],
                    })
                )
                break
            }
            case spec.events['AddedBlackList'].topic: {
                let e = spec.events['AddedBlackList'].decode(log)
                EntityBuffer.add(
                    new ContractEventAddedBlackList({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'AddedBlackList',
                        user: e[0],
                    })
                )
                break
            }
            case spec.events['RemovedBlackList'].topic: {
                let e = spec.events['RemovedBlackList'].decode(log)
                EntityBuffer.add(
                    new ContractEventRemovedBlackList({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'RemovedBlackList',
                        user: e[0],
                    })
                )
                break
            }
            case spec.events['Approval'].topic: {
                let e = spec.events['Approval'].decode(log)
                EntityBuffer.add(
                    new ContractEventApproval({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Approval',
                        owner: e[0],
                        spender: e[1],
                        value: e[2],
                    })
                )
                break
            }
            case spec.events['Transfer'].topic: {
                let e = spec.events['Transfer'].decode(log)
                EntityBuffer.add(
                    new ContractEventTransfer({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Transfer',
                        from: e[0],
                        to: e[1],
                        value: e[2],
                    })
                )
                break
            }
            case spec.events['Pause'].topic: {
                let e = spec.events['Pause'].decode(log)
                EntityBuffer.add(
                    new ContractEventPause({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Pause',
                    })
                )
                break
            }
            case spec.events['Unpause'].topic: {
                let e = spec.events['Unpause'].decode(log)
                EntityBuffer.add(
                    new ContractEventUnpause({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Unpause',
                    })
                )
                break
            }
        }
    }
    catch (error) {
        ctx.log.error({error, blockNumber: log.block.height, blockHash: log.block.hash, address}, `Unable to decode event "${log.topics[0]}"`)
    }
}

export function parseFunction(ctx: DataHandlerContext<Store>, transaction: Transaction) {
    try {
        switch (transaction.input.slice(0, 10)) {
            case spec.functions['deprecate'].sighash: {
                let f = spec.functions['deprecate'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionDeprecate({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'deprecate',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        upgradedAddress: f[0],
                    })
                )
                break
            }
            case spec.functions['approve'].sighash: {
                let f = spec.functions['approve'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionApprove({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'approve',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        spender: f[0],
                        value: f[1],
                    })
                )
                break
            }
            case spec.functions['addBlackList'].sighash: {
                let f = spec.functions['addBlackList'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionAddBlackList({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'addBlackList',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        evilUser: f[0],
                    })
                )
                break
            }
            case spec.functions['transferFrom'].sighash: {
                let f = spec.functions['transferFrom'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionTransferFrom({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'transferFrom',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        from: f[0],
                        to: f[1],
                        value: f[2],
                    })
                )
                break
            }
            case spec.functions['unpause'].sighash: {
                let f = spec.functions['unpause'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionUnpause({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'unpause',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                    })
                )
                break
            }
            case spec.functions['pause'].sighash: {
                let f = spec.functions['pause'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionPause({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'pause',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                    })
                )
                break
            }
            case spec.functions['transfer'].sighash: {
                let f = spec.functions['transfer'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionTransfer({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'transfer',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        to: f[0],
                        value: f[1],
                    })
                )
                break
            }
            case spec.functions['setParams'].sighash: {
                let f = spec.functions['setParams'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionSetParams({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'setParams',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        newBasisPoints: f[0],
                        newMaxFee: f[1],
                    })
                )
                break
            }
            case spec.functions['issue'].sighash: {
                let f = spec.functions['issue'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionIssue({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'issue',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        amount: f[0],
                    })
                )
                break
            }
            case spec.functions['redeem'].sighash: {
                let f = spec.functions['redeem'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionRedeem({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'redeem',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        amount: f[0],
                    })
                )
                break
            }
            case spec.functions['removeBlackList'].sighash: {
                let f = spec.functions['removeBlackList'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionRemoveBlackList({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'removeBlackList',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        clearedUser: f[0],
                    })
                )
                break
            }
            case spec.functions['transferOwnership'].sighash: {
                let f = spec.functions['transferOwnership'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionTransferOwnership({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'transferOwnership',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        newOwner: f[0],
                    })
                )
                break
            }
            case spec.functions['destroyBlackFunds'].sighash: {
                let f = spec.functions['destroyBlackFunds'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionDestroyBlackFunds({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'destroyBlackFunds',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        blackListedUser: f[0],
                    })
                )
                break
            }
        }
    }
    catch (error) {
        ctx.log.error({error, blockNumber: transaction.block.height, blockHash: transaction.block.hash, address}, `Unable to decode function "${transaction.input.slice(0, 10)}"`)
    }
}
