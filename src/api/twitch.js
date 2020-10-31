import { ApiClient } from 'twitch'
const Client_ID = '9x983jxyvp99rql42txrgaep1i9fct'
export let TClient = ApiClient.withCredentials(Client_ID, 'TWITCH_TOKEN_HERE')
const twitchStreams = require('twitch-get-stream');

export const getHlsUrls = id => twitchStreams.get(id);
