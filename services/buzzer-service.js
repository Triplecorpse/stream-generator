const buzzerModel = require('./../models/ExternalInputModel');
const clientService = require('./client-service');

function getBuzzerModel() {
  buzzerModel.data.device_type = 'buzzer';
  buzzerModel.data.key = 'push';
  buzzerModel.data.value = 'true 49';

  return buzzerModel;
}

function sendBuzzer() {clientService.sendMessage(getBuzzerModel());}

module.exports = {sendBuzzer};