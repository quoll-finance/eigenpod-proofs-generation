#!/usr/bin/env zx

import fs from 'fs';
import path from 'path';
import process from 'process';

import fetch from 'isomorphic-fetch';

const {
    slot
} = argv;

const baseUrl = 'https://cosmopolitan-crimson-glitter.ethereum-goerli.quiknode.pro/ba6360ab2932ec7e5abae33685aa68960ba97ae3';

const getBlockHeader = (slot = 'head') => fetch(`${baseUrl}/eth/v1/beacon/headers/${slot}`).then(res => res.json());

const getBlock = (slot = 'head') => fetch(`${baseUrl}/eth/v2/beacon/blocks/${slot}`).then(res => res.json());

const getState = (slot = 'head') => fetch(`${baseUrl}/eth/v2/debug/beacon/states/${slot}`).then(res => res.json());

const cwd = process.cwd();

const writeFile = async (filename, data) => {
    const dir = path.resolve(cwd, 'data');
    await $`mkdir -p ${dir}`;

    const filepath = path.resolve(cwd, 'data', filename);
    console.log(`writing to file ${filepath}...`);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
};

const prepareData = async () => {
    console.log(`fetching block header, slot ${slot ?? 'latest'}...`);
    const blockHeader = await getBlockHeader(slot);
    const slotNumber = blockHeader.data.header.message.slot;

    console.log(`fetching block and state, slot ${slotNumber}...`);
    const [
        block,
        state
    ] = await Promise.all([
        getBlock(slotNumber),
        getState(slotNumber)
    ]);

    await Promise.all([
        writeFile('block_header.json', blockHeader),
        writeFile('block.json', block),
        writeFile('slot.json', state)
    ]);
};

prepareData();
