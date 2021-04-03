var read = require('./read');
var update = require('./update');
var notify = require('./notify');

var ulogs = new Set();

var minPollTime = 350;
var maxPollTime = 5000;
var defaultPollTime = 350;

module.exports = function(ulog) {
  var delay = defaultPollTime;
  var intervalId = null;

  if(!ulogs.has(ulog)) {
    // storage events unfortunately only fire on events triggered by other windows...
    // so we need to poll here...
    startPolling();

    ulogs.add(ulog);
  }

  return stopPolling;

  function stopPolling() {
    if(intervalId !== null) {
      clearInterval(intervalId);

      intervalId = null;
    }
  }
  function startPolling(){
    intervalId = setInterval(pollStorageConfig, delay)
  }

  function pollStorageConfig(){
    if (ulog.config) {
      var cfg = read(ulog);

      var changed = update(ulog.config, cfg);

      if (changed.length) {
        notify(ulog, changed)
      }

      var newDelay = parseInt(ulog.get('poll_time'), 10) || defaultPollTime;
      if(newDelay < minPollTime) {
        newDelay = minPollTime;
      } else if(newDelay > maxPollTime) {
        newDelay = maxPollTime;
      }
      if (newDelay !== delay) {
        delay = newDelay;
        stopPolling();
        startPolling();
      }
    }
  }
};
