require('dotenv').config();
const mongoose = require('mongoose');
const Party = require('./models/Party');
const Election = require('./models/Election');
const Candidate = require('./models/Candidate');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Party.deleteMany({});
  await Election.deleteMany({});
  await Candidate.deleteMany({});

  const party1 = await Party.create({ name: 'Party A', symbol: '🌟' });
  const party2 = await Party.create({ name: 'Party B', symbol: '🔥' });

  const election = await Election.create({ name: '2025 State Election', date: new Date(), type: 'State', constituency: 'Chennai' });

  await Candidate.create({ name: 'Alice', age: 40, election: election._id, party: party1._id, constituency: 'Chennai' });
  await Candidate.create({ name: 'Bob', age: 35, election: election._id, party: party2._id, constituency: 'Chennai' });

  console.log('✅ Seed data created!');
  process.exit(0);
});