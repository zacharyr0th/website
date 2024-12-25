#!/bin/bash

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Log levels as integers (macOS compatible)
get_log_level() {
    case "$1" in
        "DEBUG") echo "0" ;;
        "INFO") echo "1" ;;
        "WARN") echo "2" ;;
        "ERROR") echo "3" ;;
        *) echo "1" ;; # Default to INFO
    esac
}

# Current log level (can be overridden by environment)
CURRENT_LOG_LEVEL=$(get_log_level "${LOG_LEVEL:-INFO}")

# Generic log function
log() {
    local level=$1
    local color=$2
    local message=$3
    local level_num=$(get_log_level "$level")
    
    if [ "$level_num" -ge "$CURRENT_LOG_LEVEL" ]; then
        # Get timestamp in ISO 8601 format
        local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
        printf "${color}[%s] [%s] %s${NC}\n" "$timestamp" "$level" "$message" >&2
    fi
}

# Convenience functions for different log levels
debug() {
    log "DEBUG" "$BLUE" "$1"
}

info() {
    log "INFO" "$GREEN" "$1"
}

warn() {
    log "WARN" "$YELLOW" "$1"
}

error() {
    log "ERROR" "$RED" "$1"
}

# Function to sanitize sensitive data from logs
sanitize_log() {
    local message=$1
    # Remove common sensitive patterns
    echo "$message" | sed -E 's/password=.[^[:space:]]*/password=****/g' \
                   | sed -E 's/token=.[^[:space:]]*/token=****/g' \
                   | sed -E 's/key=.[^[:space:]]*/key=****/g' \
                   | sed -E 's/secret=.[^[:space:]]*/secret=****/g'
}

# Export functions
export -f log debug info warn error sanitize_log 