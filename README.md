# Inventory System (v1.5) - Frontend
Frontend part of Inventory System (v1.5) in javaScript (React, Redux)<br>
Backend part: [Here](https://github.com/tsokying/Inventory-backend)

### Introduction
1) An Inventory Management System.
2) Record Product and Location details + Stock level
3) Sort, Search on tables
4) Upload csv or manually create records
5) Edit and Delete records

### How to run

with [Node.js (and npm) installed](https://nodejs.org/en/download/)
```sh
$ cd Inventory-frontend
$ npm start
```
the application with run on port 3000 by default

1) Run both frontend and backend to test in localhost
2) The backend require a "inventory1" database in MySQL (user: root; password: abcde12345) (Edit in Backend: "src\main\resources\application.properties")
3) You can use csv files for testing (Files in Frontend: "\csvFile")

### Development daily:

1) Day one: 
* Try to design the database structure.
* Learn and study OneToMany, ManyToOne, ManyToMany relations in JPA. (and fail to implement them)
* Student more about database designs (1NF, 2NF and 3NF).
* Setting up the Entities.
* Learn and use Project Lombok..

2) Day two:
* Redesign the database structure, adding "Stock" and "Package" tables.
* Setting up Repositories, Services and Controllers.
* Test with Postman.
* implement csv files reading (backend).

3) Day Three:
* Design the frontend with "bootstrap-table". (and fail to convert to React Component)
* Redsign the table with "react-bootstrap-table2".
* Setting up Redux's store, actions and reducers.

4) Day Four:
* Setting up pop-up windows. 
* Implement "Create" and "Delete" functions.
* Implement CSV uploads (Tried "jackson-dataformat-csv" vs "opencsv"; tried "parsing csv in frontend" and "sending Form-data")

5) Day Five:
* Implement "Edit" function.
* Setting up ProductTable and StockTable.
* Finaly check and testing before submission.

### To-do:
* Create Stock record with name/code instead of IDs
* Validation and errors (Cannot show errors right now, due to the fact that using Models instead of a new page)
* Login and users
* Package functions to demonstrate real-life stock transfering (Delete stock + enter more Information)
* OnClick check details of product and location on StockTable
* Merge same location's same product in StockTable
* Unit Test