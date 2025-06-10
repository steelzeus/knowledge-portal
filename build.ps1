# PowerShell script for production build
$buildDir = "dist"

# Create build directory if it doesn't exist
New-Item -ItemType Directory -Force -Path $buildDir

# Clean previous build
Remove-Item "$buildDir\*" -Recurse -Force

# Copy production files
Copy-Item "index.html" -Destination $buildDir
Copy-Item "main.js" -Destination $buildDir
Copy-Item "css" -Destination "$buildDir\css" -Recurse
Copy-Item "js" -Destination "$buildDir\js" -Recurse
Copy-Item "assets" -Destination "$buildDir\assets" -Recurse
Copy-Item "data" -Destination "$buildDir\data" -Recurse

# Remove development-only files
Remove-Item "$buildDir\js\debug.js" -Force -ErrorAction SilentlyContinue
Remove-Item "$buildDir\.vscode" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "$buildDir\debug_log.txt" -Force -ErrorAction SilentlyContinue

# Update index.html for production
$indexContent = Get-Content "$buildDir\index.html" -Raw
$indexContent = $indexContent -replace '<!-- Development Scripts -->[\s\S]*?<!-- End Development Scripts -->', ''
$indexContent | Set-Content "$buildDir\index.html"

Write-Host "Production build created in $buildDir"
