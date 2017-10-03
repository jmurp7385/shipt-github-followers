# shipt-github-followers
A service that allows for a user to search for a GitHub username. On a successful search return, display the user's GitHub handle, follower count, and a list of the user's followers.

## Why I chose Express.js
I chose Node because of the useful node modules availables. This is my second time using Express since HackState (Sept 23 - 24). I chose Express so i could further my learning about the framework. Express provides a routing layer to organize pages better and other abstractions of lower level functionalities. Also it has extensive options of middleware that can be leveraged in your app so you don't have to reinvent the wheel. I also like it because although it is a framework it is very close to barebones node, so it is a lot easier to understand what is going on.

The basis of Express is Node's http module.

### Unmodified Boilerplate code
- bin/www

- [node-persist](https://github.com/simonlast/node-persist): I chose node persist to keep persistent data

- [node-github](https://github.com/mikedeboer/node-github): I chose to use node-github because it provided a nice wrapper to the Github API for Node.js

- [mocha](https://mochajs.org/): I chose mocha for a test framework for its simplicity.

- [chai & chai-http](http://chaijs.com/): I chose chai to help with testing as an assertion library. I also used chai-http to test my routes for the web app.

- [My personal site](http://joeymurphy.me)

- [Link to the hosted application](https://shiptgithubfollowers.herokuapp.com/)
