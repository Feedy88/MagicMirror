/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", 	// Address to listen on, can be:
				// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
				// - another specific IPv4/6 to listen on a specific interface
				// - "0.0.0.0", "::" to listen on any interface
				// Default, when address config is left out or empty, is "localhost"
	electronOptions: {
		webPreferences: {
			webviewTag: true
		}
	},
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
			// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1","localhost", "192.168.178.0/24"], 	// Set [] to allow all IP addresses
								// or add a specific IPv4 of 192.168.1.5 :
								// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
								// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
								// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],
	zoom: 1.0,
	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "de",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"],
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		/*{
			module: "MMM-pages",
			config: {
				modules: [
					[
						"calendar",
						"MMM-MyGarbage",
						"MMM-Fuel",
						"MMM-OpenWeatherMapForecast",
						//"MMM-Vrr",
						"newsfeed",
					],
					[
						"MMM-Liquipedia-Matches",
						"MMM-SoccerLiveScore",
						"MMM-NFL",
						"MMM-RaiderIO"
					],
				],
				fixed: ["alert", "MMM-WatchDog", "MMM-page-indicator","mmm-systemtemperature", "clock", "MMM-Snow", "updatenotification", "MMM-Pir"],
				animationTime: 1000,
				rotationTime: 20000,
			}
		},*/
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "Tagesschau",
						url: "https://www.tagesschau.de/index~rss2.xml",
					},
					{
						title: "Heise",
						url: "https://www.heise.de/rss/heise-top-atom.xml",
					},
				],
				showSourceTitle: true,
				showPublishDate: true,
				ignoreOldItems: true,
				ignoreOlderThan: 86400000,
			}
		},
		/*{
			module: 'MMM-page-indicator',
			position: 'bottom_bar',
			config: {
				pages: 2,
				activeBright: true,
				inactiveDimmed: true,
				inactiveHollow: true,
			}
		},*/
		{
			module: "alert",
		},
		//activate in Winter
		/*{
			module: 'MMM-Snow',
			position: 'fullscreen_above',
			config: {
				flakeCount: 100,
				theme: "winter"  //think of other themes
				//https://forum.magicmirror.builders/topic/1232/mmm-snow-yet-another-snow-module/18 > run only when it snows, required HA weather sensor
			}
		},*/
		{
			module: 'MMM-WatchDog',
			config: {
				interval: 2,
				timeout: 10,
			}
		},
		{
			module: 'mmm-systemtemperature',
			position: 'top_right',
			classes: 'small dimmed',
			config: {
				prependString: "System: ",
			}
		},
		{
			module: 'MMM-Pir',
			position: 'top_right',
			config: {
			  debug: false,
			  delay: 2 * 60 * 1000,
			  turnOffDisplay: true,
			  mode: 9,
			  ecoMode: true,
			  displayCounter: true,
			  displayBar: true,
			  displayStyle: "Text",
			  displayLastPresence: true,
			  lastPresenceTimeFormat: "LL H:mm",
			  mode6_gpio: 20,
			  mode6_clearGpioValue: true,
			  pir_gpio: 18,
			  pir_reverseValue: false,
			  xrandrForceRotation: "normal",
			}
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left",
			config: {
				clockBold: false,
				showWeek: true,
				showSunTimes: true,
				lat: 51.20256423950195,
				lon: 7.141562461853027,
			}
		},
		{
			//TO DO: check customEvents for color-coding
			module: "calendar",
			header: "Termine & Feiertage",
			position: "top_left",
			config: {
				fetchInterval: 300000, //5 Minutes
				displaySymbol: true,
				showLocation: false,
				fade: true,
				fadePoint: 0.4,
				dateFormat: "D. MMM HH:mm",
				fullDayEventDateFormat: "D. MMM",
				timeFormat: "absolute",
				getRelative: 12,
				urgency: 0,
				maximumEntries: 10,
				displayRepeatingCountTitle: true,
				hideOngoing: false,
				nextDaysRelative: true,
				calendars: [
					{
						symbol: "cocktail",
						url: "webcal://i.cal.to/ical/61/nrw/feiertage/77c4d7d1.8cce2b06-ca7ba139.ics"
					},
					{
						symbol: 'calendar-check',
						url: 'webcal://p65-caldav.icloud.com/published/2/MTM1NTM3NzUzNDEzNTUzN8u9bcLtSE9w_ovBQqETYPj23oMWhkPwlc26rT0YdmPf2FizXkwc8SWyUmvlRt623l01NQGGwRzJSNca3CS85_Q',
					},
					{
						symbol: 'birthday-cake',
						url: 'webcal://localhost:8080/modules/static/birthdays.ics',
					},
				]
			}
		},
		{
			module: 'MMM-MyGarbage',
			header: "Abfallkalender",
			position: 'top_left',
			config: {
				alert: 4,
				weeksToDisplay: 4,
				limitTo: 99,
				fade: true,
				dateFormat: "dddd, D. MMM",
				fadePoint: 0.25
			}
		},
		{
			module: "MMM-OpenWeatherMapForecast",
			header: "",
			position: "top_right",
			classes: "default everyone",
			disabled: false,
			config: {
				apikey: "f96882cb79908ea55720ed77f969b504",
				latitude: "51.202798",
				longitude: "7.142989",
				endpoint: "https://api.openweathermap.org/data/2.5/onecall",
				updateInterval: 5,
				iconset: "3c",
				showCurrentConditions: true,
				showExtraCurrentConditions: true,
				showSummary: false,
				hourlyForecastInterval: 6,
				maxHourliesToShow: 2,
				showDailyForecast: true,
				maxDailiesToShow: 6,
				concise: false,
				forecastLayout: "table",
				label_maximum: "max",
				label_high: "⬆",
				label_low: "⬇",
				label_timeFormat: "k[h]",
				label_days: [
					"So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"
				],
				label_ordinals: [
					"N", "NNO", "NO", "ONO", "O", "OSO", "SO", "SSO", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
				],
			}
		  },
		  /*{
			module: 'MMM-CountDown',
			position: "bottom_left",
			config: {
				event: "Mats Geburtstermin",
				date: "2024-04-18 00:00:00",
				showHours: false,
				showMinutes: false,
				showSeconds: false,
				daysLabel: "Tage",s
				hoursLabel: "Stunden",
				minutesLabel: "Minuten",
				secondsLabel: "Sekunden"
			}
		},*/
		{
			module: "compliments",
			position: "lower_third",
			config: {
				compliments: {
					anytime: [
						" "
					],
					"....-01-01": [
						"Frohes Neues Jahr!"
					],
					"....-02-23": [
						"Happy Birthday Jonas!"
					],
					"....-03-26": [
						"Happy Birthday Rafa!"
					],
					"....-09-16": [
						"Schönen Hochzeitstag!"
					],
					"....-11-05": [
						"Happy Birthday Katja!"
					],
				}
			}
		},
		{
			module: "MMM-Fuel",
			position: "bottom_left",
			config: {
				api_key: "68c7aacf-c998-cf84-1b08-0d7ea5df0e5f",
				lat: 51.21631945210809,
				lng: 7.148820512176388,
				types: ["e5"],
				max: 2,
				rotate: false,
				open: true,
				showAddress: false,
				showCityAddress: false,
				showDistance: false,
				showBrand: true,
				stationIds: [
					"1a020abb-e61f-4c0d-9e40-04ec85ce8c02",
					"51d4b50d-a095-1aa0-e100-80009459e03a"
				]
			}
		},
		/*{
			module: "MMM-SoccerLiveScore",
			position: "top_right",
			config: {
				leagues: [1, 9, 35],
				showNames: false,
				showLogos: true,
				showTables: false,
				showScorers: false,
				scrollVertical: false,
				language: "de"
			}
		},*/
		//Removed for Offseason
		/*{
			module: "MMM-NFL",
			position: "top_left",
			config: {
				colored: true,
				focus_on: ['GB', 'PIT'],
				format: 'ddd H:mm'
			}
		},*/
		/*{
			module: "MMM-Liquipedia-Matches",
			position: "top_left",
			config: {
				game: "dota2",
				displayCount: 10,
				requiredTeams: [
					"Nigma Galaxy",
					"OG",
					"Team Secret",
					"Team Liquid",
					"Entity",
					"Gamin Gladiators",
					"Tundra Esports",
					"Shopify Rebellion"
				]
			}
		},*/
		/*{
			module: "MMM-RaiderIO",
			position: "top_right",
			config: {
				compact: true,
				characters: [{
					region: "eu",
					realm: "Khaz'Goroth",
					name: "Feedy"
				},
				{
					region: "de",
					realm: "Khaz'Goroth",
					name: "Feedy"
				},
				{
					region: "eu",
					realm: "Garrosh",
					name: "Rayman",
				},
				{
					region: "de",
					realm: "Garrosh",
					name: "Nalmeera",
				}]
			}
		},*/
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
