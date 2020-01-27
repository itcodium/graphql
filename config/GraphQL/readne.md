
# GAME


##1 Create

     mutation{
      createGame (input:{
          name:"TEST_NAME_0003"
      })
      {
         _id
        monsterEffect
      player{
				_id
				name
        hp
        shield
        turns
				cards
        hands
       }
       monster{
				_id
				name
        hp
        shield
        turns
				cards
        hands
       }
      }
  }


#2 GetGame
  {
    getGame(
        _id:"5e2e04c8d5e0fe1c603bb61f"
    )  {
         _id
         monsterEffect
      player{
				_id
				name
        hp
        shield
        turns
				cards
        hands
       }
       monster{
				_id
				name
        hp
        shield
        turns
				cards
        hands
       }
      }
  }

## GetPlayer Status
  {
    getPlayerStatus(
        _id:"5e2e1d754085ca1eacbdb6d5"
    )  {
         _id
      	name
        hp
        shield
        turns
				cards
        hands

      }
  }

## GetPlayer Cards

  {
    getPlayerCards(
      _id:"5e2e1d754085ca1eacbdb6d5"
    )
  }

## GetMonster Status
  {
    getMonsterStatus(
        _id:"5e2e1d754085ca1eacbdb6d5"
    )  {
         _id
      	name
        hp
        shield
        turns
				cards
        hands
      }
  }

#3 Play Turn

subscription playedTurn{
    playTurn(
        _id: "5e2e32986105241928759421",input: "Heal") {
        _id
        monsterEffect
        player {
            _id
            name
            hp
            shield
            turns
            cards
            hands
        }
        monster {
            _id
            name
            hp
            shield
            turns
            cards
            hands
        }
    }
}
}


#2 subscription

subscription createdGame{
  playedTurn {
        _id
        monsterEffect
      player{
				_id
				name
        hp
        shield
        turns
				cards
       }
       monster{
				_id
				name
        hp
        shield
        turns
				cards
       }
    }
 }

subscription createdGame{
  createdGame {
        _id
        monsterEffect
      player{
				_id
				name
        hp
        shield
        turns
				cards
       }
       monster{
				_id
				name
        hp
        shield
        turns
				cards
       }
    }
 }

#### npm install --save graphql-subscriptions http subscriptions-transport-ws cors
#### npm install --save apollo-link-ws


#### https://bons-web.webflow.io/challenge/backend-nodejs-challenge



----------------------------------------------------------------------------------------------

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
