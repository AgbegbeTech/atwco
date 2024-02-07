// File: pkg/api/ipfs.go
package api

import (
	"github.com/blockspace/internal/ipfs"
)

// IPFSAPI represents an API for interacting with the IPFS service.
type IPFSAPI struct {
	ipfsService *ipfs.IPFSService
}

// NewIPFSAPI creates a new instance of IPFSAPI.
func NewIPFSAPI(ipfsService *ipfs.IPFSService) *IPFSAPI {
	return &IPFSAPI{
		ipfsService: ipfsService,
	}
}

// StoreDataOnIPFS stores data on IPFS.
func (a *IPFSAPI) StoreDataOnIPFS(data []byte) (string, error) {
	return a.ipfsService.StoreData(data)
}

// RetrieveDataFromIPFS retrieves data from IPFS.
func (a *IPFSAPI) RetrieveDataFromIPFS(cid string) ([]byte, error) {
	return a.ipfsService.RetrieveData(cid)
}
