# Squid ABI

A squid that decodes and indexes EVM logs and transactions for Tether contract on mainnet

## Usage

Build and run the squid

```bash
sqd build
sqd up
sqd migration:generate
sqd process
```
The indexing will start.

In a separate window, start the GraphQL API server at `localhost:4350/graphql`:
```bash
sqd serve
```
