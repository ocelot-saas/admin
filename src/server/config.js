const fs = require('fs');


exports.ENV = process.env.ENV;
exports.ADDRESS = process.env.ADDRESS;
exports.PORT = parseInt(process.env.PORT);

if (exports.ENV == 'LOCAL') {
    const secrets = JSON.parse(fs.readFileSync('/ocelot-saas/var/secrets.json', 'utf-8'));
    exports.AUTH0_KEY = secrets.AUTH0_KEY;
    exports.AUTH0_DOMAIN = secrets.AUTH0_DOMAIN;
    exports.FILESTACK_KEY = secrets.FILESTACK_KEY;
} else {
    exports.AUTH0_KEY = process.env.AUTH0_KEY;
    exports.AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
    exports.FILESTACK_KEY = process.env.FILESTACK_KEY;
}

exports.IDENTITY_SERVICE_PUBLIC_DOMAIN = process.env.IDENTITY_SERVICE_PUBLIC_DOMAIN;
exports.INVENTORY_SERVICE_PUBLIC_DOMAIN = process.env.INVENTORY_SERVICE_PUBLIC_DOMAIN;
