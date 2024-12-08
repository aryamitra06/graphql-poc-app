5 DEC 2024 - Started Learning GraphQL

❌ PROBLEMS IN REST API:

For example this is an REST Endpoint: https://jsonplaceholder.typicode.com/todos
that returns an array of object:
{
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
},

if frontend needs only "title" key to show, then this is overfetching from the REST API which causes network bandwidth issue.

Also, if frontend wants to show the only "name" against the userId then one more REST API "/user/<user_id>"" needs to be called and again the issue comes where we need to call the junk of keys in the object which causes the network bandwidth issue.

which returns:
{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
 },

 ✅ NOW LET'S SOLVE THIS PROBLEM IN GRAPHQL:

 In GraphQL the above problem we can solve by making the object like:

todo:
    {
        title: "delectus aut autem",
        user: {
            name: "Leanne Graham"
        }
    }

