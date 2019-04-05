# Stream Overlay

## Backend Structure
- NodeJS
- Simple Node Logger
- Express
- Express-WS

## Frontend Structure
- Webpack
- Preact
- Sass
- Sockette

## Basic Usage
- Download the latest version from the releases page on GitHub
- Save the binary in it's own folder
- Run the binary (this will create some additional files/folders)
- Adjust the `config.json`
- Restart the binary

Then open up a webbrowser and go to the site

## Development Usage
- Install NodeJS 8.0 or higher
- Copy the `_scripts/config/config.dev.json` to here `app/config/config.json`
- Run `npm install` in the root project folder
- Run `npm run webpack` in the root project folder
- Run `npm run dev` in the root project folder

Then open up a webbrowser and go to the site

## Logging
All logs will be written to the `stream-overlay.log` file in the node folder.

To increase the logging change the logger level in the `config.json` file from `info` to `debug`.

## License

MIT
