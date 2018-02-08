const PersonUpdate = require('../models/PersonUpdateModel');
const people = [];
const _ = require('lodash');

function addPerson(age, gender, position, looking, ageDev, posDev) {
    people.push(new PersonUpdate(age, gender, position, looking, ageDev, posDev));
}

function removePerson(id) {
    if (!id) {
        throw new Error('Id is not defined at removePerson');
    }

    people.splice(_.findIndex(people, person => person.person_id === id), 1);
}

function editPerson(id, editablePersonProperties) {
    const person = _.find(people, person => person.data.person_id === id);

    if (editablePersonProperties.rRaised !== undefined) {
        editablePersonProperties.rRaised === 'true'
            ? person.data.behavior.body.raising_right_hand = 1
            : person.data.behavior.body.raising_right_hand = 0;
    }

    if (editablePersonProperties.lRaised !== undefined) {
        editablePersonProperties.lRaised === 'true'
            ? person.data.behavior.body.raising_left_hand = 1
            : person.data.behavior.body.raising_left_hand = 0;
    }

    if (editablePersonProperties.looking !== undefined) {
        editablePersonProperties.looking === 'true'
            ? person.data.behavior.head.looking_at_screen = 1
            : person.data.behavior.head.looking_at_screen = 0;
    }

    if (editablePersonProperties.posX !== undefined && editablePersonProperties.posY !== undefined && editablePersonProperties.posZ !== undefined) {
        person.deviations.initPos.x = +editablePersonProperties.posX;
        person.deviations.initPos.y = +editablePersonProperties.posY;
        person.deviations.initPos.z = +editablePersonProperties.posZ;
    }

}

function getPeople() {
    // to create a deep copy of array and shallow copy of objects
    return people.map(x => x);
}

module.exports = {
    getPeople, removePerson, addPerson, editPerson
};
