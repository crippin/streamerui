import TwitchClient from 'twitch'
const Client_ID = '9x983jxyvp99rql42txrgaep1i9fct'
export let TClient = TwitchClient.withCredentials(Client_ID, 'yy6a3mb6d9rzq8crixt3ukjv05klq3')
const twitchStreams = require('twitch-get-stream')('9x983jxyvp99rql42txrgaep1i9fct');

export const getHlsUrls = id => twitchStreams.get(id)
