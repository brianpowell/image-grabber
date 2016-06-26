# Image Grabber
Quick app to search Google Custom Search API for images.

## Needed elements
Look at `index.js` and checkout the `config` values on _line 10_ and _line 11_.
* **API_KEY**: Google Developer Key (check out Developer Link below)
* **CSE_KEY**: Google Custom Search Engine token

## Install and run app
Maksure you have NodeJS and Mongo installed on your machine.

```bash
$ cd image-grabber
$ npm install
$ SEARCH_TERM="" node .
```

The project is also enabled with `DEBUG` to see console logs To use `DEBUG` start the app with the environment variable set like:
```
DEBUG=* SEARCH_TERM="" node .
```

## Optional Environment variables
* **PAGE**: (default 1) Allows for the specification of a page to start on > all pages return 10 results
* **SIZE**: (default '') Allows for the specification image sizes "small", "medium", "large", etc 

## Google Custom Search API
Visit (https://developers.google.com/custom-search/) for more information.

## Future items
**NOTE: This is an example.  It could be a lot better and needs additional elements for use in production**
Also, the insert does not check for duplicates. 

## Setup with Google
Setup a project and get API Key for account (https://console.developers.google.com/)


### Custom Search Engine
Create a Custom Search Engine at (https://cse.google.com/cse/setup/basic)

Settings:
* Image Search `On`
* Sites to Search `Search the entire webbbut emphasize included sites`
* Remove all Sites to Search
* Restrict Pages using Schema.org Types, enter `Thing`