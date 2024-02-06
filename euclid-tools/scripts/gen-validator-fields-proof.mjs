#!/usr/bin/env zx

const {
  validatorIndex,
  chainID
} = argv;

if (!validatorIndex) {
  console.error("Please specify validatorIndex, e.g. 707739 for Goerli node");
  process.exit(1);
}

if (!chainID) {
  console.error("Please specify chainID, e.g. 5 for Goerli");
  process.exit(1);
}

console.log("Building generation executable...");
await $`cd ../generation && go build`;

console.log("Generating validator fields proof...");
await $`cd .. && ./generation/generation -command ValidatorFieldsProof \
  -oracleBlockHeaderFile "./euclid-tools/data/block_header.json" \
  -stateFile "./euclid-tools/data/slot.json" \
  -validatorIndex ${validatorIndex} \
  -outputFile "./euclid-tools/data/proof.json" \
  -chainID ${chainID}`;
