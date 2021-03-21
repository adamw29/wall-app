/* Parse server initialize */
import Parse from 'parse';
import parseConfig from './parse.config.json';

function initialize() {
    Parse.initialize(parseConfig.APP_ID,parseConfig.JS_KEY);
    Parse.serverURL = parseConfig.SERVER_URL;

    return Parse;
}

export default initialize();