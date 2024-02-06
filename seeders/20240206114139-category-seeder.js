'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('categories', [
    {
      name: 'Node.js',
    },
    {
      name: 'Vue.js'
    },
    {
      name: 'ReactJS',
    },
    {
      name: 'Vue.js'
    },
    {
      name: 'ReactNative'
    },
    {
      name: 'Laravel'
    },
    {
      name: 'Dino'
    }
  ]);
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulDelete('categories', {}, null);
  }
};
