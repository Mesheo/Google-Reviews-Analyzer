
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'mesheo',
  applicationName: 'google-reviews-analyzer',
  appUid: '000000000000000000',
  orgUid: '000000000000000000',
  deploymentUid: 'undefined',
  serviceName: 'google-reviews-analyzer',
  shouldLogMeta: false,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'dev',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '7.0.5',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'google-reviews-analyzer-dev-api', timeout: 6 };

try {
  const userHandler = require('./index.js');
  module.exports.handler = serverlessSDK.handler(userHandler.handler, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}