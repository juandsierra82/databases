# Databases

This repo is split into _two_ sections, Relational Databases and You &
Advance Data Storage. You should work through them sequentially.

There's a lot of material in this sprint. Before you dive in, take 5-10min with your pair to review all of the requirements
of both sections.
Try to predict how long it's going to take you to complete each item. Timebox your efforts and prioritize ruthlessly.

<!--MARCUS NEEDS TO BUILD THIS COMMENT OUT MORE: This is a sprint where you will be required to be a scribe. Specifically, you'll at least be expected to understand which queries will be slow, and why. ...something
about joins and join tables?-->

---

## Installation and Getting Started

### Installation

Ensure you have mysql installed by doing `which mysql`. If you don't have it,
install mysql using `brew install mysql`.

### Getting Started

- Start up mysql using `mysql.server start`
- Start up your mysql server by logging in using `mysql -u root`
- Load your schema using `mysql -u root < server/schema.sql` on
  the command line

**NOTE**: Using `mysql -u root` sets up your username to be `root`,
you will need to fill this information into the tests to get them
to run.

## Background Information

### Part One - Relational Databases and You

Today, you'll create a normalized (multi-table) SQL database for your
chatterbox-server app.

#### SQL Databases

You've already learned to store data for your server-side applications
"in-memory" using JavaScript variables and by writing text files to disk.

Most web applications need some form of persistence--i.e. to remember data even
after the server is restarted. In this part of the assignment, you'll learn how
to store your website data using SQL to interact with a relational database.

First you'll experiment with defining table schema and writing queries; then,
you'll use what you learned to convert your chatterbox-server application to
store data using a MySQL database. The new version of your server should use
MySQL to store and retrieve web-pages.

**NOTE**: MySQL should already be installed on your machine, but you will have to
install the `mysql` node module. Instructions for this are located below.

##### Learn about SQL

