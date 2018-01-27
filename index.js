const rp = require('request-promise');
const tough = require('tough-cookie');

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36';

async function getCSRF(cookiejar) {
	const resp = await rp('https://accounts.spotify.com/login', {
		resolveWithFullResponse: true,
		headers: {
			'user-agent': UA
		},
		jar: cookiejar
	});
	return resp.headers['set-cookie']
		.find(e => e.indexOf('csrf_token') === 0)
		.split(';')[0]
		.replace('csrf_token=', '');
}

async function login(cookiejar, username, password, csrf_token) {
	return rp({
		url: 'https://accounts.spotify.com/api/login',
		method: 'POST',
		form: {
			remember: false,
			username: username,
			password: password,
			csrf_token: csrf_token,
		},
		jar: cookiejar,
		headers: {
			'user-agent': UA
		}
	});
}

async function getAccessToken(cookiejar) {
	const resp = await rp({
		url: 'https://open.spotify.com/browse',
		jar: cookiejar,
		resolveWithFullResponse: true,
		headers: {
			'user-agent': UA
		}
	});
	return resp.headers['set-cookie']
		.find(e => e.indexOf('wp_access_token') === 0)
		.split(';')[0]
		.replace('wp_access_token=', '');
}

exports.getAccessToken = async function(username, password) {
	const cookiejar = rp.jar();
	cookiejar.setCookie(new tough.Cookie({
		key: '__bon',
		value: 'MHwwfC0yMDk5NTIyNzI4fC04ODE3OTk1NDU3NnwxfDF8MXwx', // Get dynamically
		domain: 'accounts.spotify.com',
	}), 'https://accounts.spotify.com');
	await login(cookiejar, username, password, await getCSRF(cookiejar));
	return getAccessToken(cookiejar);
};