$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$srcDir = Join-Path $root 'src'
$outFile = Join-Path $root 'main.js'

$parts = @(
    '00-utils.js'
    '00-core-shell.js'
    '01-auto-translate-toggle.js'
    '02-chat-translator.js'
    '03-mentions-and-reset.js'
    '04-advanced-controls.js'
    '05-skin-swapper.js'
)

$banner = @(
    '// AUTO-GENERATED FILE',
    '// Source modules are in /source code/src',
    '// Rebuild with: powershell -ExecutionPolicy Bypass -File "source code/scripts/build-main.ps1"',
    ''
)

$chunks = [System.Collections.Generic.List[string]]::new()
$chunks.AddRange([string[]]$banner)

foreach ($part in $parts) {
    $path = Join-Path $srcDir $part
    if (-not (Test-Path $path)) {
        throw "Missing module: $path"
    }

    $chunks.Add("// --- BEGIN $part ---")
    $chunks.AddRange([string[]](Get-Content -Path $path))
    $chunks.Add("// --- END $part ---")
    $chunks.Add('')
}

Set-Content -Path $outFile -Value $chunks -Encoding UTF8
Write-Host "Built $outFile from $($parts.Count) modules."
