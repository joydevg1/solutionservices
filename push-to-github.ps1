# Push Solution Services to GitHub
# Prerequisite: Install Git from https://git-scm.com/download/win then restart PowerShell

$ErrorActionPreference = "Stop"
$repoUrl = "https://github.com/joydevg1/solutionservices.git"
$projectRoot = $PSScriptRoot

Set-Location $projectRoot

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git is not installed. Download from: https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path ".git")) {
    git init
    git branch -M main
}

# Ensure secrets are not staged
if (git ls-files --error-unmatch "backend/.env" 2>$null) {
    git rm --cached "backend/.env"
}
if (git ls-files --error-unmatch "frontend/.env" 2>$null) {
    git rm --cached "frontend/.env"
}

git add .
Write-Host "`nFiles to be committed:" -ForegroundColor Cyan
git status --short

$envFiles = git diff --cached --name-only | Where-Object { $_ -match "\.env$" -and $_ -notmatch "\.env\.(example|production\.example)$" }
if ($envFiles) {
    Write-Host "`nERROR: Secret .env files would be committed. Aborting." -ForegroundColor Red
    $envFiles | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
    exit 1
}

$hasCommits = git rev-parse HEAD 2>$null
if (-not $hasCommits) {
    git commit -m "Initial commit - Solution Services app"
} else {
    $changes = git status --porcelain
    if ($changes) {
        git commit -m "Update Solution Services app"
    } else {
        Write-Host "No changes to commit." -ForegroundColor Yellow
    }
}

$remotes = git remote 2>$null
if ($remotes -notcontains "origin") {
    git remote add origin $repoUrl
} else {
    git remote set-url origin $repoUrl
}

Write-Host "`nPushing to $repoUrl ..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSuccess! Repo: https://github.com/joydevg1/solutionservices" -ForegroundColor Green
} else {
    Write-Host "`nPush failed. You may need to log in to GitHub in the browser." -ForegroundColor Red
    Write-Host "If the repo already has commits, try: git pull origin main --rebase" -ForegroundColor Yellow
}
