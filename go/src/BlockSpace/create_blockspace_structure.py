import os
import json

def create_blockspace_structure():
    # Define directory structure
    structure = {
        ".github": {
            "workflows": {},
            "ISSUE_TEMPLATE.md": "Template for creating GitHub issues",
            "PULL_REQUEST_TEMPLATE.md": "Template for creating pull requests"
        },
        "cmd": {
            "blockspace-cli": {"main.go": "# Main entry point for CLI application"}
        },
        "internal": {
            "blockchain": {"blockchain.go": "# Blockchain interaction module"},
            "ipfs": {"ipfs.go": "# IPFS integration module"},
            "data": {"data.go": "# Data management logic"}
        },
        "pkg": {
            "api": {
                "blockchain.go": "# Public package for blockchain interaction",
                "ipfs.go": "# Public package for IPFS integration",
                "data.go": "# Public package for data management logic"
            }
        },
        "docs": {
            "index.md": "# Main documentation index",
            "installation.md": "# Installation instructions",
            "usage.md": "# Usage guidelines",
            "api_reference.md": "# API reference documentation",
            "contribution.md": "# Contribution guidelines"
        },
        "examples": {
            "fetch_block_data.go": "# Example code for fetching block data",
            "store_on_ipfs.go": "# Example code for storing data on IPFS",
            "retrieve_from_ipfs.go": "# Example code for retrieving data from IPFS"
        },
        "README.md": "# Project README",
        "LICENSE.txt": "# License file"
    }

    # Create directories and files
    for dirname, contents in structure.items():
        os.makedirs(dirname, exist_ok=True)
        if isinstance(contents, dict):
            for filename, content in contents.items():
                if isinstance(content, str):
                    with open(os.path.join(dirname, filename), "w") as f:
                        f.write(content)
                    if not os.path.exists(os.path.join(dirname, filename)):
                        with open(os.path.join(dirname, filename, "README.md"), "w") as f:
                            f.write("# Empty directory")
        else:
            with open(dirname, "w") as f:
                f.write(contents)

    print("BlockSpace project structure created successfully!")

if __name__ == "__main__":
    create_blockspace_structure()
