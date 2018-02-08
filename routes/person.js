const personService = require('../services/person-service');
const person_update = require('../models/PersonUpdateModel');

module.exports = app => {
  app.get('/person/:action', (req, res) => {

    if (req.params.action === 'add') {
      addPerson(req.query.ageValue, req.query.gender, req.query.posX, req.query.posY, req.query.posZ,
        req.query.ageDeviation, req.query.posDeviation, {
          looking_at_screen: req.query.lookingAtScreen || 0,
          raising_left_hand: req.query.lRaised || 0,
          raising_right_hand: req.query.rRaised || 0,
        });
      res.sendStatus(200);
    } else if (req.params.action === 'remove') {
      removePerson(req.query.id);
      res.sendStatus(200);
    } else if (req.params.action === 'edit') {
      editPerson(req.query.id, {
        posX: req.query.posX,
        posY: req.query.posY,
        posZ: req.query.posZ,
        looking_at_screen: req.query.looking_at_screen,
        raising_left_hand: req.query.raising_left_hand,
        raising_right_hand: req.query.raising_right_hand
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
};

function addPerson(age, gender, posX, posY, posZ, ageDev, posDev, aux) {
  const person = person_update.data;

  person.rolling_expected_values.age = age;
  person.rolling_expected_values.gender = gender;
  person.coordinates.x = posX;
  person.coordinates.y = posY;
  person.coordinates.z = posZ;
  person.behavior.body.raising_left_hand = +aux.raising_left_hand;
  person.behavior.body.raising_right_hand = +aux.raising_right_hand;
  person.behavior.head.looking_at_screen = +aux.looking_at_screen;

  person_update.deviations = {
    age: {init: age, deviation: ageDev},
    position: {init: {x: posX, y: posY, z: posZ}, deviation: posDev}
  };

  person_update.data = person;

  personService.addPerson(JSON.parse(JSON.stringify(person_update)));
}

function removePerson(id) {
  personService.removePerson(id);
}

function editPerson(id, editablePersonProperties) {
  const person = personService.getPersonById(id);
  const clearProperties = {};

  for (let prop in editablePersonProperties) {
    if (editablePersonProperties.hasOwnProperty(prop)) {
      if (editablePersonProperties[prop] !== undefined) {
        clearProperties[prop] = editablePersonProperties[prop];
      }
    }
  }

  for (let prop in clearProperties) {
    if (clearProperties.hasOwnProperty(prop)) {
      if (prop === 'raising_left_hand') {
        person.data.behavior.body.raising_left_hand = +clearProperties[prop];
      }
      if (prop === 'raising_right_hand') {
        person.data.behavior.body.raising_right_hand = +clearProperties[prop];
      }
      if (prop === 'looking_at_screen') {
        person.data.behavior.head.looking_at_screen = +clearProperties[prop];
      }
      if (prop === 'posX') {
        person.deviations.position.init.x = +clearProperties[prop];
      }
      if (prop === 'posY') {
        person.deviations.position.init.y = +clearProperties[prop];
      }
      if (prop === 'posZ') {
        person.deviations.position.init.z = +clearProperties[prop];
      }
    }
  }

  personService.editPerson(id, person);
}
