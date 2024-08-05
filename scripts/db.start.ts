import { startDbContainer } from '../test/utils/container';

module.exports = async () => {
  console.log('🚀🚀🚀 file: db.start.ts [line 4] start dbContainer');
  globalThis.dbContainer = await startDbContainer();
};
