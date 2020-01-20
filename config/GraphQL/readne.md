
#1 Create

    mutation{
        createMessage (input:{
            title:"test GQL",
            description:"Let me show you how to create a new Product. You just need to send the createProduct mutation request from the GraphiQL"
        })
        {
          _id
          title
          description
        }
    }

#2 GetById

 {
    getMessage(
        _id:"5e23a8aa0a436314c4c6555b"
    ) {
        _id
        title
        description
    }
}



#3 Update

    mutation{
        updateMessage ( _id:"5e23a8aa0a436314c4c6555b",
          input:{
              title: "ADM-4250 (UPDATED II)  Errores de datos - Filtro de pago y Buscador",
              description: "test (UPDATED II)"
          })
        {
          _id
          title
          description
        }
    }

#4 Delete

 mutation{
        deleteMessage (_id:"5e23aef661c1db0bf80bf752")
        {
          _id
          title
          description
        }
    }

#1 Get all

{
        allMessage{
          title,description
        }
}


# Message

mutation {
  pushMessage(label:"My first Message") {
    label
  }
}


# subscription

subscription createdMessage{
  createdMessage{
 	_id
  title
  }
 }


#### npm install --save graphql-subscriptions http subscriptions-transport-ws cors
#### npm install --save apollo-link-ws