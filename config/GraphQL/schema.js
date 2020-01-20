

var typeDefs = `type Message {
                    _id: ID!
                    title: String!
                    description: String!
                    link: String
                    category: String
                    category_str: String
                    inner_id: String
                    read: Boolean
                  }
                  type Query {
                    getMessage(_id: ID!): Message
                    allMessage: [Message]
                  }
                  input MessageInput {
                    title: String!
                    description: String!
                  }
                  type Mutation {
                    updateMessage(_id: ID!, input: MessageInput): Message
                    createMessage(input: MessageInput) : Message
                    deleteMessage(_id: ID!) : Message
                  }
                  type Subscription {
                    createdMessage: Message
                  }

              `;


/*

  enum Cards {
                    Heal
                    Damage
                    Shield
                    Horror
                  }
                  type Entity{
                    _id: ID!
                    hp: int
                    shield: int
                    turns:in
                    cards: []
                  }


- Get game
- Create new game
- Get current status from player from game
- Get current status monster from game
- Get player’s cards

- Play next turn



- Create Game
	param: user

- Play
	param: card


- getGameStatus
	param: _id (id game)

- generate Cards

- Monster AI


Cards:

	Player:
		HP= 20
		Shield= 0
		Card[4]

	Monster:
		HP= 20
		Shield= 0
		Card[4]


Model:

	Game

		player: Entity
		moster:	Entity
		cards= [heal,damage,shield,horror]

	init
		player.hp = 20
		player.shield= 0
		player.turns= 12
		player.cards= getCards()

		moster.hp = 20
		moster.shield= 0
		moster.turns= 12
		moster.cards= getCards()

	getCards(){
		selectedCards=[];
		i=0;i<4; =>
		selectedCards.push(
			cards[rand(1-4)]
		)
	}
	canPlay:
		turns==0  || health==0


	cards:

	Heal	=> hp=hp+1
	Damage	=> hp=hp-1 si hp>0 sino pierde
	Shield	=> Shield=Shield+1
	Horror	=> lose turn

	cards= [heal,damage,shield,horror]
	entity= {
				hp: int
				shield: int
				turns:in
				cards: []
			}



*/
module.exports = typeDefs;
