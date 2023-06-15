import { CustomerInformation } from "../model/information";
import { faker } from "@faker-js/faker";
import { User } from "../model/requests";

export class DataFactory {
  public static getCustomerInformation(): CustomerInformation {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };
  }

  public static getUserDetails(): User {
    return {
      name: faker.person.fullName(),
      job: faker.person.jobType(),
    };
  }
}
