#!/bin/bash

source scripts/utils/logging.sh

# Configuration
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups/security"
LOG_FILE="logs/security_${TIMESTAMP}.log"

# Create necessary directories
mkdir -p "$BACKUP_DIR" "$(dirname "$LOG_FILE")"

# Check security requirements
check_requirements() {
    info "Checking security requirements..."
    
    # Check required tools
    local required_tools=("openssl" "git" "npm" "yarn" "node" "jq")
    local missing_tools=()
    
    for tool in "${required_tools[@]}"; do
        if ! command -v "$tool" >/dev/null 2>&1; then
            missing_tools+=("$tool")
        fi
    done
    
    if [ ${#missing_tools[@]} -ne 0 ]; then
        error "Missing required tools: ${missing_tools[*]}"
        return 1
    fi
    
    info "All security requirements met"
}

# Manage file permissions
manage_permissions() {
    info "Managing file permissions..."
    
    # Secure sensitive files
    chmod 600 .env* 2>/dev/null || true
    chmod 600 *.pem 2>/dev/null || true
    chmod 600 *.key 2>/dev/null || true
    
    # Secure config directories
    chmod 700 config 2>/dev/null || true
    chmod 700 .git 2>/dev/null || true
    
    # Secure scripts
    chmod 755 scripts/**/*.sh 2>/dev/null || true
    
    info "File permissions updated"
}

# Manage Git security
manage_git_security() {
    info "Managing Git security..."
    
    # Check for sensitive files
    local sensitive_patterns=(".env" "*.key" "*.pem" "*.pfx" "*.p12" "*.cert" "id_rsa" "*.password" "*.secret")
    local found_files=()
    
    for pattern in "${sensitive_patterns[@]}"; do
        while IFS= read -r file; do
            if [ -n "$file" ]; then
                found_files+=("$file")
            fi
        done < <(git ls-files "$pattern" 2>/dev/null)
    done
    
    if [ ${#found_files[@]} -ne 0 ]; then
        error "Found sensitive files in Git: ${found_files[*]}"
        warn "Consider removing these files and adding them to .gitignore"
    fi
    
    # Update .gitignore if needed
    if [ ! -f .gitignore ]; then
        cat > .gitignore << EOF
# Security-related
.env*
*.key
*.pem
*.pfx
*.p12
*.cert
id_rsa*
*.password
*.secret

# Dependencies
node_modules/
.next/
.cache/
dist/
build/

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Testing
coverage/
.nyc_output/

# IDEs and editors
.idea/
.vscode/
*.swp
*.swo
*~

# OS-specific
.DS_Store
Thumbs.db
EOF
        info "Created secure .gitignore file"
    fi
    
    info "Git security managed"
}

# Manage dependencies security
manage_dependencies() {
    info "Managing dependencies security..."
    
    # Backup package files
    cp package.json "$BACKUP_DIR/package.json.${TIMESTAMP}.bak" 2>/dev/null || true
    cp package-lock.json "$BACKUP_DIR/package-lock.json.${TIMESTAMP}.bak" 2>/dev/null || true
    cp yarn.lock "$BACKUP_DIR/yarn.lock.${TIMESTAMP}.bak" 2>/dev/null || true
    
    # Run security audit
    yarn audit
    
    # Check for outdated packages
    yarn outdated
    
    info "Dependencies security checked"
}

# Check security headers
check_headers() {
    info "Checking security headers..."
    
    # Add security headers to next.config.js if it exists
    if [ -f next.config.js ]; then
        local config_content
        config_content=$(cat next.config.js)
        
        if ! grep -q "Security headers" next.config.js; then
            cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
EOF
            info "Added security headers to next.config.js"
        fi
    fi
    
    info "Security headers checked"
}

# Manage Vercel environment
manage_vercel() {
    info "Managing Vercel environment..."
    
    # Check for Vercel CLI
    if ! command -v vercel >/dev/null 2>&1; then
        warn "Vercel CLI not found. Installing..."
        yarn global add vercel
    fi
    
    # Check for vercel.json
    if [ ! -f vercel.json ]; then
        cat > vercel.json << EOF
{
  "github": {
    "silent": true
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
EOF
        info "Created secure vercel.json configuration"
    fi
    
    info "Vercel environment managed"
}

# Show help
show_help() {
    cat << EOF
Security Management Script

Usage: $0 <command> [options]

Commands:
    audit               - Run security audit
    permissions         - Manage file permissions
    git                - Manage Git security
    deps               - Manage dependencies security
    headers            - Check security headers
    vercel             - Manage Vercel environment
    help               - Show this help message

Options:
    --force            - Force operations without confirmation
    --backup           - Create backups before operations

Examples:
    $0 audit
    $0 permissions --force
    $0 git --backup
EOF
}

# Main process
main() {
    local command=$1
    shift
    
    case $command in
        "audit")
            check_requirements
            manage_permissions
            manage_git_security
            manage_dependencies
            check_headers
            manage_vercel
            ;;
        "permissions")
            manage_permissions
            ;;
        "git")
            manage_git_security
            ;;
        "deps")
            manage_dependencies
            ;;
        "headers")
            check_headers
            ;;
        "vercel")
            manage_vercel
            ;;
        "help"|"")
            show_help
            ;;
        *)
            error "Unknown command: $command"
            show_help
            exit 1
            ;;
    esac
}

# Parse command line arguments
if [ $# -eq 0 ]; then
    show_help
    exit 1
fi

main "$@" 