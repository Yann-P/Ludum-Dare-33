var DATA = {

	turrets: {
		0: {
			radius: 20,
			range: 100,
			frequency: 900,
			damage: 1,
			health: 10,
			reward: 10
		},

		1: {
			radius: 20,
			range: 110,
			frequency: 850,
			damage: 1,
			health: 30,
			reward: 50
		},

		2: {
			radius: 20,
			range: 120,
			frequency: 800,
			damage: 1,
			health: 70,
			reward: 100
		},

		3: {
			radius: 20,
			range: 130,
			frequency: 750,
			damage: 1,
			health: 200,
			reward: 200
		},

		4: {
			radius: 20,
			range: 150,
			frequency: 700,
			damage: 1,
			health: 500,
			reward: 500
		},

		5: {
			radius: 20,
			range: 160,
			frequency: 650,
			damage: 1,
			health: 1000,
			reward: 1000
		},

		6: {
			radius: 20,
			range: 150,
			frequency: 650,
			damage: 1,
			health: 2000,
			reward: 2000
		},

		7: {
			radius: 20,
			range: 150,
			frequency: 650,
			damage: 1,
			health: 5000,
			reward: 5000
		},

		8: {
			radius: 30,
			range: 250,
			frequency: 350,
			damage: 1,
			health: 10000,
			reward: 10000
		}

	},

	map: {

		objects: [
			// x, y, key
			[1750, 50, 'fence-v'],
			[1750, 100, 'pine'],
			[1750, 185, 'fence-v'],
			[1710, 250, 'pine'],
			[1750, 200, 'flower-red'],
			[1750, 300, 'pine'],
			[1730, 350, 'pine-red'],
			[1750, 400, 'pine'],
			[1800, 420, 'mushroom'],

			[1780, 950, 'fence-v'],
			[1780, 800, 'fence-v'],
			[1780, 870, 'stump'],
			[1780, 650, 'fence-v'],
			[1780, 750, 'fence-v'],
			[1780, 700, 'fence-v'],
			

			[1730, 580, 'fence-h'],
			[1630, 580, 'fence-h'],


			[1580, 190, 'fence-v'],
			//[1500, 450, 'fence-v'],
			[1500, 400, 'fence-v-triple'],
			//[1300, 400, 'fence-v'],

			[1050, 600, 'fence-v'],
			[1050, 700, 'fence-v'],

			[1590, 545, 'fence-v'],

			[1540, 810, 'fence-h'],
			[1340, 810, 'fence-h-triple'],
			[1140, 810, 'fence-h'],

			[1550, 510, 'fence-h'],


			[1400, 130, 'fence-h-triple'],
			[1100, 130, 'fence-h-triple'],

			[1150, 470, 'fence-h-triple'],
			[850, 470, 'fence-h-triple'],

			[1550, 570, 'flower'],
			[1600, 730, 'pine'],
			[1050, 750, 'pine'],
			[1060, 800, 'pine'],
			[1570, 240, 'pine'],
			[1500, 270, 'pine-red'],
			

			[1560, 140, 'mushroom'],

			[690, 630, 'fence-v-triple'],
			[790, 700, 'fence-v-triple'],
			[930, 820, 'fence-v-triple'],

			[220, 470, 'fence-v-triple'],
			[360, 470, 'fence-v-triple'],
			[360, 270, 'fence-v'],
			[360, 200, 'mushroom'],
			[1500, 610, 'mushroom'],
			[342, 637, 'mushroom'],
			[360, 770, 'fence-v-triple'],
			[90, 350, 'fence-v-triple'],

			[640, 870, 'fence-h-triple'],
			[953, 325, 'fence-h-triple'],
			[1326, 641, 'fence-h-triple'],
			[1130, 272, 'pine'],

			[1150, 200, 'fence-v'],

			[580, 170, 'fence-v-triple'],
			[580, 370, 'fence-v'],

			[650, 460, 'flower-red'],
			[600, 460, 'flower'],
			[1050, 527, 'flower'],
			[1350, 411, 'flower'],
			[1340, 10, 'flower'],

			[1310, 400, 'fence-v'],

			[360, 950, 'pine'],

			[250, 170, 'fence-h-triple'],

			[430, 600, 'fence-h'],
			[77, 702, 'fence-h'],
			[177, 702, 'fence-h'],

			[222, 666, 'flower-red'],


			[560, 730, 'pine'],
			[700, 256, 'flower-red'],
			[10, 700, 'flower-red'],

			[518, 607, 'pine-red'],
			[655, 623, 'pine-red'],
			[925, 984, 'pine-red']


		],

		bases: [
			[1390, 60, 50],
			[1430, 383, 150],
			[978, 858, 250],
			[581, 602, 500],
			[296, 583, 900],
			[99, 917, 1000]
		],

		turrets: [
			// x, y, type
			[1788, 158, 0],
			[1770, 360, 0],
			[1760, 580, 0],
			[1526, 726, 0],
			[1578, 308, 0],

			[1493, 90, 1],
			[1240, 80, 1],
			[1200, 90, 1],
			[1240, 200, 1],
			[1540, 200, 1],
			[1037, 215, 1],
			[811, 538, 1],

			[1400, 212, 2],
			[1200, 530, 2],
			[1300, 650, 2],
			[1160, 700, 2],
			[1400, 700, 2],

			[1440, 530, 3],
			[1300, 800, 3],
			[1550, 780, 3],
			[1550, 900, 3],
			[1400, 900, 3],
			[1026, 700, 3],

			[1220, 900, 4],
			[880, 840, 4],
			[890, 747, 4],
			[737, 721, 4],
			[650, 839, 4],

			[440, 417, 5],
			[428, 801, 5],
			[610, 780, 5],

			[350, 90, 6],
			[300, 80, 6],
			[250, 90, 6],
			[328, 170, 6],
			[158, 200, 6],


			[288, 373, 7],
			[140, 780, 7],

			[300, 800, 8]




		]


	}

}