#!/usr/bin/env zx

await $`../generation/generation -command ValidatorFieldsProof \
  -oracleBlockHeaderFile "./euclid-tools/data/block_header.json" \
  -stateFile "./euclid-tools/data/slot.json" \
  -validatorIndex 707739 \
  -outputFile "./euclid-tools/data/withdrawal_credential_proof.json" \
  -chainID 5`;