- If you didn't do them in the previous sprint, complete the following tutorials
  now:
  - [ ] [Lesson I](http://www.sqlcourse.com/intro.html)
  - [ ] [Lesson II](http://www.sqlcourse2.com/index.html)
  
##### Start a local MySql server

Now that the tutorials have given you an overview of SQL, try it out on a real
database! MySQL server is already installed on your machine. But just as you
must start the Node.js servers you've written with a command like `node
server.js`, you must start the MySql server before it will be of any use to
you.

- [ ] Stop any MySql servers that are already running (they may have been spun up automatically when you're computer was booted) by running `mysql.server stop`
- [ ] Start a local MySql server by running `mysql.server start`

##### Create a MySql database

- [ ] Log into MySQL on the command line with `mysql -u root`.
- [ ] Learn about how to [Create a database from the command line], then choose one of your schema designs from the tutorial step and create the table using the CREATE TABLE statement.
- [ ] INSERT some made-up data into it and SELECT the data back out.
- [ ] Log into MySQL from the command line again and use `DESCRIBE TABLE` to verify that it was created correctly.

### Part Two - Advanced Data Storage

After you've played with writing raw SQL queries and learned what a powerful
and essential part of your application a database can be, you probably notice
some of the drawbacks of SQL:

* It's a whole other programming language, written in strings in your code.
* Repetitive boilerplate INSERT and SELECT statements.
* The pain involved with changing your mind about a schema after an application
  is live.
* Although you didn't see this, database IO can be a performance
  bottleneck in web applications that serve a high demand.

In the last few years, programmers have developed several new solutions (or at
least clever work-arounds) for these problems:

First is the ORM (Object-Relational Mapping), which is usually a library that
does the work of converting between objects in your code and rows in a
database, so you don't have to fill your code with boilerplate SQL statements.

Second is the "NoSQL" (not only SQL) database. This category covers many different
database types which are more unified by the fact that they are *not* SQL than any
similarities between them.

Among the very broad category of NoSQL databases, there are a few common types:

- Document Stores
- Key-Value Stores
- Graph Databases
- Many many more

Document Stores are a relatively simple kind of database which store arbitrary
"documents" usually represented as JSON. These databases are schemaless and do
not support complex relationships, instead they support very fast lookup and
writiing of non-relational data.

Imagine you had a database of movies, in SQL you may have a table of directors,
a table of actors, and a table of movies which contains foreign-keys to the
tables of directors and actors. When you do a lookup in the movies table, you
have to go out to the directors and actors table to get their data. The
advantage of this is that you can query the data for relationships in many
directions - which movies has this person directed and such.

In a Document Store database like MongoDB or CouchDB you would instead store a
list of Movie documents that contain all of the information about the Movie,
including the actual name of the director instead of a foreign key to a
directors table. This makes retrieving a movie very fast as you only have to
read the data from one place, but if you want all the movies directed by a
certain director you have to read through the entire movies table, which is
slow.

Key-Value Stores like Redis are exactly what they sound like - they store
simple associations behind Keys and Values. Redis supports many kinds of more
active data structures like HashMaps, Linked Lists, and Arrays as the "values"
associated with specific keys, and these sorts of databases are often used to
store data that needs to be indexed by just one criteria, but it makes that
sort of access very, very fast and easily cacheable. You can sort of think of
Key-Value store as a single specialized SQL table with a single key and single
value.

Graph Databases are a third sort of database that model all of their data as a
large graph of nodes that represent data with edges that represent
relationships. Graph Databases like Neo4j usually allow data to be stored
associated both with nodes and with relationships between them, which makes
them very good for data with complex relationships - for instance a social
network that wants to measure the amount of engagement between different users
may use a Graph Database and keep the magnitude of engagement on the
relationship or edge between two user nodes.

Storing those kinds of relationships in SQL usually requires adding a new table
that defines that relationship and stores data associated with it, which can be
slower than Graph Databases because Graph Databases are optimized specifically
for this use case whereas SQL will not necessarily make those optimizations.

Finally, there is memcached, a system for caching the results of database reads
in memory so that commonly-used data can be quickly distributed to multiple
clients (and even spreading the workload out across multiple machines.) This
works because accessing data from memory or RAM can be orders of magnitude
faster than reading from disk, so caching data in memory can be a quick way to
vastly improve the performance of your server.

---

## REPO Structure

#### server:

* `schema.sql` is a skeleton schema file. In this file you should write one or
  more `CREATE TABLE` statements that will define the structure of your
  database tables. You can then create the tables for real by running the
  schema file on the command line.
  * **NOTE**: if you run your SQL code from this file, and find a bug in the schema
    or how it was generated, you'll want to "drop" all the new tables before
    running it again. This will reset your database by throwing away all data
    and schema information, to give you a blank slate before re-running your
    improved version of the SQL code.
  * You don't have to manually write your schema, you may use a visual schema
    designer.[WWW SQL Designer] or [DB designer] are good places to start.
* `app.js` will be the main file of your Node server code, just
  like `basic-server.js` in the previous assignment. It includes some code
  showing how to use Node's `mysql` module to connect to the database.
* `spec` contains a mocha spec for testing your Node server's ability to read
  and write the database. This spec is not complete! It contains several lines
  commented with "TODO". You'll need to customize those lines to match the
  details of the database tables you create.

#### client

* You will need to create this folder and put your client in it. Either use your
  chatterbox-client implementation, or, if there is something irreparably wrong
  with your solution, use the MakerSquare-provided solution.

#### orm-resources:

* `orm-example.js` contains **EXAMPLE CODE** for you to reference when
  refactoring your server to use the Sequelize ORM from Node to read and write
  data to the MySQL database instead of raw SQL strings.
* When you get to the ORM refactoring stage, copy your old server code to a
  `server-pure-sql` folder, then make your refactors in-place in the `server`
  folder. This way you will have both versions in your liberated repo, so
  everyone can see that you are awesome with both technologies!

---

## Basic requirements

### Section 1:

- [ ] Design a normalized (multi-table) schema to hold data for your chatterbox-server. Edit the file `server/schema.sql` to define the table (or tables) you want, then create the database with your schema using `mysql -u root < path/to/schema.sql`. Log into MySQL from the command line again and use `DESCRIBE TABLE` to verify that it was created correctly.
- [ ] Use npm to install (and save) the `mysql` module using `npm install mysql --save` so your chatterbox-server is able to talk to MySQL.
- [ ] Take a look at the tests in `server/spec/server-spec.js`. Before you start hacking on your persistent server, read the tests and try to understand what they're trying to do.
  - [ ] **NOTE**: The tests depend on the details of the schema you created,   so you will need to customize the spec file with some of these details before it will be able to run.
- [ ] Put all the pieces together to create a persistent SQL-backed chatterbox-server! Use `server/app.js` as your main file. You can copy over js files from your chatterbox-server assignment and `require` them into `server`.
  * Note: This will mean you remove the in-memory messages array that used to store your data as part of the node process. Every new message will result in a write to the database, and every request for data will result in a read. You should no longer need to cache any of that data in memory as part of the application.
- [ ] Have your server connect to MySQL, and use the database connection to store data as messages come in.
- [ ] Manually test your server's persistence: Send some chat messages to your server, then stop Node. Start your server up again, connect to it with the client, and see whether the messages you sent last time are still there! Finally, make all the unit tests pass and write some more of your own!

### Section 2:

- [ ] Install Sequelize using `npm install --save sequelize`.
- [ ] Read the Sequelize docs and the example code in `orm-resources/orm-example.js` to understand how the ORM works.
- [ ] Refactor your existing server to use Sequelize.
- [ ] Make sure your persistent chatterbox-server still passes all the tests it passed before. Since you haven't modified your server's HTTP interface or the database schema (right?), the old unit tests should still work without modification.
  * Note that this is one of the biggest wins from consistent testing: They let you refactor and rewrite your code with confidence, since they'll tell you if you broke anything that used to work.

## Extra credit

### Section 1:

- [ ] Make sure you have a users table in your database. Make up some settings that a user can change, such as text color, font, witty sign-off message, etc. Store these settings in the users table, and when the user returns, make sure to recognize them and apply their settings.
- [ ] But wait - it's bad database design to store the same piece of data, such as a username, in multiple tables. Store the username ONLY in the users table, and use a foreign key to relate messages to the user who said them.
- [ ] What's that? You need to make changes to the table schema, but there's already precious user data stored in those tables that must not be lost? If you were to DROP the table and re-CREATE, your users would be furious! Time to teach yourself the ALTER TABLE command.
- [ ] Add a search feature! Make a page where you can type in a user's name and see everything that they've said, or type in a quotation from a message and find out which user said it.
- [ ] Let me password-protect my chat username so other people can't impersonate me. Add a password column to the users table, and create an interface for a user to register their username and password. Show an error message to anybody who tries to use a registered username without knowing the right password.
- [ ] Read up on indexing, and Investigate how it can improve the performance of your queries. Profile a query against a non-primary column. Then index the column and re-run. Optionally, profile similar lookups in a non-relational db.

### Section 2:


#### Intro to Mongo

- [ ] Install the `node-mongodb` module (`npm install mongodb`).
- [ ] Read the sample code in `non-relational-resources/mongo-example.js` and understand how a Node server interfaces with MongoDB.
- [ ] Read the tests in `non-relational-resources/spec/mongo-web-historian-spec.js` and understand what they're trying to do.

#### Web Historian Refactor

- [ ] Copy the source code files from your Web Historian project to this directory.
- [ ] Rewrite your archive server to store data in MongoDB instead of in files. When you're done, you shouldn't need to be using files at all!
- [ ] Get `non-relational-resources/spec/mongo-web-historian-spec.js` to pass. This file is not complete; it's just a starting point. You will need to edit parts of it to make it work with your database configuration and your web historian server interface.
- [ ] Ensure that your migration to MongoDB didn't break any of your web historian functionality: copy over the old test specs from your original archive project and make sure they still work with your new version!
- [ ] Archive a few real sites with your archive server, so that there's some real site data in your MongoDB database. Then, try to do some analysis on those pages, like: how many use jquery? how many images do they use? etc.

#### Memcached

- [ ] Read about how [Memcached] works.
- [ ] Put a Memcached layer in front of your database to improve speed.
- [ ] Write a simple ORM of your own!

## Docs

### Relevant SQL documentation

* [Introduction to SQL tutorial]
* [Interactive tutorial on SQL]
* [MySQL CREATE TABLE reference docs]
* [MySQL SELECT reference docs]
* [MySQL INSERT reference docs]
* [Node mysql module docs]
* [Executing SQL statements from a file]
* [A Visual Explanation of SQL Joins]
* [SQLfiddle]
* [MySQL Workbench - robust MySQL design tool]

### Relevant ORM documentation

* [Sequelize ORM for Node]
* [Object Relational Mapping - Wikipedia]

### Relevant noSQL documentation

* [Starting and stopping MongoDB]
* [Using MongoDB from the command line]
* [MongoDB module for Node]

### Relevant Memcached documentation _Only needed for extra credit_

* [Memcached site]
* [Node-memcached module]

[Relational Databases]:https://en.wikipedia.org/wiki/Relational_database
[WWW SQL Designer]:http://ondras.zarovi.cz/sql/demo/
[DB designer]:http://dbdsgnr.appspot.com/
[SQLCourse.com]:http://www.sqlcourse.com/intro.html
[WWW SQL Designer]:http://ondras.zarovi.cz/sql/demo/
[Create a database from the command line]:http://www.linux.org/article/view/create-mysql-database-via-command-line
[MongoDB tutorial]:http://docs.mongodb.org/manual/tutorial/getting-started/
[map-reduce query]:http://docs.mongodb.org/manual/applications/map-reduce/
[Memcached]:http://www.memcached.org/
[Introduction to SQL tutorial]:http://www.sqlcourse.com/intro.html
[Interactive tutorial on SQL]:http://sql-pql.herokuapp.com/
[MySQL CREATE TABLE reference docs]:https://dev.mysql.com/doc/refman/5.1/en/create-table.html
[MySQL SELECT reference docs]:https://dev.mysql.com/doc/refman/5.0/en/select.html
[MySQL INSERT reference docs]:http://dev.mysql.com/doc/refman/5.5/en/insert.html
[Node mysql module docs]:https://github.com/felixge/node-mysql
[Executing SQL statements from a file]:https://dev.mysql.com/doc/refman/5.6/en/mysql-batch-commands.html
[Sequelize ORM for Node]:http://sequelizejs.com/
[Object Relational Mapping - Wikipedia]:http://en.wikipedia.org/wiki/Object-relational_mapping
[Starting and stopping MongoDB]:http://www.mongodb.org/display/DOCS/Starting+and+Stopping+Mongo
[Using MongoDB from the command line]:http://docs.mongodb.org/manual/tutorial/getting-started/
[MongoDB module for Node]:https://github.com/christkv/node-mongodb-native#readme
[Memcached site]:http://www.memcached.org/
[Node-memcached module]:https://github.com/3rd-Eden/node-memcached
[A Visual Explanation of SQL Joins]:http://www.codinghorror.com/blog/2007/10/a-visual-explanation-of-sql-joins.html
[SQLfiddle]:http://sqlfiddle.com/
[MySQL Workbench - robust MySQL design tool]:http://dev.mysql.com/downloads/workbench/

