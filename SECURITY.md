# Security Policy

## Supported Versions

Only the `main` branch receives security updates.

## Reporting a Vulnerability

Please report suspected vulnerabilities **privately** via GitHub Security Advisories:

1. Go to https://github.com/asfalanoij/iso/security/advisories/new
2. Provide reproduction steps, impact, and any suggested mitigation
3. Allow up to 7 days for an initial response

Do **not** open public issues for security findings.

## Scope

This is a static client-side ISO compliance toolkit. In-scope concerns:

- XSS via templated content (e.g., `innerHTML`)
- Supply-chain risk on CDN-loaded libraries (mitigated by SRI)
- Leaked secrets in source or git history
- GitHub Actions workflow injection / token misuse

Out of scope: brute-force on third-party CDN endpoints, social engineering.

## Hardening in place

- GitHub secret scanning + push protection: enabled
- CodeQL static analysis (weekly + on PR)
- Gitleaks history scan (weekly + on PR)
- Trivy filesystem scan (weekly + on PR)
- Dependabot for GitHub Actions updates
- Subresource Integrity on all CDN scripts
- Content Security Policy meta tag on all HTML pages

## Disclosure

Fixes ship via PR to `main`. Credit is given in release notes unless the reporter opts out.
