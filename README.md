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
