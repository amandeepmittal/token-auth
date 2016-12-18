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

2. Password Validation
    * use lodash to find user from DB in future
    * validate user object with the password in future database
    * In shell to encode token based on user object: `curl -X POST -d '{"username":"nodejs", "password":"pass"}' -H "Content-Type: application/json" localhost:3000/session`
    * In shell to decode token: `curl -H "X-Auth: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im5vZGVqcyJ9.NhyqHFSjv632YDad99pa2-NPWUnQRPmL1UZcm46nhOo" localhost:3000/user` 

3. Hashing Passwords
    * don't store passwords in DB, use hash
    * when a user request for log in, password entered will be converted into hash and that hash will be matched with hash already stored in DB during user registeration
    * a hash is a one-way algo
    * hashing passwords has adv.: not easy to decrypt hash
    * use Bcrypt as algo
        * adv. of bcrypt: it is intentionally slow, to make brute-force attacks expensive
        
4. Authenticating with DB [_MongoDB_]
    * create schema & model
    * create a route `POST /user` to create new user account
    * don't send password to the client, prevent using `select` in mongoose
    * In shell to create new user: `curl -X POST -d '{"username":"nodejs", "password":"pass"}' -H "Content-Type:application/json" localhost:3000/user`

**First Major Version Release**: 1.0.0