module.exports = async function () {
  await globalThis.dbContainer.stop({ timeout: 10000, removeVolumes: true });
  console.log('🚀🚀🚀 file: db.down.js [line 4] stop dbContainer');
};
