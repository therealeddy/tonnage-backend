module.exports = {
  up: (QueryInterface) => {
    return QueryInterface.bulkInsert(
      'configurations',
      [
        {
          type: 'price',
          price_per_kilometer: 0,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: () => {},
};
