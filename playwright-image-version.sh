#!/bin/bash

VERSION=$(cat package.json | grep '@playwright/test' | awk -F'"~' '{print $2}' | awk -F'"' '{print $1}')

docker  build -t  jeeshan/playwright-automation  -f Dockerfile  --build-arg PW_VERSION="v$VERSION" .

# docker compose down
# "PW_VERSION=$(cat ./package.json | grep '@playwright/test' | awk -F: '{ print $2 }' | sed 's/[\"/,]//g' | tr  -d ^) ; echo $PW_VERSION"

# Change <min> to be your # of CPUs divided by 2, and <max> to be # of CPUs times 2. This command will kick off your suite of playwright tests with different workers passed in (iterating through min/max). The output will be returned via the command line. And note, depending on your min/max inputs and how many tests you have, this process could take some time. So go kick it off and go brew some ☕️ or 🫖. Once the run is complete you should have an output that looks like this.
# for i in `seq <min> <max>`; do time npx playwright test --reporter=line --workers=$i; done
