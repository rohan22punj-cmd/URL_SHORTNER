$mongoExe = "C:\Program Files\MongoDB\Server\8.3\bin\mongod.exe"
$dbPath = Join-Path $PSScriptRoot "mongodb-data"

if (!(Test-Path $mongoExe)) {
    Write-Error "mongod.exe was not found at $mongoExe"
    exit 1
}

New-Item -ItemType Directory -Force $dbPath | Out-Null

& $mongoExe --dbpath $dbPath --port 27017 --bind_ip 127.0.0.1
