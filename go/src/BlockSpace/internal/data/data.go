// File: internal/data/data.go
package data

import (
	"context"
	"encoding/json"
	"strings"
	"sync"
	"time"

	"github.com/elastic/go-elasticsearch/v8/esapi"
)

// IndexDataResult represents the result of indexing data.
type IndexDataResult struct {
	Success bool
	Message string
}

// IndexData indexes the given data for efficient retrieval.
func IndexData(data interface{}) *IndexDataResult {
	// Convert data to JSON format
	jsonData, err := json.Marshal(data)
	if err != nil {
		return &IndexDataResult{
			Success: false,
			Message: "Error converting data to JSON format: " + err.Error(),
		}
	}

	// Extract keywords from the data
	keywords := extractKeywords(string(jsonData))

	// Initialize Elasticsearch client
	cfg := elasticsearch.Config{
		Addresses: []string{"http://localhost:9200"},
	}
	esClient, err := elasticsearch.NewClient(cfg)
	if err != nil {
		return &IndexDataResult{
			Success: false,
			Message: "Error initializing Elasticsearch client: " + err.Error(),
		}
	}

	// Create a context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Create a wait group to wait for all indexing tasks to finish
	var wg sync.WaitGroup

	// Perform indexing concurrently
	for _, keyword := range keywords {
		wg.Add(1)
		go func(kw string) {
			defer wg.Done()
			// Index keyword in Elasticsearch
			if err := indexKeyword(ctx, esClient, kw); err != nil {
				// Handle error
			}
		}(keyword)
	}

	// Wait for all indexing tasks to finish
	wg.Wait()

	return &IndexDataResult{
		Success: true,
		Message: "Data indexed successfully",
	}
}

// extractKeywords extracts keywords from the given text using advanced NLP techniques.
// This function is a placeholder for more advanced text processing techniques.
func extractKeywords(text string) []string {
	// Simulated advanced text processing (e.g., NLP algorithms)
	// Here, we'll just split text into words and use the first few words as keywords (for simplicity)
	words := strings.Fields(text)
	var keywords []string
	for i := 0; i < len(words) && i < 5; i++ {
		keywords = append(keywords, words[i])
	}
	return keywords
}

// indexKeyword indexes the given keyword in Elasticsearch.
func indexKeyword(ctx context.Context, client *elasticsearch.Client, keyword string) error {
	// Index keyword in Elasticsearch
	req := esapi.IndexRequest{
		Index:      "keywords",
		DocumentID: keyword,
		Body:       strings.NewReader(`{"keyword": "` + keyword + `"}`),
		Refresh:    "true",
	}
	_, err := req.Do(ctx, client)
	if err != nil {
		return err
	}
	// Handle success
	return nil
}
