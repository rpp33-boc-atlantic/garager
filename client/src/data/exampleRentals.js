const rentalListings = [
  {
    id: 1,
    name: 'Hammer',
    details: {
      category: 'Hand Tools',
      description: 'A simple hammer for your basic needs. Works great to drive nails and break things into small pieces',
      price: 500,
      image: ['https://www.svgrepo.com/show/105084/hammer.svg'],
      location: {
        lat: 37.38860,
        lng: -122.01678
      },
      availability: {
        startDate: 1654066800000,
        endDate: 1656572400000,
        rentedDates: [[1656140400000, 1656140400000]]
      },
      transactions: 5
    }
  },
  {
    id: 2,
    name: 'Barbeque',
    details: {
      category: 'Events',
      description: 'Weber charcoal bbq grill. No propane needed, just light up some coal and grill! Lighter fluid and charcoal briquettes not included in rental.',
      price: 20000,
      image: ['https://www.svgrepo.com/show/297780/barbecue-bbq.svg'],
      location: {
        lat: 37.36965,
        lng: -122.02421
      },
      availability: {
        startDate: 1454066800000,
        endDate: 1654066800000,
        rentedDates: [1656140400000]
      },
      transactions: 10
    }
  },
  {
    id: 3,
    name: 'Mop',
    details: {
      category: 'Cleaning',
      description: 'have dirty floors? This mop has a sturdy handle and is ready to clean all of your floors. Recommended to be used with a mop bucket which can also be rented',
      price: 1000,
      image: ['https://www.svgrepo.com/show/321914/broom.svg'],
      location: {
        lat: 38.58190,
        lng: -121.49350
      },
      availability: {
        startDate: 1754066800000,
        endDate: 1856572400000,
        rentedDates: [1656140400000]
      },
      transactions: 0
    }
  },
  {
    id: 4,
    name: 'Soccer Goals',
    details: {
      category: 'Sports Equipment',
      description: 'Two six foot wide pop up soccer goals. Great to play outside at the park, in a lawn, or even in the driveway! Comes with 4 stakes per goal to keep them mounted to the ground. Excellent for drilling shots or a quick pick up game at the park',
      price: 2500,
      image: ['https://www.svgrepo.com/show/142452/soccer-ball.svg'],
      location: {
        lat: 34.00984,
        lng: -118.25864
      },
      availability: {
        startDate: 1654066800000,
        endDate: 1656572400000,
        rentedDates: [[1656140400000, 1656140400000]]
      },
      traansactions: 20
    }
  }
];

module.exports = rentalListings;