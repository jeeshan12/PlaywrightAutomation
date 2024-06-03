import type { CustomerInformation } from "../model/information";
import { faker } from "@faker-js/faker";
import type { User } from "../model/requests";

// biome-ignore lint/complexity/noStaticOnlyClass: <Need to have static methods for data factory>
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
