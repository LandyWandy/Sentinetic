const db = require('./connection');
const { User, Search } = require('../models');
const mongoose = require('mongoose');

db.once('open', async () => {
  try {
    // Delete existing data from the collections
    await User.deleteMany();
    await Search.deleteMany();

    // Create users
    const users = await User.create([
      {
        email: 'user1@example.com',
        password: 'password1',
      },
      {
        email: 'user2@example.com',
        password: 'password2',
      },
      {
        email: 'user3@example.com',
        password: 'password3',
      },
    ]);

    // Create searches
    const searches = [
      {
        searchTerm: 'search1',
        createdAt: new Date(),
        positive: 10,
        neutral: 5,
        negative: 2,
      },
      {
        searchTerm: 'search2',
        createdAt: new Date(),
        positive: 8,
        neutral: 3,
        negative: 1,
      },
      {
        searchTerm: 'search3',
        createdAt: new Date(),
        positive: 12,
        neutral: 6,
        negative: 4,
      },
      {
        searchTerm: 'search4',
        createdAt: new Date(),
        positive: 15,
        neutral: 2,
        negative: 3,
      },
      {
        searchTerm: 'search5',
        createdAt: new Date(),
        positive: 6,
        neutral: 10,
        negative: 1,
      },
      {
        searchTerm: 'search6',
        createdAt: new Date(),
        positive: 10,
        neutral: 5,
        negative: 2,
      },
      {
        searchTerm: 'search7',
        createdAt: new Date(),
        positive: 8,
        neutral: 3,
        negative: 1,
      },
      {
        searchTerm: 'search8',
        createdAt: new Date(),
        positive: 12,
        neutral: 6,
        negative: 4,
      },
      {
        searchTerm: 'search9',
        createdAt: new Date(),
        positive: 15,
        neutral: 2,
        negative: 3,
      },
      {
        searchTerm: 'search10',
        createdAt: new Date(),
        positive: 6,
        neutral: 10,
        negative: 1,
      },
      {
        searchTerm: 'search11',
        createdAt: new Date(),
        positive: 10,
        neutral: 5,
        negative: 2,
      },
      {
        searchTerm: 'search12',
        createdAt: new Date(),
        positive: 8,
        neutral: 3,
        negative: 1,
      },
      {
        searchTerm: 'search13',
        createdAt: new Date(),
        positive: 12,
        neutral: 6,
        negative: 4,
      },
      {
        searchTerm: 'search14',
        createdAt: new Date(),
        positive: 15,
        neutral: 2,
        negative: 3,
      },
      {
        searchTerm: 'search15',
        createdAt: new Date(),
        positive: 6,
        neutral: 10,
        negative: 1,
      },
    ];

    // Convert search objects to ObjectIds
    const searchIds = searches.map((search) => new mongoose.Types.ObjectId());

    // Assign searchIds to each user
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      user.searches = searchIds.slice(i * 5, (i + 1) * 5);
      await user.save();
    }

    // Create search documents separately
    const searchDocuments = searches.map((search, index) => ({
      _id: searchIds[index],
      ...search,
    }));
    await Search.insertMany(searchDocuments);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    db.close();
  }
});
