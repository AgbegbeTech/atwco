// File: cmd/blockspace-cli/main.go
package main

import (
	"fmt"
	"github.com/blockspace/internal/blockchain"
	"github.com/blockspace/internal/data"
	"github.com/blockspace/internal/ipfs"
	"golang.org/x/crypto/ssh/terminal"
	"log"
	"os"
	"os/signal"
	"syscall"
)

// cliHandler represents the main CLI handler
type cliHandler struct {
	blockchainService *blockchain.BlockchainService
	ipfsService       *ipfs.IPFSService
}

// NewCLIHandler creates a new instance of cliHandler
func NewCLIHandler(blockchainService *blockchain.BlockchainService, ipfsService *ipfs.IPFSService) *cliHandler {
	return &cliHandler{
		blockchainService: blockchainService,
		ipfsService:       ipfsService,
	}
}

// Start starts the CLI application
func (c *cliHandler) Start() {
	fmt.Println("Welcome to BlockSpace CLI!")

	// Initialize channels for graceful shutdown
	done := make(chan struct{})
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)

	// Start the CLI loop
	go c.runCLI(done)

	// Wait for termination signal
	<-sig
	close(done)

	fmt.Println("\nExiting BlockSpace CLI...")
}

// runCLI runs the main CLI loop
func (c *cliHandler) runCLI(done <-chan struct{}) {
	for {
		select {
		case <-done:
			return
		default:
			// Display menu
			fmt.Println("\nMenu:")
			fmt.Println("1. Fetch Block Data")
			fmt.Println("2. Store Data on IPFS")
			fmt.Println("3. Retrieve Data from IPFS")
			fmt.Println("4. Exit")

			// Prompt user for choice
			fmt.Print("\nEnter your choice: ")
			choice, err := terminal.ReadPassword(int(syscall.Stdin))
			if err != nil {
				log.Println("Error reading choice:", err)
				continue
			}

			switch string(choice[0]) {
			case "1":
				c.fetchBlockData()
			case "2":
				c.storeDataOnIPFS()
			case "3":
				c.retrieveDataFromIPFS()
			case "4":
				return
			default:
				fmt.Println("Invalid choice. Please try again.")
			}
		}
	}
}

// fetchBlockData fetches block data from the blockchain
func (c *cliHandler) fetchBlockData() {
	// Fetch block data from the blockchain (mock implementation)
	blockNumber := uint64(12345)
	block, err := c.blockchainService.FetchBlock(blockNumber)
	if err != nil {
		fmt.Println("Error fetching block data:", err)
		return
	}

	// Print fetched block data
	fmt.Printf("Fetched Block Data: %+v\n", block)
}

// storeDataOnIPFS stores data on IPFS
func (c *cliHandler) storeDataOnIPFS() {
	// Simulate data to be stored
	dataToStore := "Sample data to be stored on IPFS"

	// Convert data to IPFS format
	ipfsData, err := data.ConvertToIPFSFormat(dataToStore)
	if err != nil {
		fmt.Println("Error converting data to IPFS format:", err)
		return
	}

	// Store data on IPFS
	cid, err := c.ipfsService.StoreData(ipfsData)
	if err != nil {
		fmt.Println("Error storing data on IPFS:", err)
		return
	}

	// Print CID (Content Identifier) of the stored data
	fmt.Println("Data stored on IPFS. CID:", cid)
}

// retrieveDataFromIPFS retrieves data from IPFS
func (c *cliHandler) retrieveDataFromIPFS() {
	// Prompt user for CID
	fmt.Print("Enter CID of the data to retrieve: ")
	var cid string
	fmt.Scanln(&cid)

	// Retrieve data from IPFS
	retrievedData, err := c.ipfsService.RetrieveData(cid)
	if err != nil {
		fmt.Println("Error retrieving data from IPFS:", err)
		return
	}

	// Print retrieved data
	fmt.Println("Retrieved Data:", string(retrievedData))
}

