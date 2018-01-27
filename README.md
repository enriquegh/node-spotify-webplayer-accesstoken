# spotify-webplayer-accesstoken

This simple script provide an *extended* API access token extracted from Spotify web player
to interact with all kind of API that Spotify provides.

It doesn't require any OAuth client configured, you have to provide your Spotify credentials.

*WARNING: this is only a proof-of-concept hack, do not use in your commercial applications*

### Usage

Install with NPM:

```
npm i spotify-webplayer-accesstoken
```

Use:

```js
const SpotifyWPAT = require('spotify-webplayer-accesstoken');
SpotifyWPAT.getAccessToken(SPOTIFY_USERNAME, SPOTIFY_PASSWORD)
.then((access_token) => {
	console.log(access_token);
})
.catch((err) => {
})
```

## License 

MIT