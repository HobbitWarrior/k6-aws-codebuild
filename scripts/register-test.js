import http from 'k6/http';
import { check, fail, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export let options = {
    scenarios: {
        load:{
            executor: "ramping-arrival-rate",
            startRate: 1,
            timeUnit: "1s",
            stages:[
                { target: 1000, duration: "1m" },
                { target: 1000, duration: "10m" },
                { target: 1, duration: "1m" }
            ],
            preAllocatedVUs: 1000,
            maxVUs: 10000
        }
    }
};


export default function () {

    var userKey = 'AEduoC2H3TqJ';
    var secret = '%2BB77BmpGkVAAOnRggYB4zX72R67N6HqZ';
    var apikey = "3_d4FvIWXawiU0op6cUZ-pBXY3TLqpjtS-i23mgqD0DwAaZFbvwLdoqMGnYYSmzlfN";
    var profile = ProfileMixer();
    var password = "Q123456w";
    var initRequest = encodeURI(`https://accounts.us1b.gigya.com/accounts.initRegistration?format=json&apikey=${apikey}`);  
    var initReg = http.get(initRequest)
	console.log(initRequest);
	console.log(initReg.json())
	
    var registerRequest = encodeURI(`https://accounts.us1b.gigya.com/accounts.register?regToken=${initReg.json().regToken}&email=${profile.email}&profile={"firstName":"${profile.firstName}","lastName":"${profile.lastName}"}&password=${password}&httpStatusCodes=false&format=json&apikey=${apikey}&finalizeRegistration=true`);
    var r = http.get(registerRequest);

    console.log(r.json());
    console.log(registerRequest);
    check(r, {
    'errorCode is 0': (r) => JSON.parse(r.body).errorCode === 0
    });
	
}

function ProfileMixer()
{
    const _firstNames = ["Eleven", "Billy", "Steve", "Eddie", "Vecna", "Max", "Dustin", "Will", "Mike", "Nancy", "Jim"
    ];

    const _lastNames =
        [
            "Hargove", "Harrington", "Munson", "The Demagorgon", "Mayfield", "Henderson", "Byers", "Wheeler", "Hopper"
        ];
    
    
    const randomFirstName = _firstNames[Math.floor(Math.random() * (_firstNames.length - 1))];
    const randomLastName = _lastNames[Math.floor(Math.random() * (_lastNames.length - 1))];
    return {
        firstName: randomFirstName,
        lastName: randomLastName,
        email: `stranger_things${Math.floor(Math.random() * 1000000)}@strangerthings.com`,
        password: "Q123456w"

    };
	sleep(120);
}
