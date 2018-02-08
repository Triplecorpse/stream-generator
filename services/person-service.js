const persons_alive = require('../models/PersonAliveModel');
const people = [];
const clientService = require('./client-service');
const generateId = require('./idGenerator');
const deviate = require('./deviator');

const timers = {
  persons_alive: null,
  person_update: {}
};

function deviateValues(person_update) {
  if (!person_update.deviations) {
    return person_update;
  } else {
    if (person_update.deviations.age) {
      person_update.data.rolling_expected_values.age = deviate(+person_update.deviations.age.init, +person_update.deviations.age.deviation);
    }

    if (person_update.deviations.position) {
      person_update.data.coordinates.x = deviate(+person_update.deviations.position.init.x, +person_update.deviations.position.deviation);
      person_update.data.coordinates.y = deviate(+person_update.deviations.position.init.y, +person_update.deviations.position.deviation);
      person_update.data.coordinates.z = deviate(+person_update.deviations.position.init.z, +person_update.deviations.position.deviation);
    }
  }

  return person_update;
}

function addPerson(person) {
  person.data.person_id = generateId();
  people.push(JSON.parse(JSON.stringify(person)));

  if (!timers.person_update[person.data.person_id]) {
    timers.person_update[person.data.person_id] = setInterval((person_id) => {
      let person = getPersonById(person_id);
      let deviations = person.deviations;
      let personToSend = deviateValues(person);

      personToSend.data.person_put_id = generateId();
      personToSend.data.local_timestamp = new Date().getTime();
      delete personToSend.deviations;
      clientService.sendMessage(personToSend);
      person.deviations = deviations;
    }, 200, person.data.person_id);
  }
}

function getPersonById(person_id) {
  return JSON.parse(JSON.stringify(people.find(person => person.data.person_id === person_id)));
}

function editPerson(person_id, person) {
  let personIndex;

  people.forEach((person, index) => {
    if (person.data.person_id === person_id) {
      personIndex = index;
    }
  });

  if (personIndex > -1) {
    people[personIndex] = person;
  }
}

function removePerson(person_id) {
  let personIndex;
  let personIdsIndex;

  people.forEach((person, index) => {
    if (person_id === person.person_id) {
      personIndex = index;
    }
  });

  persons_alive.data.person_ids.forEach((person, index) => {
    if (person_id === person.person_id) {
      personIdsIndex = index;
    }
  });

  people.splice(personIndex, 1);
  persons_alive.data.person_ids.splice(personIdsIndex, 1);

  if (timers.person_update[person_id]) {
    clearInterval(timers.person_update[person_id]);
    delete timers.person_update[person_id];
  }
}

function startPersonAliveStream() {
  timers.persons_alive = setInterval(() => {
    persons_alive.data.person_ids = people.map(person => person.data.person_id);
    clientService.sendMessage(persons_alive);
  }, 200);
}

function stopPersonAliveStream() {
  clearInterval(timers.persons_alive);
}

module.exports = {
  addPerson, removePerson, editPerson, getPersonById, startPersonAliveStream, stopPersonAliveStream
};