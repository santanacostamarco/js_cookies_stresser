class Cookies {
	constructor (name, value, options) {

		/*
		 * options object: {expires, domain, path}
		 *
		 * expires in days (integer) default: 1 day
		 * domain (string) default: location.host
		 * path (string) default: '/'
		 * 
		 */

		if (!options) options = {};

		this._name = name;
		this._value = value;

		this._expires = options.expires 
			? this.generateDate(options.expires)
				: this.generateDate(1);

		this._domain = options.domain 
			? options.domain
			: location.host;

		this._path = options.path 
			? options.path
			: "/";

		return this.init();
	}

	get name () {
		return this._name;
	}

	get value () {
		return this._value;
	}

	get expires () {
		return this._expires;
	}

	get domain () {
		return this._domain;
	}

	get path () {
		return this._path;
	}

	set name (name) {
		this._name = name;
	}

	set value (value) {
		this._value = value;
	}

	set expires (expires) {
		this._expires = expires;
	}

	set domain (domain) {
		this._domain = domain;
	}

	set path (path) {
		this._path = path;
	}

	generateDate (days) {
		return new Date(new Date().setDate(new Date().getDate() + days)).toUTCString();
	}

	read () {
		let reg = new RegExp('(?:^|;)\\s?' + this.name + '=(.*?)(?:;|$)','i');
		return decodeURIComponent(reg.test(document.cookie) ? reg.exec(document.cookie)[1] : '');
	}

	save() {
		let optionsStr = "domain=" + this.domain + "; path=" + this.path + "; expires=" + this.expires;
		document.cookie = this.name + "=" + encodeURIComponent(this.value) + "; " + optionsStr;
	}

	delete () {
		this.expires = this.generateDate(-1);
		this.save();
	}

	init () {
		if (this.name && this.value === '') 
			this.delete();

		else if (this.name && !this.value) {
			let returnObj = {};
			returnObj[this.name] = this.read();
			return returnObj;
		}

		else if (this.name && this.value) 
			this.save();
	}
}

class CookieStresser {
	constructor () {

		this.stress(100)
	}

	generateString(length) {
	   let 		str     = '';
	   const 	chars 	= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%¨&*()_-+=\"\'{}[]`´^~?/:;\\,.<>§ªº|€®ŧ←↓→øþĸŋđðßæ«»©“”µ¹²³£¢¬';

	   for ( var i = 0; i < length; i++ ) {
	      str += chars.charAt(Math.floor(Math.random() * chars.length));
	   }
	   return str;
	}

	stress (length) {
		let interval = setInterval(() => {
			try {
				new Cookies(this.generateString(length), this.generateString(length));
				console.log(document.cookie.length);
			}
			catch (e) {
				clearInterval(interval);
				console.log(e);
			}
		}, 100);
	}
}