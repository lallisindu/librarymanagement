const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'lallisindu',
  database: 'library',
});

// Define the Book model
const Book = sequelize.define('Book', {
    bookName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    takeOn: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    deliverAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fine: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});

// Define the ReturnBook model
const ReturnBook = sequelize.define('ReturnBook', {
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// Relationships
Book.hasMany(ReturnBook, { foreignKey: 'bookId' });
ReturnBook.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = {
    Sequelize,
    DataTypes,
    Op,
    sequelize,
    Book,
    ReturnBook,
  };
