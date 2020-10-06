# Cooling Center
A cooling center is a facility, such as a senior center or community center, where people may go to enjoy air-conditioned comfort during a heat emergency.

There are many cooling centers around New York City, most of which are open during regular business hours in case of a heat wave.

## How to run this project locally
 - install yarn package manager https://classic.yarnpkg.com/en/docs/install#windows-stable
 - install postcss-cli globally via `yarn global add postcss-cli`
 - clone this repo with `git clone https://github.com/cchendoitt/cooling-center.git`
 - navigate to the cloned repo: `cd cooling-center`
 - install necessary dependencies with `yarn install`
 - add .env file to root directory containing necessary environment variables for finderapp templated apps, and in addition:
   - set/export NODE_ENV envrionment varible to desired build environment (dev, stg, prd)
   - set/export CC_URL envrionment varible (if provided) to ArcGis data service url
 - start the build with `yarn build`
   - ensure that all Jest tests passed - if they didn't, the previous command will fail
 - start up web server (if you don't already have one running) and navigate to dist folder to view the app in the browser
