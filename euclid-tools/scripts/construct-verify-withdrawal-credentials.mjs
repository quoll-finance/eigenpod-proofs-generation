#!/usr/bin/env zx

import fs from 'fs';
import path from 'path';

import {PROOF_FILE_NAME} from './constants.mjs';

function concatHexStrings(hexStrings) {
    return hexStrings.reduce((acc, hex) => acc + hex.slice(2), '0x');
}

const cwd = process.cwd();
const proofFilePath = path.resolve(cwd, 'data', PROOF_FILE_NAME.VALIDATOR_FIELDS_PROOF);
const proofContent = JSON.parse(fs.readFileSync(proofFilePath, 'utf8'));

console.log(JSON.stringify({
    stateRootProof: {
        beaconStateRoot: proofContent.beaconStateRoot,
        proof: concatHexStrings(proofContent.StateRootAgainstLatestBlockHeaderProof)
    },
    validatorFieldsProofs: concatHexStrings(proofContent.WithdrawalCredentialProof),
    validatorFields: [proofContent.ValidatorFields]
}));
