# WorkRamp Website Automation Test

This repository contains automated test scripts written in TypeScript for the WorkRamp internal website. The test scripts use the Playwright testing framework to test various features and functionality of the website.

## Getting Started

To run the test scripts, you will need to have Node.js and the npm package manager installed on your machine. You can download the latest version of Node.js from the official website at https://nodejs.org/.

Once you have Node.js installed, you can clone this repository to your local machine using Git. Open a terminal window and enter the following command:

`git clone https://github.com/dnuma/workramp-guide-test.git`

Once you have cloned the repository, navigate to the project directory and install the required dependencies using npm:

`npm install`

## Running the Tests

You need to configure your credentials in the ENV, a config file `.env.config` is included in the branch.

To run the test scripts, open a terminal window and navigate to the project directory. Then, run the following command:

`npm run test`

This will start the Playwright test, which will open Google Chrome and run the test scripts.

## Test Scenarios

The following test scenarios are currently included in this demo:

- Login using
- Create a guide using different tools provided

## License

This project is licensed under the MIT License. See the LICENSE file for details.
