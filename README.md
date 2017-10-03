# shipt-github-followers
A service that allows for a user to search for a GitHub username. On a successful search return, display the user's GitHub handle, follower count, and a list of the user's followers.

## Why I chose Express.js
I chose Express because of the useful middlewares availables. This is my second time using Express, the first was at HackState (Sept 23 - 24). I chose Express so i could further my learning about the framework. Express provides a routing layer to organize pages better and other abstractions of lower level functionalities. Also it has extensive options of middleware that can be leveraged in your app so you don't have to reinvent the wheel. I also like it because although it is a framework it is very close to barebones node, so it is a lot easier to understand what is going on. I've only done testing(outside of print statments) once in my sophomore year when we had to write unit tests for a Java class.

Express doesn't add much to vanilla node, except that it offers abstractions to some of the lower level functionality.

##Challenges
I was not able to get the loading of the next batch of followers without refreshing the page, which is not the best way to do it, I know. I tried researching how to do it, but found nothing. Given more time I think I could find a way to fix it.

## Additional features
I made it so that if the user clicks on one of the followers tiles it will do a search of that follower automatically.

## Unmodified Generated code
- bin/www

## Middlewares
- [node-persist](https://github.com/simonlast/node-persist): I chose node persist to keep persistent data of the current username and what pages of followers have been loaded.

- [dotenv](): dotenv is used to give some measure of security to the github api secret key, probably not the best way for production code, but I don't know another way.

- [winston](https://github.com/winstonjs/winston): I used winston and morgan for logging since they are the mose recoomemnded and popular middlewares for logging.

- [node-github](https://github.com/mikedeboer/node-github): I chose to use node-github because it provided a nice wrapper to the Github API for Node.js

- [mocha](https://mochajs.org/): I chose mocha for a test framework for its simplicity.

- [chai & chai-http](http://chaijs.com/): I chose chai to help with testing as an assertion library. I also used chai-http to test my routes for the web app.

## Links

- [Link to the hosted application](https://shiptgithubfollowers.herokuapp.com/)

- [My personal site](http://joeymurphy.me)

- [HackState: Sociomotion](sociomotion.tech) [Github Repo](https://github.com/jmurp7385/sociomotion)
    + Searches for a given Twitter handle and creates a social and emotional profile using IBM Watson Tone Analyzer API. Given the time constraint of the hackathon and my first time using express correctly the code is messy. I worked with 2 other people on it.

- [CrimsonHacks: Magic Mirror Module Controller](https://github.com/jmurp7385/MMM-HTML-Controller)
    + Web portal to control which Magic Mirror Modules are visible, worked with one other team member. I focused on front end.