func main() {
	// Initialize blockchain service
	blockchainService := blockchain.NewBlockchainService()

	// Initialize IPFS service
	ipfsService := ipfs.NewIPFSService()

	// Create CLI handler
	cli := NewCLIHandler(blockchainService, ipfsService)

	// Start CLI application
	cli.Start()
}// File: cmd/blockspace-cli/main.go
package main

import (
"fmt"
"log"
"os"
"os/signal"
"syscall"
"github.com/blockspace/internal/blockchain"
"github.com/blockspace/internal/ipfs"
)

// cliHandler represents the main CLI handler
type cliHandler struct {
	blockchainService *blockchain.BlockchainService
	ipfsService       *ipfs.IPFSService
}

// NewCLIHandler creates a new instance of cliHandler
func NewCLIHandler(blockchainService *blockchain.BlockchainService, ipfsService *ipfs.IPFSService) *cliHandler {
	return &cliHandler{
		blockchainService: blockchainService,
		ipfsService:       ipfsService,
	}
}

// Start starts the CLI application
func (c *cliHandler) Start() {
	fmt.Println("Welcome to BlockSpace CLI!")

	// Initialize channels for graceful shutdown
	done := make(chan struct{})
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)

	// Start the CLI loop
	go c.runCLI(done)

	// Wait for termination signal
	<-sig
	close(done)

	fmt.Println("\nExiting BlockSpace CLI...")
}

// runCLI runs the main CLI loop
func (c *cliHandler) runCLI(done <-chan struct{}) {
	for {
		select {
		case <-done:
			return
		default:
			// Display menu
			fmt.Println("\nMenu:")
			fmt.Println("1. Fetch Block Data")
			fmt.Println("2. Store Data on IPFS")
			fmt.Println("3. Retrieve Data from IPFS")
			fmt.Println("4. Exit")

			// Prompt user for choice
			fmt.Print("\nEnter your choice: ")
			var choice int
			_, err := fmt.Scan(&choice)
			if err != nil {
				log.Println("Error reading choice:", err)
				continue
			}

			switch choice {
			case 1:
				c.fetchBlockData()
			case 2:
				c.storeDataOnIPFS()
			case 3:
				c.retrieveDataFromIPFS()
			case 4:
				return
			default:
				fmt.Println("Invalid choice. Please try again.")
			}
		}
	}
}

// fetchBlockData fetches block data from the blockchain
func (c *cliHandler) fetchBlockData() {
	// Fetch block data from the blockchain
	blockNumber := uint64(12345)
	block, err := c.blockchainService.FetchBlock(blockNumber)
	if err != nil {
		fmt.Println("Error fetching block data:", err)
		return
	}

	// Print fetched block data
	fmt.Printf("Fetched Block Data: %+v\n", block)
}

// storeDataOnIPFS stores data on IPFS
func (c *cliHandler) storeDataOnIPFS() {
	// Simulate data to be stored
	dataToStore := "Sample data to be stored on IPFS"

	// Store data on IPFS
	cid, err := c.ipfsService.StoreData([]byte(dataToStore))
	if err != nil {
		fmt.Println("Error storing data on IPFS:", err)
		return
	}

	// Print CID (Content Identifier) of the stored data
	fmt.Println("Data stored on IPFS. CID:", cid)
}

// retrieveDataFromIPFS retrieves data from IPFS
func (c *cliHandler) retrieveDataFromIPFS() {
	// Prompt user for CID
	fmt.Print("Enter CID of the data to retrieve: ")
	var cid string
	fmt.Scanln(&cid)

	// Retrieve data from IPFS
	retrievedData, err := c.ipfsService.RetrieveData(cid)
	if err != nil {
		fmt.Println("Error retrieving data from IPFS:", err)
		return
	}

	// Print retrieved data
	fmt.Println("Retrieved Data:", string(retrievedData))
}

func main() {
	// Initialize blockchain service
	blockchainService := blockchain.NewBlockchainService()

	// Initialize IPFS service
	ipfsService := ipfs.NewIPFSService()

	// Create CLI handler
	cli := NewCLIHandler(blockchainService, ipfsService)

	// Start CLI application
	cli.Start()
}

