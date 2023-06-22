# Guitar Depository

## Introduction

This is a fully-functioning RESTful Guitar API written in `node.js`, `express.js` and `mongoose`. The API can perform basic CREATE, READ, UPDATE and DELETE (CRUD) operations and comes with custom built Error Handling out-of-the-box. The API makes use of `mongoose` schemas to enforce rules and validators for client-input.

## REST Philosophy

### Terminology

**REST** stands for (**Re**presentational **S**tate **T**ransfer).
**State** is a general concept in Computer Science (CS) which describes a system as being **stateful** is it stores previous events that have occured in the system. In effect, if your system must remember some variable that you have stored in memory to complete future tasks, then the system is stateful. REST APIs are stateless, which means that they do not store previous versions of stored data anywhere.

**Representation** in CS refers to the way that we store data. For example, we could use 1s and 0s to represent the storage of a variable or a script, however, this is not so useful as machine code is not human-readable, we would like something that is easier to parse by humans. So we use a general-purpose language (**GPL**) in addition to a compiler to translate the commands into those that are machine-readble. Similarly, if we talk about storage of data, we can do so in JSON format. Suppose we write that we would like to send a JSON document containing some basic information about a guitar:

```JSON
    {
        "name": "Telecaster",
        "manufacturer": "Fender",
        "introduced": 1950
    }
```

this is a represetation of data that is easy to understand by us.

**Transfer** is quite self explanatory, in the sense that data or files can be sent or received by the client or server.

### Desciption of REST Process

In order to better understand the REST architecture we need to define two endpoints of HTTP. A **Client** is a piece of hardware (computer or otherwise) that accesses a service on a computer network. A **Server** is a program that provides a service to a client.

## Some Useful Links

- [A general overview of how a REST API works](https://www.youtube.com/watch?v=lsMQRaeKNDk)

- [Here's Roy Fielding (creator of the REST style) discussing the history of the Web and the steps leading to the development of the REST Architecture](https://www.youtube.com/watch?v=w5j2KwzzB-0)

- [A nice article describing the advantages and disadvantages in using REST architecture](https://www.techtarget.com/searchapparchitecture/definition/REST-REpresentational-State-Transfer)
