// File: pkg/api/blockchain.go
package api

import (
	"github.com/blockspace/internal/blockchain"
)

// BlockchainAPI represents an API for interacting with the blockchain service.
type BlockchainAPI struct {
	blockchainService *blockchain.BlockchainService
}

// NewBlockchainAPI creates a new instance of BlockchainAPI.
func NewBlockchainAPI(blockchainService *blockchain.BlockchainService) *BlockchainAPI {
	return &BlockchainAPI{
		blockchainService: blockchainService,
	}
}

// FetchBlock fetches block data from the blockchain.
func (a *BlockchainAPI) FetchBlock(blockNumber uint64) (*blockchain.Block, error) {
	return a.blockchainService.FetchBlock(blockNumber)
}
