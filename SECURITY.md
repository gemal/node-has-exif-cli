# Security Policy

## Supported Versions

Only the latest published version of `has-exif-cli` is supported.
Releases are automated and frequent, so please update to the newest
version before reporting an issue.

| Version | Supported |
| ------- | --------- |
| latest  | yes       |
| older   | no        |

## Reporting a Vulnerability

Please do not open a public issue for security problems.

Report vulnerabilities privately via GitHub's private vulnerability
reporting: <https://github.com/gemal/node-has-exif-cli/security/advisories/new>

Alternatively, email [henrik@gemal.dk](mailto:henrik@gemal.dk).

Please include:

- a description of the issue and its impact
- steps to reproduce (a proof-of-concept image file is welcome)
- the version of `has-exif-cli` and Node.js you used

You will normally receive a response within 7 days. Once the issue is
confirmed, a fix is developed privately and published as a new release,
after which the advisory is disclosed.

## Scope

`has-exif-cli` is a command line tool that parses image files. The most
security-relevant area is the handling of untrusted or malformed image
input passed to the CLI. Vulnerabilities in dependencies should be
reported upstream, but reports about how they affect this tool are
still appreciated.
