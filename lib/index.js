'use strict';
const nslookup = require('nslookup');
const debug = require('debug')('is-porn-checker');
const DEFAULT_OPENDNS_IPS = [
    /67\.215\.65.\d{3}/i,
    /146\.112\.61\.\d{3}/i,
];

class nsfwCheck {
    constructor(options = {}) {
        this.dnsServer = options.dnsServer || '208.67.222.123';
        this.timeout = options.timeout || 10000;
        this.openDNSIPs = options.openDNSIPs || DEFAULT_OPENDNS_IPS;
    }

    isOpenDNS(ip) {
        return this.openDNSIPs.some(regexp => {
            debug('Trying', regexp);
            return regexp.test(ip);
        });
    }

    getIpAddress(domain) {
        return new Promise((resolve, reject) => {
            nslookup(domain)
                .server(this.dnsServer)
                .type('A')
                .timeout(this.timeout)
                .end((error, address) => {
                    if (error) return reject(error);
                    if (address && address[0]) {
                        resolve(address[0]);
                    } else {
                        reject(new Error('No IP address found'));
                    }
                });
        });
    }

    async isPorn(domain) {
        try {
            const address = await this.getIpAddress(domain);
            if (!address) throw new Error('Unable to resolve IP for domain');
            debug('Got IP', address, 'for', domain);
            return this.isOpenDNS(address);
        } catch (error) {
            debug('Error occurred:', error);
            throw error;
        }
    }
}

module.exports = nsfwCheck;
