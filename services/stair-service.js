const stairModel = require('../models/ExternalInputModel');
const clientService = require('./client-service');
const intervals = {};

function getStairModelFor(id, key) {
  stairModel.data.device_type = 'stair';
  stairModel.data.key = key;
  stairModel.data.value = `true ${id}`;

  return stairModel;
}

function toggleStairEvent(stairId) {
  if (!intervals[stairId] || !intervals[stairId]['push']) {
    intervals[stairId] = intervals[stairId] || {};
    intervals[stairId]['push'] = setInterval(event => {
      clientService.sendMessage(getStairModelFor(stairId, event));
    }, 200, 'push');
  } else {
    clearInterval(intervals[stairId]['push']);
    delete intervals[stairId]['push'];
  }
}

function highlightStair(status, stairId) {
  if ((!intervals[stairId] || !intervals[stairId]['light']) && status) {
    intervals[stairId] = intervals[stairId] || {};
    intervals[stairId]['light'] = setInterval(() => {
      clientService.sendMessage(getStairModelFor(stairId, 'light'));
    }, 200);
  } else {
    clearInterval(intervals[stairId]['light']);
    delete intervals[stairId]['light'];
  }
}

module.exports = {toggleStairEvent, highlightStair};