// const Keycloak = require('keycloak-connect');
// const session = require('express-session');

export const setupAuth = (app: any, routes:any) => {
    // var memoryStore = new session.MemoryStore();
    // var keycloak = new Keycloak({ store: memoryStore });

    // app.use(session({
    //     secret:'<RANDOM GENERATED TOKEN>',
    //     resave: false,
    //     saveUninitialized: true,
    //     store: memoryStore
    // }));

    // app.use(keycloak.middleware());

    // routes.forEach(( r:any ) => {
    //     if (r.auth) {
    //          app.use(r.url, keycloak.protect(), function (req: any, res: any, next: any) {
    //              next();
    //          });
    //     }
    // });
}

