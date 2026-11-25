require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');

const q = (text, options, correctIndex) => ({ text, options, correctIndex });

const questions = [
  q('Which keyword declares a block-scoped variable that can be reassigned?', ['var', 'let', 'const', 'static'], 1),
  q('What does typeof null return in JavaScript?', ['"null"', '"undefined"', '"object"', '"number"'], 2),
  q('Which array method adds an element to the end of an array?', ['push()', 'pop()', 'shift()', 'unshift()'], 0),
  q("What is the result of 2 + '2' in JavaScript?", ['4', '22', 'NaN', 'TypeError'], 1),
  q('Which of these is NOT a primitive type in JavaScript?', ['Symbol', 'Boolean', 'Float', 'BigInt'], 2),
  q('What does JSON.parse() do?', [
    'Converts an object to a JSON string',
    'Converts a JSON string to a JavaScript value',
    'Sends JSON to the server',
    'Validates a JSON schema',
  ], 1),
  q('Which React hook is used to keep state in a function component?', ['useEffect', 'useState', 'useRef', 'useMemo'], 1),
  q('In MongoDB, what is the closest equivalent of a SQL table?', ['Document', 'Collection', 'Field', 'Index'], 1),
  q('Which HTTP method is normally used to create a new resource?', ['GET', 'PUT', 'POST', 'DELETE'], 2),
  q('Which Express function registers middleware for every request?', ['app.use()', 'app.mount()', 'app.listen()', 'app.render()'], 0),
  q('What does the === operator compare?', ['Value only', 'Type only', 'Value and type', 'Memory address only'], 2),
  q('Which HTTP status code means the request is unauthorized?', ['200', '401', '404', '500'], 1),
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Question.deleteMany({});
  await Question.insertMany(questions);
  console.log(`Seeded ${questions.length} questions`);
  await mongoose.disconnect();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});