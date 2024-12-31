#!/bin/bash
set -euo pipefail

source scripts/utils/logging.sh
source scripts/security/config.sh

# Configuration
readonly TIMESTAMP=$(date +%Y%m%d_%H%M%S)
readonly BACKUP_DIR="backups/security"
readonly LOG_FILE="logs/security_${TIMESTAMP}.log"
readonly TEMP_DIR=$(mktemp -d)
trap 'rm -rf "${TEMP_DIR}"' EXIT

check_requirements() {
    info "Checking project requirements..."
    local missing_tools=()
    
    # Check for essential global tools
    for tool in "node" "npm" "git"; do
        if ! command -v "$tool" >/dev/null 2>&1; then
            missing_tools+=("$tool")
        fi
    done

    # Check for project tools in node_modules/.bin
    local project_tools=("rimraf" "prettier" "tsc" "eslint" "next")
    for tool in "${project_tools[@]}"; do
        if [ ! -x "node_modules/.bin/$tool" ]; then
            warn "Local tool not found: $tool (running npm install might fix this)"
        fi
    done
    
    # Verify Node.js version
    local node_version
    node_version=$(node -v | cut -d'v' -f2)
    if ! command -v node >/dev/null 2>&1 || ! [[ "$(printf '%s\n' "$REQUIRED_NODE_VERSION" "$node_version" | sort -V | head -n1)" = "$REQUIRED_NODE_VERSION" ]]; then
        error "Node.js version must be >=${REQUIRED_NODE_VERSION} (current: $node_version)"
        return 1
    fi

    # Verify npm version
    local npm_version
    npm_version=$(npm -v)
    if ! command -v npm >/dev/null 2>&1 || ! [[ "$(printf '%s\n' "$REQUIRED_NPM_VERSION" "$npm_version" | sort -V | head -n1)" = "$REQUIRED_NPM_VERSION" ]]; then
        error "npm version must be >=${REQUIRED_NPM_VERSION} (current: $npm_version)"
        return 1
    fi

    [ ${#missing_tools[@]} -ne 0 ] && {
        error "Missing required global tools: ${missing_tools[*]}"
        return 1
    }
    
    info "All requirements met"
}

manage_dependencies() {
    info "Managing dependencies security..."
    
    # Backup package files
    cp package.json "${BACKUP_DIR}/package.json.${TIMESTAMP}.bak" 2>/dev/null || true
    cp package-lock.json "${BACKUP_DIR}/package-lock.json.${TIMESTAMP}.bak" 2>/dev/null || true
    
    # Run security checks
    info "Running npm security audit..."
    npm audit

    # Add automatic update option
    if [[ "${AUTO_UPDATE:-false}" == "true" ]]; then
        info "Automatically updating packages..."
        npm audit fix || true
        npm update || true
        npm install || true
    else
        info "Checking for outdated packages..."
        npm outdated || true
    fi
    
    info "Running type check..."
    npm run check || true
    
    info "Dependencies security checked"
}

manage_permissions() {
    info "Managing file permissions..."
    
    # Use FILES_TO_SECURE from config.sh
    for entry in "${FILES_TO_SECURE[@]}"; do
        IFS=':' read -r pattern mode <<< "$entry"
        chmod "$mode" $pattern 2>/dev/null || true
    done
    info "File permissions updated"
}

check_headers() {
    info "Checking Next.js security headers..."
    [ -f next.config.js ] && ! grep -q "Security headers" next.config.js && {
        cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
      ]
    }]
  },
  poweredByHeader: false,
}
module.exports = nextConfig
EOF
        info "Added security headers to next.config.js"
    }
    info "Security headers checked"
}

show_help() {
    cat << EOF
Next.js Project Security Management Script

Usage: $0 <command> [options]

Commands:
    audit               - Run full security audit
    check              - Check requirements and dependencies
    headers            - Check Next.js security headers
    permissions        - Manage file permissions
    help               - Show this help message

Options:
    --force            - Force operations without confirmation
    --backup           - Create backups before operations

Examples:
    $0 audit
    $0 check
    $0 headers
EOF
}

main() {
    # Parse options
    AUTO_UPDATE=false
    
    while [[ "$#" -gt 0 ]]; do
        case $1 in
            --auto-update) AUTO_UPDATE=true; shift ;;
            audit|check|headers|permissions|help) CMD="$1"; shift ;;
            *) error "Unknown parameter: $1"; show_help; exit 1 ;;
        esac
    done

    case ${CMD:-help} in
        "audit")
            check_requirements && 
            manage_permissions && 
            manage_dependencies && 
            check_headers
            ;;
        "check") check_requirements ;;
        "headers") check_headers ;;
        "permissions") manage_permissions ;;
        "help"|"") show_help ;;
        *) error "Unknown command: $1"; show_help; exit 1 ;;
    esac
}

[[ "${BASH_SOURCE[0]}" == "${0}" ]] && main "$@" 