import { Command } from 'commander';
import { Contract, parseEther } from 'ethers';

export const addBaseOracleCommands = (command: Command, contract: Contract) => {
  command
    .command('genesis')
    .description('returns genesis time')
    .action(async () => {
      const genesisTime = await contract.GENESIS_TIME();
      console.log('genesis time', genesisTime);
    });

  command
    .command('seconds-per-slot')
    .description('returns seconds per slot')
    .action(async () => {
      const secondsPerSlot = await contract.SECONDS_PER_SLOT();
      console.log('seconds per slots', secondsPerSlot);
    });

  command
    .command('consensus-version')
    .description('returns consensus version')
    .action(async () => {
      const version = await contract.getConsensusVersion();
      console.log('version', version);
    });

  command
    .command('consensus-contract')
    .description('returns consensus contract')
    .action(async () => {
      const consensusContract = await contract.getConsensusContract();
      console.log('consensus contract', consensusContract);
    });

  command
    .command('consensus-report')
    .description('returns consensus report')
    .action(async () => {
      const consensusReport = await contract.getConsensusReport();
      console.log('consensus report', consensusReport);
    });

  command
    .command('last-processing-ref-slot')
    .description('returns last processing ref slot')
    .action(async () => {
      const refSlot = await contract.getLastProcessingRefSlot();
      console.log('last processing ref slot', refSlot);
    });
};
