module.exports = {
  up: (QueryInterface) => {
    return QueryInterface.bulkInsert(
      'roles',
      [
        {
          id_user: 1,
          role: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: () => {},
};
