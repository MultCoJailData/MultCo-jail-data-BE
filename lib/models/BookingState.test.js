require('dotenv').config();
const scrapeHTML = require('../scripts/scrape-html');
const Detention = require('./Detention');
const BookingState = require('./BookingState');
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const fs = require('fs').promises;


describe('booking model', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  let booking;

  // beforeEach(async() => {
  //   // booking = await Booking.create({
  //   //   bookingNumber: '2383848',
  //   //   swisId: '93829',
  //   //   bookingDate: '12/11/2019 09:29 PM'
  //   });

  // });

  afterAll(() => {
    return mongoose.connection.close();
  });

  // it('creates a detention when a booking is created', async() => {
  //   const detention = await Detention.findOne({
  //     bookingNumber: '2383848',
  //   });
  //   expect(detention.toObject()).toEqual({
  //     _id: detention._id,
  //     bookingNumber: '2383848',
  //     bookingDate: new Date('12/11/2019 09:29 PM'),
  //     states: [booking._id],
  //     __v: 1
  //   });
  // });
  // it('adds a booking to an existing detention', async() => {
  //   const bookingTwo = await Booking.create({
  //     bookingNumber: '2383848',
  //     swisId: '93829',
  //     bookingDate: '12/12/2019 09:29 PM',
  //     assignedFacility: 'The Slammer',
  //   });
  //   const detention = await Detention.findOne({
  //     bookingNumber: '2383848',
  //   });
  //   return expect(detention.toObject()).toEqual({
  //     _id: detention._id,
  //     bookingNumber: '2383848',
  //     bookingDate: new Date('12/11/2019 09:29 PM'),
  //     states: [booking._id, bookingTwo._id],
  //     __v: expect.any(Number)
  //   });
  // });

  // it('doesn\'t add a booking if it is the same as the last.', async() => {
  //   await Booking.create({
  //     bookingNumber: '2383848',
  //     swisId: '93829',
  //     bookingDate: '12/11/2019 09:29 PM'
  //   });
  //   const detention = await Detention.findOne({
  //     bookingNumber: '2383848',
  //   });
  //   return expect(detention.toObject()).toEqual({
  //     _id: detention._id,
  //     bookingNumber: '2383848',
  //     bookingDate: new Date('12/11/2019 09:29 PM'),
  //     states: [booking._id],
  //     __v: expect.any(Number)
  //   });
  // });

  it('creates a bookingState from scrapeObject', async() => {
    const buffer = await fs.readFile('lib/test-data/test-page.html');
    const html = buffer.toString();
    const scrapeObject = scrapeHTML(html);
    const bookingState = await BookingState.create(scrapeObject);
    return expect(bookingState.toObject()).toEqual({
      _id: bookingState._id,
      bookingNumber: '1489454',
      assignedFacility: 'MCDC',
      projectedReleaseDate: 'Unknown',
      cases: [
        {
          _id: bookingState.cases[0]._id,
          courtCaseNumber: '19CR27952',
          daCaseNumber: '2401669',
          citationNumber: 'None',
          charges: [
            {
              _id: bookingState.cases[0].charges[0]._id,
              bail: '$5,000',
              description: 'THEFT I (C Felony)',
              status: 'Unsentenced',
            }
          ],
        }
      ],
      dateAdded: expect.any(Date),
      __v: 0
    }
    );
  });
});
