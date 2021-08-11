module.exports = {
  up: (QueryInterface) => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          nickname: 'admin',
          name: 'admin',
          email: 'admin@gmail.com',
          cpf: '111.111.111-11',
          tel: '(99) 99999-9999',
          password: '123456',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: () => {},
};
