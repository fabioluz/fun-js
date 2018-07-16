# Fun JS
Fun JS is a NodeJS application created to learn and apply functional-programming principles for real-world applications. Any corrections or additional implemantations are welcome! 

### Libraries Used
* [Sanctuary](https://github.com/sanctuary-js/sanctuary) for a run-time type checking and helper functions.
* [Fluture](https://github.com/fluture-js/Fluture) for a monadic data structure alterative to Promises;
* [Koa](https://github.com/koajs/koa) for serving a Restful API.
* [Postgres-Migrations](https://github.com/ThomWright/postgres-migrations) for an immutable database migration system. 

### Running the app
1. Clone the app and install the packages;
2. Install PostgreSQL, if you don't have it;
3. Create a `.env` file in the root of the project. This file should contain the following keys:
```
// change the values as necessary
APP_PORT = 3000
PGHOST = localhost
PGUSER = postgres
PGPASSWORD = YOUR_POSTGRESQL_PASSWORD
PGPORT = 5432
PGDATABASE = fun_js
```
4. Run `npm run migrate`;
5. Run `npm run serve`;
6. Enjoy ;)

### Using the app
There are current 2 routes available:
* `GET api/users`

* `POST api/users`
```
{
	"email": "test@gmail.com",
	"password": "1234567",
	"fullname": "Test Name"
}
```
Try to change/remove the fields and see what happens :)


### Filosofy
The idea of this app is to separate the algebra from the interpretation of the functions, as if we were using a strongly-typed language. I'm still not sure whether it's really make sense, so I created this application to test the concepts and get reviews and pull-requests from other people. 

