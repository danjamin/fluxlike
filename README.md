# NOT MAINTAINED

# Fluxlike

WARNING: This is still very much a work in progress

Fluxlike framework for isomorphic react applications

# USE

## install

```
$ npm install --save https://github.com/danjamin/fluxlike.git#0.1.0
```

# DEVELOP

## install dependencies

```
$ npm install -g jshint mocha
$ npm install
```

## linting

```
$ npm run lint
```

## testing

```
$ npm test
```

## ongoing testing

```
$ ./scripts/transpile watch
```

then in a separate shell (each time):

```
$ ./scripts/test
```

optionally you can filter the tests:

```
$ ./scripts/test Router
```

## publishing

update package.json version, tag semver, and push to origin
