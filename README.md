# Token based Authentication with Nodejs

### Why Token Based Authentication?
- helps with peformance since token is validated using an algorithm rather than hitting DataBase on every request.


## Technology
- Nodejs
- ExpressJS

### Changelog
SemVer: 0.X.0

1. JWT with Express
    * Two endpoints:
        * `POST /session` sending username/password will return a JWT
        * `GET /user` passing JWT token will return info about current user
    * In shell: `curl -X POST -d '{"username":"nodejs"}' -H "Content-Type: application/json" localhost:3000/session` to get token based on username and secret to sign it
    * In shell: `curl -H "X-Auth: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im5vZGVqcyJ9.NhyqHFSjv632YDad99pa2-NPWUnQRPmL1UZcm46nhOo" localhost:3000/user` to get the username which is payload of token.




