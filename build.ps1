# PowerShell script for production build
param(
    [string]$env = "production"
)

$buildDir = "dist"
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$backupDir = "backup_$timestamp"

Write-Host "Starting $env build..."

# Create build and backup directories
New-Item -ItemType Directory -Force -Path $buildDir | Out-Null
New-Item -ItemType Directory -Force -Path $backupDir | Out-Null

# Backup current dist if it exists
if (Test-Path "$buildDir\*") {
    Write-Host "Backing up previous build..."
    Copy-Item "$buildDir\*" -Destination $backupDir -Recurse
}

# Clean previous build
Remove-Item "$buildDir\*" -Recurse -Force -ErrorAction SilentlyContinue

# Copy production files with structure preservation
Write-Host "Copying files..."
$filesToCopy = @(
    "index.html",
    "main.js",
    "css",
    "js",
    "assets",
    "data"
)

foreach ($item in $filesToCopy) {
    if (Test-Path $item) {
        Copy-Item $item -Destination "$buildDir\$item" -Recurse
    }
}

# Remove development-only files
if ($env -eq "production") {
    Write-Host "Removing development files..."
    $devFiles = @(
        "$buildDir\js\debug.js",
        "$buildDir\js\systemTest.js",
        "$buildDir\.vscode",
        "$buildDir\debug_log.txt"
    )
    foreach ($file in $devFiles) {
        Remove-Item $file -Force -ErrorAction SilentlyContinue
    }

    # Update config.js for production
    $configPath = "$buildDir\js\config.js"
    if (Test-Path $configPath) {
        $configContent = Get-Content $configPath -Raw
        $configContent = $configContent -replace 'enableDebugLogging: true', 'enableDebugLogging: false'
        $configContent = $configContent -replace 'enableHotReload: true', 'enableHotReload: false'
        Set-Content $configPath $configContent
    }

    # Minify JS files if terser is available
    Write-Host "Minifying JavaScript..."
    try {
        $jsFiles = Get-ChildItem -Path "$buildDir\js" -Filter "*.js" -Recurse
        foreach ($file in $jsFiles) {
            npx terser $file.FullName -o $file.FullName -c -m
        }
    } catch {
        Write-Warning "Minification skipped: terser not found. Install with: npm install -g terser"
    }

    # Clean up source maps in production
    Get-ChildItem -Path $buildDir -Filter "*.map" -Recurse | Remove-Item -Force
}

# Success message
Write-Host "Build completed successfully!"
Write-Host "Output directory: $((Get-Item $buildDir).FullName)"

# Development server for testing
if ($env -eq "development") {
    Write-Host "Starting development server..."
    Set-Location $buildDir
    npx serve
}
