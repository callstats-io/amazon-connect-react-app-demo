import config from './config';

let callstatsAmazonShim = null;
let localId;
const appId = config.appId;
const appSecret = config.appSecret;
const ccpUrl = config.ccpUrl;

const containerDiv = document.getElementById('containerDiv');

connect.core.initCCP(containerDiv, {
  ccpUrl: ccpUrl,
  loginPopup: true,
  softphone: {
    allowFramedSoftphone: false
  }
});

connect.core.initSoftphoneManager({allowFramedSoftphone: true});
connect.agent(subscribeToAgentEvents);

function csInitCallback (err, msg){
  console.log(`CallStats Initializing Status: err=${err} msg=${msg}`);

  setInterval(function() {
    callstatsAmazonShim.makePrecallTest()
  }, 60 * 1000)
}

function subscribeToAgentEvents(agent) {
  console.log('subscribeToAgentEvents');
  localId = agent.getName();
  callstatsAmazonShim = window.CallstatsAmazonShim.initialize(connect, appId, appSecret, localId, null, csInitCallback);
  var agentMonitor = new callstatsAgentMonitor();
  agentMonitor.initialize(connect, ccpUrl, appId, appSecret, localId);
}
