# Create $PROFILE if it doesn't already exist
if (-not (Test-Path $PROFILE)) { New-Item $PROFILE -Force }

# Open the $PROFILE
Invoke-Item $PROFILE
