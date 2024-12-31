#!/bin/bash

# ANSI color codes
BLUE=$'\033[0;34m'
GREEN=$'\033[0;32m'
YELLOW=$'\033[1;33m'
RED=$'\033[0;31m'
NC=$'\033[0m' # No Color

# Get log level as integer
get_log_level() {
    case "$1" in
        "DEBUG") echo "0" ;;
        "INFO") echo "1" ;;
        "WARN") echo "2" ;;
        "ERROR") echo "3" ;;
        *) echo "1" ;; # Default to INFO
    esac
}

# Get color for log level
get_log_color() {
    case "$1" in
        "DEBUG") echo "$BLUE" ;;
        "INFO") echo "$GREEN" ;;
        "WARN") echo "$YELLOW" ;;
        "ERROR") echo "$RED" ;;
        *) echo "$GREEN" ;; # Default to green
    esac
}

# Current log level (can be overridden by environment)
CURRENT_LOG_LEVEL=$(get_log_level "${LOG_LEVEL:-INFO}")

# Generic log function with built-in sanitization
log() {
    local level=$1
    local message=$2
    local level_num=$(get_log_level "$level")
    local color=$(get_log_color "$level")
    
    if [ "$level_num" -ge "$CURRENT_LOG_LEVEL" ]; then
        # Sanitize the message
        message=$(echo "$message" | sed -E '
            s/password=.[^[:space:]]*/password=****/g;
            s/token=.[^[:space:]]*/token=****/g;
            s/key=.[^[:space:]]*/key=****/g;
            s/secret=.[^[:space:]]*/secret=****/g
        ')
        
        printf "${color}[%s] [%s] %s${NC}\n" \
            "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
            "$level" \
            "$message" >&2
    fi
}

# Convenience functions for different log levels
debug() { log "DEBUG" "$1"; }
info()  { log "INFO" "$1"; }
warn()  { log "WARN" "$1"; }
error() { log "ERROR" "$1"; }

# Export functions
export -f log debug info warn error get_log_level get_log_color 