import { formatEther, MaxUint256, parseEther } from 'ethers';
import { program } from '@command';
import { wallet } from '@provider';
import { withdrawalRequestContract } from '@contracts';
import {
  addAccessControlSubCommands,
  addOssifiableProxyCommands,
  addParsingCommands,
  addPauseUntilSubCommands,
} from './common';

const withdrawal = program.command('withdrawal-request').description('interact with withdrawal request contract');
addAccessControlSubCommands(withdrawal, withdrawalRequestContract);
addOssifiableProxyCommands(withdrawal, withdrawalRequestContract);
addParsingCommands(withdrawal, withdrawalRequestContract);
addPauseUntilSubCommands(withdrawal, withdrawalRequestContract);

withdrawal
  .command('request')
  .description('request withdrawal')
  .argument('<amount>', 'stETH amount')
  .option('-a, --address <string>', 'owner address', wallet.address)
  .action(async (amount, options) => {
    const { address } = options;
    const result = await withdrawalRequestContract.requestWithdrawals([parseEther(amount)], address);
    console.log('result', result);
  });

withdrawal
  .command('claim')
  .description('claim withdrawal')
  .argument('<number>', 'request id')
  .action(async (requestId) => {
    await withdrawalRequestContract.claimWithdrawal(requestId);
    console.log('claimed');
  });

withdrawal
  .command('bunker')
  .description('returns if bunker mode is active')
  .action(async () => {
    const isBunker = await withdrawalRequestContract.isBunkerModeActive();
    console.log('bunker', isBunker);
  });

withdrawal
  .command('bunker-start')
  .description('returns bunker start timestamp')
  .action(async () => {
    const timestamp = await withdrawalRequestContract.bunkerModeSinceTimestamp();
    if (timestamp == MaxUint256) {
      console.log('bunker is not started');
    } else {
      console.log('bunker start', new Date(Number(timestamp) * 1000));
    }
  });

withdrawal
  .command('unfinalized-steth')
  .description('returns unfinalized stETH')
  .action(async () => {
    const unfinalizedStETH = await withdrawalRequestContract.unfinalizedStETH();
    console.log('unfinalized stETH', formatEther(unfinalizedStETH));
  });
