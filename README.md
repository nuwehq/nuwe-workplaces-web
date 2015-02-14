# nuwe-workplaces-web
A lightweight node / express app for communicating the health of your company, teams and individuals using the Nuwe platform.

# Requirements

- NodeJs
- Express

# Install

```
$ git clone git://github.com/nuwehq/nuwe-worplaces.git
$ npm install
```
Then, for now at least

```
$ ./bin/www
```

I am not intending on committing the core `node_modules` directory. As such, use [ShrinkWrap](https://github.com/uber/npm-shrinkwrap)

```
$ npm shrinkwrap
```
This runs shrinkwrap, which verifies your package.json & node_modules tree are in sync. If they are it runs shrinkwrap then fixes the resolved fields and trims from fields


# Run The Tests

```
$ npm test
```

# Get Involved

This is an open source project which leverages the Nuwe Platform. You can get involved by forking the code and building cool stuff, before making a Pull Request.

Take a look at our [Public Roadmap](https://trello.com/b/M0Zlt37t/workplaces-for-web) for the project and suggest features, pickup tasks, comment and discuss.

Any issues or suggestions, please contact [steve@nuwe.co](mailto:steve@nuwe.co)


# Interested in using the project for your company?

You can either install the app yourself and set it up quickly (Quickstart documentation coming soon) or Contact Us to arrange for a hosted solution and customisations (paid service).


# Demo Site

Take a look at [Nuwe WorkPlaces](https://nuwe-workplaces.herokuapp.com/)