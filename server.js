require('dotenv').config();
require('./lib/utils/connect')();

const app = require('./lib/app');
const seed = require('./lib/scripts/seed');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});
