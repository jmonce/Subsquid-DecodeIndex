import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, BigIntColumn as BigIntColumn_, BooleanColumn as BooleanColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class ContractFunctionApprove {
    constructor(props?: Partial<ContractFunctionApprove>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @IntColumn_({nullable: false})
    blockNumber!: number

    @Index_()
    @DateTimeColumn_({nullable: false})
    blockTimestamp!: Date

    @Index_()
    @StringColumn_({nullable: false})
    transactionHash!: string

    @Index_()
    @StringColumn_({nullable: false})
    contract!: string

    @Index_()
    @StringColumn_({nullable: false})
    functionName!: string

    @BigIntColumn_({nullable: true})
    functionValue!: bigint | undefined | null

    @Index_()
    @BooleanColumn_({nullable: true})
    functionSuccess!: boolean | undefined | null

    @StringColumn_({nullable: false})
    spender!: string

    @BigIntColumn_({nullable: false})
    value!: bigint
}
