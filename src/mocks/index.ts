import { faker } from '@faker-js/faker/locale/en';

export function mockUsers(length: number) {
  const createRowData = (rowIndex: number) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const gender = faker.person.sex() as 'female' | 'male';
    const name = faker.person.fullName({firstName, lastName, sex: gender});
    const avatar = faker.image.avatar();

    const city = faker.location.city();
    const street = faker.location.street();
    const email = faker.internet.email();
    const amount = faker.finance.amount({ min: 1000, max: 999999 });

    const rating = 2 + Math.floor(Math.random() * 3);
    const progress = Math.floor(Math.random() * 100);

    return {
      id: (rowIndex + 1).toString(),
      avatar,
      lastName,
      firstName,
      fullName: name,
      city,
      street,
      email: email.toLocaleLowerCase(),
      rating,
      skills: progress,
      income: amount
    };
  };

  return Array.from({ length }).map((_, index) => {
    return createRowData(index);
  });
}