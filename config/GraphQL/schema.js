

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
					getGame(_id: ID!): Game
					getPlayerStatus(_id: ID!): Entity
					getPlayerCards(_id: ID!): [Card]
					getMonsterStatus(_id: ID!): Entity
					getMessage(_id: ID!): Message
					allMessage: [Message]
				}
				input MessageInput {
					title: String!
					description: String!
				}
				input GameInput {
					name: String!
				}
				input GamePlayedCard {
					name: String!
				}
				input nameEntityInput {
					name: String!
				}
				type Mutation {
					createGame (input: GameInput) : Game
					playTurn (_id: ID!,input: String!) : Game
					updateMessage(_id: ID!, input: MessageInput): Message
					createMessage(input: MessageInput) : Message
					deleteMessage(_id: ID!) : Message
				}
				type Subscription {
					createdGame: Game
					playedTurn: Game
					createdMessage: Message
				}

				enum Card {
                    Heal
                    Damage
                    Shield
                    Horror
				}

				type Game{
					_id: ID!
					player: Entity
					monster: Entity
				}

				type Entity{
					_id: ID!
					name: String!
                    hp: Int!
                    shield: Int!
                    turns: Int!
					cards: [Card]
					hands: [Card]
				}`;



/*


API Doc
Required endponts:

-(OK) Get game
-(OK) Get current status from player from game
-(OK) Get current status monster from game
- Get player’s cards
- Create new game

- Play next turn
This endpoint could be called without a card. Also, returns the game entity and "monsterEffect". The last one indicates what the monster did in this turn.



- Create Game
	param: user

- Play
	param: card


- getGameStatus
	param: _id (id game)

- generate Cards

- Monster AI

Cards:

	Player: HP= 20; Shield= 0; Card[4]
	Monster: HP= 20; Shield= 0; Card[4]

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


		[{type:'heal', value: 1},
		{type:'damage', value: 1},
		{type:'shield', value: 1},
		{type:'horror', value:0 }]



*/
module.exports = typeDefs;
