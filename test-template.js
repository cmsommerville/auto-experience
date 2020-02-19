const handlebars = require('handlebars');

const source = `{{#each person}}<p>{{name}}: {{year}}</p>{{/each}}`;

const data = {
  person: [{name: "Chandler", year: 2017}, {name: "Sally", year: 2018}]
};

const template = handlebars.compile(source);
console.log(template(data));
