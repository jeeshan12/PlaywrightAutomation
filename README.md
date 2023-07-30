# Playwright Automation

[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

[![forthebadge](https://forthebadge.com/images/badges/for-you.svg)](https://forthebadge.com)

![RUNS WITH GITHUB ACTIONS](https://img.shields.io/badge/RUNS%20WITH%20GITHUB%20ACTIONS-BLUE?style=for-the-badge)

![RUNS ON DOCKER CONTAINER](https://img.shields.io/badge/RUNS%20ON%20DOCKER%20CONTAINER-BLUE?style=for-the-badge)

![USES ZOD](https://img.shields.io/badge/USES%20ZOD-gray?style=for-the-badge)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=shields)](http://makeapullrequest.com)

[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mohdjeeshan)

##### `A boilerplate framework that helps you to write automation tests for UI, REST API, GraphQL and Visual E2E.`

# Table of contents

- [Installing Dependencies](#installing-dependencies)

- [Utilities](#utilities)

- [POM](#pom)

- [Fixtures](#fixtures)

- [Specs](#specs)

- [Execution](#execution)

- [Docker](#docker)

- [Reporting](#reporting)

- [CI](#ci)

- [Update Snapshots](#update-snapshots)

# Installing Dependencies

[(Back to top)](#table-of-contents)

1. Clone the Github repository

```

git clone https://github.com/jeeshan12/PlaywrightAutomation.git

```

2. Run below command in terminal to install the node dependencies locally

```

npm ci

```

# Utilities

[(Back to top)](#table-of-contents)

### Custom utility for GraphQL

`performGraphQLOperation(apiRequestContext: APIRequestContext, graphQLOptions: GraphQLOptions, testInfo: TestInfo)`

##### Params Description

- **apiRequestContext:** This API is used for the Web API testing. This is passed as a fixture to this method call.

- **testInfo:** It provides information about currently running test. This is used to attach additional details to the report.

- **graphQLOptions:** This is an interface `GraphQLOptions` which provides strutcure to our Graphql query options.

##### graphQLOptions: `GraphQLOptions`

```

export interface GraphQLOptions extends ReportOptions{

url: string;

query: string;

queryVariables?: { [key: string]: string | number | boolean };

headers?: { [key: string]: string };

}

```

`ReportOptions` is common interface to all API calls.

```

export interface ReportOptions {

attachRequestToReports?: boolean;

attachResponseToReports?: boolean;

}

```

###

| options | description | required |

| query | graphqlQuery | Y |

| queryVariables | graphqlVariables | N **(optional)** |

| url | endpoint | Y |

| headers | headers to pass for request| N `(set to "Content-Type": "application/json" Accept: "application/json"by default)` **(optional)** |

| attachRequestToReports | Attach request to the reports | N|

| attachResponseToReports | Attach response to the reports | N |

### Custom utility for Rest API

`performGetOperation(apiRequestContext: APIRequestContext, testInfo: TestInfo, getOptions: GetMethodOptions)`

##### Params Description

- **apiRequestContext:** This API is used for the Web API testing. This is passed as a fixture to this method call.

- **testInfo:** It provides information about currently running test. This is used to attach additional details to the report.

- **getOptions:** This is an interface `GetMethodOptions` which provides strutcure to our Rest API call.

##### getOptions: `GetMethodOptions`

```

export interface GetMethodOptions extends ReportOptions {

url: string;

headers?: { [key: string]: string };

params?: { [key: string]: string | number | boolean };

}

```

| options | description | required |

| url | endpoint | Y |

| headers | headers to pass for request| N `(set to "Content-Type": "application/json" Accept: "application/json"by default)` **(optional)** |

| params | query params | N **(optional)** |

`performPostOperation(apiRequestContext: APIRequestContext, testInfo: TestInfo, postOptions: PostMethodOptions)`

##### Params Description

- **apiRequestContext:** This API is used for the Web API testing. This is passed as a fixture to this method call.

- **testInfo:** It provides information about currently running test. This is used to attach additional details to the report.

- **postOptions:** This is an interface `PostMethodOptions` which provides strutcure to our Rest API call.

##### postOptions: `PostMethodOptions`

```

export interface PostMethodOptions extends ReportOptions {

url: string;



headers?: { [key: string]: string };



params?: { [key: string]: string | number | boolean };



data?: string | Buffer | Serializable;



form?: { [key: string]: string | number | boolean };



multipart?: {

[key: string]:

| string

| number

| boolean

| ReadStream

| {

/**

* File name

*/

name: string;



/**

* File type

*/

mimeType: string;



/**

* File content

*/

buffer: Buffer;

};

};

}

```

| options | description | required |

| url | endpoint | Y |

| headers | headers to pass for request| N `(set to "Content-Type": "application/json" Accept: "application/json"by default)` **(optional)** |

| params | query params | N **(optional)** |

| data | request body | Y (either one of three is required **data**, **form** **or** **multipart**)|

| form | request form data | Y (either one of three is required **data**, **form** **or** **multipart**)|

| multipart | request file upload data | Y (either one of three is required **data**, **form** **or** **multipart**)|

`performPutOperation(apiRequestContext: APIRequestContext, testInfo: TestInfo, putOptions: PutMethodOptions)`

##### Params Description

- **apiRequestContext:** This API is used for the Web API testing. This is passed as a fixture to this method call.

- **testInfo:** It provides information about currently running test. This is used to attach additional details to the report.

- **putOptions:** This is an interface `PutMethodOptions` which provides strutcure to our REST API call.

##### putOptions: `PutMethodOptions`

```

export interface PutMethodOptions extends ReportOptions {

url: string;



headers?: { [key: string]: string };



params?: { [key: string]: string | number | boolean };



data?: string | Buffer | Serializable;



form?: { [key: string]: string | number | boolean };



multipart?: {

[key: string]:

| string

| number

| boolean

| ReadStream

| {

/**

* File name

*/

name: string;



/**

* File type

*/

mimeType: string;



/**

* File content

*/

buffer: Buffer;

};

};

}

```

| options | description | required |

| url | endpoint | Y |

| headers | headers to pass for request| N `(set to "Content-Type": "application/json" Accept: "application/json"by default)` **(optional)** |

| params | query params | N **(optional)** |

| data | request body | Y (either one of three is required **data**, **form** **or** **multipart**)|

| form | request form data | Y (either one of three is required **data**, **form** **or** **multipart**)|

| multipart | request file upload data | Y (either one of three is required **data**, **form** **or** **multipart**)|

`performDeleteOperation(apiRequestContext: APIRequestContext, testInfo: TestInfo, deleteOptions: DeleteMethodOptions)`

##### Params Description

- **apiRequestContext:** This API is used for the Web API testing. This is passed as a fixture to this method call.

- **testInfo:** It provides information about currently running test. This is used to attach additional details to the report.

- **deleteOptions:** This is an interface `DeleteMethodOptions` which provides strutcure to our REST API call.

##### deleteOptions: `DeleteMethodOptions`

```

export interface DeleteMethodOptions extends ReportOptions {

url: string;



data?: string | Buffer | Serializable;



form?: { [key: string]: string | number | boolean };



headers?: { [key: string]: string };



multipart?: {

[key: string]:

| string

| number

| boolean

| ReadStream

| {

name: string;

mimeType: string;

buffer: Buffer;

};

};



params?: { [key: string]: string | number | boolean };

}



```

| options | description | required |

| url | endpoint | Y |

| headers | headers to pass for request| N `(set to "Content-Type": "application/json" Accept: "application/json"by default)` **(optional)** |

| params | query params | N **(optional)** |

| data | request body | N **(optional)**|

| form | request form data | N **(optional)** |

| multipart | request file upload data | N **(optional)**|

# POM

[(Back to top)](#table-of-contents)

We will be using Page object Model and Page components to design our tests. Pages are maintained under `pages` folder and Page components are maintained under `pagecomponents`. To get more information on Page Object, refer to this beautiful article [Page Object](https://martinfowler.com/bliki/PageObject.html) by `Martin Fowler`.

# Fixtures

[(Back to top)](#table-of-contents)

Test fixtures are used to establish an environment for each test, giving the test everything it needs and nothing else. Test fixtures are isolated between tests. With fixtures, you can group tests based on their meaning instead of their standard setup. More information about fixtures can be found on official documentation [here](https://www.cuketest.com/playwright/docs/test-fixtures/).

Here is another [blog](https://blog.delpuppo.net/playwright-fixtures) for Playwright fixtures.

# Specs

[(Back to top)](#table-of-contents)

**Specs are written under tests folder**.

Rest API tests can be found under `tests/api` folder.

GraphQL tests can be found under `tests/api` folder.

Web tests can be found under `tests/web` folder.

Visual tests can be found under `tests/web` folder. While writing the visual tests, don't forget to add `@visual` tag. As this is used to differentiate between normal web tests and visual tests. We will be using **grep** CLI option to run our tests.

# Execution

[(Back to top)](#table-of-contents)

Tests can be executed either via command line or from Playwright test runner plugin in VS code.

1. Run below command to run the different tests

- **To run the UI tests**

```

npx playwright test --project chromium --grepinvert /visual/

```

- **To run the api tests**

```

npx playwright test --project api

```

- **To update snapshots for visual tests**

```

npx playwright test --project chromium --grep /visual/ --update-snapshots

```

- **To run the visual tests**

```

npx playwright test --project chromium --grep /visual/

```

# Docker

You can run the tests using Docker as well. For this you should have docker installed on your machine.

To run with docker

You need to run shell script `playwright-image-version.sh` . Make this file executable by running

```

chmod +x playwright-image-version.sh

```

And then run

```

sh playwright-image-version.sh

```

It will create a image with name `jeeshan/playwright-automation`. You can run `docker images` command to see the built images.

If you want to chnage the image name, you can change this in shell script

```

docker build -t <<imageName>> -f Dockerfile --build-arg PW_VERSION="v$VERSION" .

```

`<<imageName>>` is the name of the image. Generally your dockerusername followed by the name of the image. It's not mandate but a good practice to name your image like this.

2. Once image is build you can now execute the tests in container by running the below command

- For API

```

docker run --rm jeeshan/playwright-automation npx playwright test --project api

```

- For Web

```

docker run --rm jeeshan/playwright-automation npx playwright test --project chromium --grepinvert /visual/

```

- For Visual

```

docker run --rm --ipc=host -v $PWD:/app jeeshan/playwright-automation npx playwright test --grep visual --project chromium --update-snapshots

```

**Above commands will automatically removes the container after execution.**

`To remove all the stopped containers you can run the command` **`docker rm $(docker ps -a -q)`**

# Reporting

[(Back to top)](#table-of-contents)

I have used _monocart-reporter_ [Monocart](https://github.com/cenfun/monocart-reporter) to generate the HTML reports. After execution is done you can open monocart report by running the command

```
npx monocart show-report <<path-to-index.hmtl>>
```

You can see the path of the report [here](https://github.com/jeeshan12/PlaywrightAutomation/blob/main/playwright.config.ts#L28).

Suppose you are running different projects or tests are running over different shards then multiple html files will be generated. You can combine multiple reports into on by running the command

```
npm run merge-reports
```

[merge-report.js](https://github.com/jeeshan12/PlaywrightAutomation/blob/main/utils/merge-reports.js) will combine multiple html files into single file.
[Merged HTML Report](https://github.com/jeeshan12/PlaywrightAutomation/blob/main/merged-report/)

# CI

[(Back to top)](#table-of-contents)

Tests runs on Github actions for every commit to the `main` branch and whenever a `PR` is created.

# Update Snapshots

[(Back to top)](#table-of-contents)

In order to update the snapshots locally from docker conatiner, first you need to build the docker image by running the shell command

```

sh playwright-image-version.sh

```

This will create a docker image with name `jeeshan/playwright-automation`. If you want, you can change the image name in shell script `playwright-image-version.sh`.

Once image is built you can update the snapshots from the docker conatiner by running the command

```

docker run --rm --ipc=host -v $PWD:/app jeeshan/playwright-automation npx playwright test --grep visual --project chromium --update-snapshots

```

After the above command is executed, you can see the snapshot in your local repository under `tests/web/__screenshots__/linux` folder.

For debugging purpose, you can run the container in interactive mode. For this you can use `-it` flag and override the command with `/bin/sh`

```

docker run -it --rm --ipc=host -v $PWD:/app jeeshan/playwright-automation /bin/sh



```

Above command will open up the terminal in your running conatiner. Now you can run any command to perform the operations inside the conatiner.

#### Running the visual tests inside the docker the conatiner

You can run the visual tests in docker container by running below command

```

docker run --rm --ipc=host -v $PWD:/app jeeshan/playwright-automation npx playwright test --grep visual --project chromium

```
