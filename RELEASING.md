# Releasing

Day to day there is nothing to do: pushing a conventional commit to `main` runs
the test suite and, if it passes, publishes the next version. This document
covers the one-time setup that has to happen before the first automated release.

## One-time setup

### 1. Publish once by hand

npm's trusted publishing is configured per package, which means the package has
to exist on the registry before the trust relationship can be created. Publish
the current version manually to create it:

```bash
npm login
npm run verify:package   # build and validate before publishing
npm publish              # --access public is already set in publishConfig
```

This also creates the `@paulojsgg` scope if it does not exist yet. The version
published here (`0.0.1`) is only a placeholder; semantic-release picks the real
version for every release after this.

### 2. Configure the trusted publisher

On npmjs.com, open the package, go to **Settings → Trusted publisher**, and add
a GitHub Actions publisher with:

- Organization or user: `PauloJSGG`
- Repository: `faster-ui`
- Workflow filename: `release.yml`
- Environment: leave blank
- Allowed actions: enable `npm publish`

Trusted publisher configurations created after 20 May 2026 require you to pick at
least one allowed action explicitly, so do not skip the last item.

### 3. Push a real commit

Push a `feat:` or `fix:` commit to `main`. The `Test` job runs lint, typecheck,
Jest, Cypress, and the package validation; the `Release` job then publishes to
npm with provenance and creates the matching GitHub release and tag.

No `NPM_TOKEN` secret is needed anywhere. Authentication happens through the
OIDC token that `id-token: write` grants to the release job.

Provenance is deliberately not set in `publishConfig`. Trusted publishing emits
provenance attestations on its own, and setting the flag explicitly makes any
publish from a machine without a CI OIDC provider fail with
`EUSAGE: Automatic provenance generation not supported for provider: null`.

## How the version is chosen

semantic-release reads the commit messages since the last git tag:

- `fix:` produces a patch release
- `feat:` produces a minor release
- a `BREAKING CHANGE:` footer produces a major release
- anything else (`chore:`, `docs:`, `refactor:`, `test:`) publishes nothing

Because there are no tags yet, the first automated release will be `1.0.0`. If you
would rather stay in `0.x` while the API settles, create a starting tag before the
first release:

```bash
git tag v0.1.0 && git push origin v0.1.0
```

## Notes

- The release job does not commit anything back to `main`. The git tag and the
  GitHub release are the source of truth for what shipped.
- `CHANGELOG.md` is generated during the release and ships inside the npm tarball,
  but is not committed to the repository. If you would rather have it tracked in
  git, add [`@semantic-release/git`](https://github.com/semantic-release/git) to
  the `plugins` array in [.releaserc.json](.releaserc.json).
- `registry-url` is intentionally not set on `actions/setup-node`. It writes an
  `.npmrc` that shadows the OIDC flow and is the most common cause of trusted
  publishing failures.

## The lockfile and npm versions

npm versions disagree about whether `package-lock.json` must record the optional
transitive packages `@emnapi/core` and `@emnapi/runtime`. npm 10.9, 11.0 and 12.0
all require them and fail `npm ci` with `EUSAGE ... are in sync` when they are
absent, while npm 11.6.2 removes them whenever it writes the lockfile.

The committed lockfile includes them, which satisfies every version tested. Two
consequences worth knowing:

- CI pins npm via the `NPM_VERSION` workflow variable rather than using whatever
  version ships with the Node image, so a Node patch release cannot change the
  result of `npm ci`.
- If a local `npm install` drops those two entries again, restore the portable
  form with:

  ```bash
  npx npm@11.0.0 install --package-lock-only
  ```

  You can check any lockfile against several npm versions before pushing:

  ```bash
  for v in 10.9.4 11.0.0 11.6.2 12.0.2; do
    npx -y npm@$v ci --dry-run >/dev/null 2>&1 && echo "$v ok" || echo "$v FAILED"
  done
  ```

## Verifying a release locally

To see what semantic-release would do without publishing:

```bash
GITHUB_TOKEN=<a token with repo scope> npx semantic-release --dry-run --no-ci
```
