#!/bin/bash

# Version requirements
export REQUIRED_NODE_VERSION="20.0.0"
export REQUIRED_NPM_VERSION="10.0.0"

# Security patterns
export SENSITIVE_PATTERNS=(
    ".env*" "*.key" "*.pem" "*.pfx" "*.p12" "*.cert" 
    "id_rsa*" "*.password" "*.secret"
    ".next/cache/*" "node_modules/*"
    "dist/*" "out/*"
)

# Required tools
export REQUIRED_TOOLS=(
    "node" "npm" "git" "rimraf" "prettier"
    "tsc" "eslint" "next"
)

# File permissions
export FILES_TO_SECURE=(
    ".env*:600"
    "*.pem:600"
    "*.key:600"
    "config:700"
    ".git:700"
    "scripts/**/*.sh:755"
    "package.json:644"
    "package-lock.json:644"
    ".next:755"
    "node_modules:755"
) 