#!/usr/bin/env bash
# Build + push + deploy upskiller.xyz to Cloud Run via Cloud Build, from the CLI.
# Runs the same cloudbuild.yaml the GitHub-connected trigger uses, so local
# builds and triggered builds stay identical.
#
# Usage:
#   ./build.sh
#   SERVICE=upskiller-staging REGION=europe-west1 ./build.sh
#
# Reads deploy config from a root .env (see .env.example) — copy it to .env
# and adjust. Env vars exported before calling this script still win.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ -f "$SCRIPT_DIR/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$SCRIPT_DIR/.env"
  set +a
fi

PROJECT_ID="${PROJECT_ID:-xxx}"
SERVICE="${SERVICE:-xxx}"
REGION="${REGION:-xxx}"
REPOSITORY="${REPOSITORY:-xxx}"
TAG="${TAG:-$(git -C "$SCRIPT_DIR" describe --tags --always --dirty)}"
ASSET_BASE_URL="${VITE_ASSET_BASE_URL:-}"

substitutions="_REGION=${REGION},_SERVICE=${SERVICE},_REPOSITORY=${REPOSITORY},TAG_NAME=${TAG}"
if [[ -n "$ASSET_BASE_URL" ]]; then
  substitutions="${substitutions},_ASSET_BASE_URL=${ASSET_BASE_URL}"
fi

echo "Submitting build: project=${PROJECT_ID} service=${SERVICE} region=${REGION} tag=${TAG}"

gcloud builds submit \
  --project="$PROJECT_ID" \
  --config="$SCRIPT_DIR/cloudbuild.yaml" \
  --substitutions="$substitutions" \
  "$SCRIPT_DIR"
