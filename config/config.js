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
						"MMM-Spotify",
						"MMM-WiFiPassword",
						"MMM-WeatherOrNot",
						"MMM-Vrr",
						"newsfeed",
					],
					[
						"MMM-Liquipedia-Dota2",
						"MMM-NFL",
						"MMM-SoccerLiveScore",

						
					],
				],
				fixed: ["alert", "MMM-WatchDog", "MMM-page-indicator","mmm-systemtemperature", "clock", "MMM-Snow", "updatenotification"],
				animationTime: 1000,
				rotationTime: 15000,
				rotationDelay: 30000,
				//rotationFirstPage: 15000,
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
			classes: 'small dimmed', // Add your own styling. Optional.
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
			  //wrandrForceRotation: "normal"
			}
		  },
		/*{
			module: "updatenotification",
			position: "top_bar"
		},*/
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
				fetchInterval: 600000, //10 Minutes
				displaySymbol: true,
				showLocation: false,
				fade: true,
				fadePoint: 0.4,
				dateFormat: "D. MMM HH:mm",
				fullDayEventDateFormat: "D. MMM",
				timeFormat: "absolute",
				getRelative: 24,
				urgency: 0,
				maximumEntries: 6,
				displayRepeatingCountTitle: true,
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
		/*{
			module: "MMM-Spotify",
			position: "top_center", // "bottom_bar" or "top_bar" for miniBar
			config: {
				debug: false, // debug mode
			  	style: "mini", // "default" or "mini" available (inactive for miniBar)
			  	control: "default",
			  	accountDefault: 0, // default account number, attention : 0 is the first account
			  	updateInterval: 1000, // update interval when playing
			  	idleInterval: 30000, // update interval on idle
			  	onStart: null, // disable onStart feature with `null`
			  	deviceDisplay: "Gehört auf:", // text to display in the device block (default style only)
			  	allowDevices: [], //If you want to limit devices to display info, use this.
			  	// allowDevices: ["RASPOTIFY", "My iPhoneX", "My Home speaker"],
			  	miniBarConfig: {
					album: true, // display Album name in miniBar style
					scroll: true, // scroll title / artist / album in miniBar style
					logo: true, // display Spotify logo in miniBar style
				}
			}
		},*/
		/*{
			module: 'MMM-WiFiPassword',
    		position: "top_right",
      		config: {
				network: "Wlan Solo", 
				password: "AlderaanWasAnInsideJob",
				authTpye: "WPA",
				showNetwork: false,
				showPassword: false,
				showAuthType: false
			}
		},*/
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
				hourlyForecastInterval: 4,
				maxHourliesToShow: 3,
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
		  {
			module: 'MMM-CountDown',
			position: "top_right",
			config: {
				event: "Mats Geburtstermin",
				date: "2024-04-18 00:00:00",
				showHours: false,
				showMinutes: false,
				showSeconds: false,
				daysLabel: "Tage",
				hoursLabel: "Stunden",
				minutesLabel: "Minuten",
				secondsLabel: "Sekunden"
			}
		},
		{
			module: "compliments",
			position: "lower_third",
			config: {
				morningStartTime: 3,
				morningEndTime: 10,
				afternoonStartTime: 21,
				afternoonEndTime: 2,
				compliments: {
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
					"morning": [
						"Guten Morgen!",
						"Hast du gut geschlafen?"
					],
					"afternoon": [
						"Hab ein gute Nacht!",
						"Schlaf gut."
					],
					"evening": [
						" "
					]
					/*"day_sunny:" [
						"Genieß den sonnigen Tag!",pm2
						"Heute scheint die Sonne!"
					],
					"snow:" [
						"Es schneit!"
					],
					"rain:" [
						"Es wird heute regnen.\n Denk an den Regenschirm."
					],
					cloudy: [
						"Heute ein Sonne-Wolken-Mix"
					],
					cloudy_windy: [
						"Wolkig und windig heute.\n Pack dich warm ein."
					]*/
				}
			}
		},
		{
			module: "MMM-Vrr", //review config options
			position: "bottom_right",
			config: {
				city: "Wuppertal",
				station: "Cronenberg Rathaus",
				numberOfResults: 2,
				displayType: "detail",
				displayIcons: false,
				displayTimeOption: "time+countdown",
				scrollAfter: false,
				line: "CE"
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
				radius: 3,
				max: 3,
				rotate: false,
				open: true,
			}
		},
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
			module: 'MMM-NFL',
			position: 'top_left',
			config: {
				colored: true,
				focus_on: ["GB", "SEA", "PIT", "ARI"],
				format: "D. MMM HH:mm",
			}
		},*/
		/*{
			module: "MMM-SoccerLiveScore",
			position: "bottom_center",
			config: {
				leagues: [35, 1, 9]
			}
		},*/
		/*{
			module: "MMM-Liquipedia-Dota2",
			position: "bottom_left",
			header: "Upcoming Dota2 Matches",
			config: {
				requiredTeams: [
					"teamnigma",
					"teamsecret",
					"evilgeniuses",
					"alliance",
					"og",
					"teamliquid",
				],
			}
		},*/
		/*{
			module: 'MMM-page-indicator',
			position: 'bottom_bar',
			config: {
				pages: 2,
				activeBright: true,
				inactiveDimmed: true,
				inactiveHollow: true,
			}
		}*/
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
