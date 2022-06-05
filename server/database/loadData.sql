-- create unlogged table items_import (doc json);

-- \copy items_import from '/Users/jo/Desktop/RPP33_Repos/garager/server/database/items.json';

-- insert into items (item_id, user_id, title, category, brand, model, itemDescription, price, nyop, min_price, availableFrom, availableTo, address, latLng, photos)
-- select p.*
-- from items_import l
--   cross join lateral json_populate_recordset(null::items, doc) as p
-- on conflict (item_id) do update 
--   set name = excluded.name, 
--       comment = excluded.comment;

with items_json (doc) as (
   values 
    ('[
  {
    "item_id": 0,
    "user_id": 2,
    "title": "Oriental Trading Company Wedding Arch",
    "category": "events",
    "brand": "Oriental Trading Company",
    "model": "",
    "itemDescription": "Wedding Arch -In usable condition",
    "price": 57,
    "min_price": 35,
    "availableFrom": "2022-05-08T01:27:01.621Z",
    "availableTo": "2022-05-24T01:27:01.622Z",
    "address": "2237 Walnut Ct, Marquette, MI 62638",
    "latLng": [
      "46.233333",
      "-86.35"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 1,
    "user_id": 9,
    "title": "Obrien Life Jacket",
    "category": "boating",
    "brand": "Bertram",
    "model": "",
    "itemDescription": "Flex fit life jacket that moves with you -In used condition",
    "price": 15,
    "min_price": 13,
    "availableFrom": "2022-06-01T00:52:54.774Z",
    "availableTo": "2022-06-30T00:52:54.775Z",
    "address": "299-101 W Douglass Ave, Houghton, MI 49931",
    "latLng": [
      "47.118970",
      "-88.573360"
    ],
    "photos": [
      "https://images-us-prod.cms.commerce.dynamics.com/cms/api/nwtfklkdlc/imageFileData/search?fileName=/Products%2FOB2201733_000_001.png&m=6&q=80&cropfocalregion=true","https://images-us-prod.cms.commerce.dynamics.com/cms/api/nwtfklkdlc/imageFileData/search?fileName=/Products%2FOB2201733_000_002.png&m=6&q=80&cropfocalregion=true"
    ]
  },
  {
    "item_id": 2,
    "user_id": 6,
    "title": "Corona Wheebarrow",
    "category": "gardening",
    "brand": "Corona",
    "model": " WB 2606KFF",
    "itemDescription": "Wheebarrow -In used condition",
    "price": 15,
    "min_price": 10,
    "availableFrom": "2022-06-20T00:52:54.775Z",
    "availableTo": "2022-07-31T00:52:54.775Z",
    "address": "2324 Pine Pkwy, Lansing, MI 62333",
    "latLng": [
      "46.547581",
      "-87.395592"
    ],
    "photos": [
      "https://www.qcsupply.com/media/catalog/product/cache/5284d6cde28d5b60f464df18bb1a18f4/3/6/360372_1_.jpg"
    ]
  },
  {
    "item_id": 3,
    "user_id": 2,
    "title": "Mac Tools Auto Sander",
    "category": "automotive",
    "brand": "Mac Tools",
    "model": "",
    "itemDescription": "Auto Sander -In excellent condition",
    "price": 52,
    "min_price": 35,
    "availableFrom": "2022-06-03T01:27:01.622Z",
    "availableTo": "2022-07-03T01:27:01.622Z",
    "address": "1027 Pine Pkwy, Menominee, MI 49430",
    "latLng": [
      "47.121132",
      "-88.569420"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 4,
    "user_id": 6,
    "title": "Lowkystar Nano Guantlet Hulk Version Endgame",
    "category": "decorations",
    "brand": "LowkyStar",
    "model": "",
    "itemDescription": "NANO GAUNTLET HULK VERSION TOY/REPLICA FULL METAL LIFE-SIZE HANDCRAFTED COLLECTIBLE WITH RECHARGEABLE LED INFINITY STONES AVENGERS: ENDGAME",
    "price": 103,
    "min_price": 7,
    "availableFrom": "2022-05-04T00:52:54.775Z",
    "availableTo": "2022-06-02T00:52:54.775Z",
    "address": "2324 Pine Pkwy, Lansing, MI 62333",
    "latLng": [
      "46.547581",
      "-87.395592"
    ],
    "photos": [
      "https://cdn.shopify.com/s/files/1/0086/7188/7396/products/IMG_3696_1920x.jpg?v=1641209393"
    ]
  },
  {
    "item_id": 5,
    "user_id": 7,
    "title": "DeWalt Hex Wrench Set -all pieces there",
    "category": "hand tools",
    "brand": "DeWalt",
    "model": "",
    "itemDescription": "Hex Wrench Set -all pieces there -In great condition",
    "price": 84,
    "min_price": 32,
    "availableFrom": "2022-06-16T01:27:01.622Z",
    "availableTo": "2022-07-23T01:27:01.622Z",
    "address": "2644 Ellen Street, Houghton, MI 49959",
    "latLng": [
      "46.233333",
      "-86.35"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 6,
    "user_id": 13,
    "title": "Snap-On Battery Isolators",
    "category": "automotive",
    "brand": "Snap-On",
    "model": "",
    "itemDescription": "Battery Isolators -In excellent condition",
    "price": 45,
    "min_price": 15,
    "availableFrom": "2022-05-14T01:27:01.622Z",
    "availableTo": "2022-06-04T01:27:01.622Z",
    "address": "2752 Locust Dr, Marquette, MI 93696",
    "latLng": [
      "47.121132",
      "-88.569420"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 7,
    "user_id": 4,
    "title": "Fischer child size Skis",
    "category": "sports",
    "brand": "Fischer",
    "model": "",
    "itemDescription": "child size Skis -In great condition",
    "price": 93,
    "min_price": 64,
    "availableFrom": "2022-05-06T01:27:01.622Z",
    "availableTo": "2022-05-09T01:27:01.622Z",
    "address": "7744 Ellen Cir, Houghton, MI 76865",
    "latLng": [
      "46.547581",
      "-87.395592"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 8,
    "user_id": 4,
    "title": "Snap-On Battery Isolators",
    "category": "automotive",
    "brand": "Snap-On",
    "model": "",
    "itemDescription": "Battery Isolators -In good condition",
    "price": 44,
    "min_price": 6,
    "availableFrom": "2022-06-15T01:27:01.622Z",
    "availableTo": "2022-07-24T01:27:01.622Z",
    "address": "4743 Baker Ct, Menominee, MI 67821",
    "latLng": [
      "47.121132",
      "-88.569420"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 9,
    "user_id": 8,
    "title": "Oriental Trading Company Cornhole/ Horse Shoe Sets",
    "category": "events",
    "brand": "Oriental Trading Company",
    "model": "",
    "itemDescription": "Cornhole/ Horse Shoe Sets -In used condition",
    "price": 99,
    "min_price": 42,
    "availableFrom": "2022-05-23T01:27:01.622Z",
    "availableTo": "2022-06-12T01:27:01.622Z",
    "address": "5752 Moore Dr, Lansing, MI 55209",
    "latLng": [
      "47.121132",
      "-88.569420"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 10,
    "user_id": 1,
    "title": "Scotch Paint Mixer for use with cordless drill",
    "category": "home repair",
    "brand": "Scotch",
    "model": "",
    "itemDescription": "Paint Mixer for use with cordless drill -In great condition",
    "price": 37,
    "min_price": 5,
    "availableFrom": "2022-05-12T01:27:01.622Z",
    "availableTo": "2022-06-04T01:27:01.622Z",
    "address": "4467 Moore Ct, Marquette, MI 82274",
    "latLng": [
      "47.121132",
      "-88.569420"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 11,
    "user_id": 1,
    "title": "Anthem Amplifier",
    "category": "audio/visual",
    "brand": "Anthem",
    "model": "",
    "itemDescription": "Amplifier -In used condition",
    "price": 76,
    "min_price": 5,
    "availableFrom": "2022-05-21T01:27:01.622Z",
    "availableTo": "2022-06-17T01:27:01.622Z",
    "address": "1258 Catherine Cir, Lansing, MI 83498",
    "latLng": [
      "46.547581",
      "-87.395592"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 12,
    "user_id": 0,
    "title": "Proto Battery Isolators",
    "category": "automotive",
    "brand": "Proto",
    "model": "",
    "itemDescription": "Battery Isolators -In excellent condition",
    "price": 92,
    "min_price": 63,
    "availableFrom": "2022-06-27T01:27:01.622Z",
    "availableTo": "2022-08-12T01:27:01.622Z",
    "address": "6606 Baker Rd, Houghton, MI 68457",
    "latLng": [
      "47.121132",
      "-88.569420"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 13,
    "user_id": 0,
    "title": "Target 12 inch patterned rug",
    "category": "decorations",
    "brand": "Target",
    "model": "",
    "itemDescription": "12 inch patterned rug -In good condition",
    "price": 70,
    "min_price": 40,
    "availableFrom": "2022-06-12T01:27:01.622Z",
    "availableTo": "2022-07-12T01:27:01.622Z",
    "address": "2478 Walnut Dr, Houghton, MI 84300",
    "latLng": [
      "46.233333",
      "-86.35"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 14,
    "user_id": 13,
    "title": "Mr. Clean Carpet Cleaner",
    "category": "cleaning",
    "brand": "Mr. Clean",
    "model": "",
    "itemDescription": "Carpet Cleaner -In used condition",
    "price": 31,
    "min_price": 18,
    "availableFrom": "2022-05-25T01:27:01.622Z",
    "availableTo": "2022-06-18T01:27:01.622Z",
    "address": "6587 Willow Ct, Menominee, MI 69234",
    "latLng": [
      "46.233333",
      "-86.35"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 15,
    "user_id": 8,
    "title": "Urban Outfitters Fall Wreath and Corn Stalks",
    "category": "decorations",
    "brand": "Urban Outfitters",
    "model": "",
    "itemDescription": "Fall Wreath and Corn Stalks -In excellent condition",
    "price": 78,
    "min_price": 32,
    "availableFrom": "2022-06-24T01:27:01.622Z",
    "availableTo": "2022-08-10T01:27:01.622Z",
    "address": "8438 Moore Street, Menominee, MI 68928",
    "latLng": [
      "46.547581",
      "-87.395592"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 16,
    "user_id": 3,
    "title": "Anthem Speaker",
    "category": "audio/visual",
    "brand": "Anthem",
    "model": "",
    "itemDescription": "Speaker -In excellent condition",
    "price": 26,
    "min_price": 19,
    "availableFrom": "2022-06-26T01:27:01.622Z",
    "availableTo": "2022-08-11T01:27:01.622Z",
    "address": "8785 Baker Dr, Houghton, MI 88240",
    "latLng": [
      "47.121132",
      "-88.569420"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 17,
    "user_id": 7,
    "title": "Bissel Vacume",
    "category": "cleaning",
    "brand": "Bissel",
    "model": "",
    "itemDescription": "Vacume -In good condition",
    "price": 21,
    "min_price": 15,
    "availableFrom": "2022-05-06T01:27:01.622Z",
    "availableTo": "2022-05-10T01:27:01.622Z",
    "address": "4867 Moore Cir, Marquette, MI 70203",
    "latLng": [
      "46.547581",
      "-87.395592"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 18,
    "user_id": 12,
    "title": "Draper Projector",
    "category": "audio/visual",
    "brand": "Draper",
    "model": "",
    "itemDescription": "Projector -In usable condition",
    "price": 38,
    "min_price": 21,
    "availableFrom": "2022-05-10T01:27:01.622Z",
    "availableTo": "2022-06-01T01:27:01.622Z",
    "address": "6232 Pine Pkwy, Lansing, MI 77314",
    "latLng": [
      "46.547581",
      "-87.395592"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 19,
    "user_id": 5,
    "title": "Wooster Paint Mixer for use with cordless drill",
    "category": "home repair",
    "brand": "Wooster",
    "model": "",
    "itemDescription": "Paint Mixer for use with cordless drill -In usable condition",
    "price": 88,
    "min_price": 26,
    "availableFrom": "2022-06-03T01:27:01.622Z",
    "availableTo": "2022-07-03T01:27:01.622Z",
    "address": "5081 Catherine Rd, Lansing, MI 64649",
    "latLng": [
      "46.547581",
      "-87.395592"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 20,
    "user_id": 0,
    "title": "Octane Rock Climbing Harness",
    "category": "fitness",
    "brand": "Octane",
    "model": "",
    "itemDescription": "Rock Climbing Harness -In great condition",
    "price": 98,
    "min_price": 63,
    "availableFrom": "2022-05-16T01:27:01.622Z",
    "availableTo": "2022-06-08T01:27:01.622Z",
    "address": "1644 Walnut Blvd, Marquette, MI 50138",
    "latLng": [
      "46.547581",
      "-87.395592"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 21,
    "user_id": 6,
    "title": "Fischer child size Skis",
    "category": "sports",
    "brand": "Fischer",
    "model": "",
    "itemDescription": "child size Skis -In good condition",
    "price": 12,
    "min_price": 8,
    "availableFrom": "2022-05-05T01:27:01.622Z",
    "availableTo": "2022-05-07T01:27:01.622Z",
    "address": "3237 Emerson Blvd, Menominee, MI 94918",
    "latLng": [
      "46.233333",
      "-86.35"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 22,
    "user_id": 3,
    "title": "ProForm Weight Set",
    "category": "fitness",
    "brand": "ProForm",
    "model": "",
    "itemDescription": "Weight Set -In excellent condition",
    "price": 94,
    "min_price": 70,
    "availableFrom": "2022-06-16T01:27:01.622Z",
    "availableTo": "2022-07-17T01:27:01.622Z",
    "address": "3311 Walnut Cir, Menominee, MI 71704",
    "latLng": [
      "46.547581",
      "-87.395592"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 23,
    "user_id": 11,
    "title": "Bertram canoe",
    "category": "boating",
    "brand": "Bertram",
    "model": "",
    "itemDescription": "canoe -In usable condition",
    "price": 53,
    "min_price": 13,
    "availableFrom": "2022-06-25T01:27:01.622Z",
    "availableTo": "2022-08-08T01:27:01.622Z",
    "address": "3438 Locust Dr, Houghton, MI 84620",
    "latLng": [
      "47.121132",
      "-88.569420"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 24,
    "user_id": 5,
    "title": "Specialized Moped",
    "category": "recreational vehicles",
    "brand": "Specialized",
    "model": "",
    "itemDescription": "Moped -In great condition",
    "price": 93,
    "min_price": 66,
    "availableFrom": "2022-06-17T01:27:01.622Z",
    "availableTo": "2022-07-29T01:27:01.622Z",
    "address": "5125 Walnut Pkwy, Marquette, MI 97555",
    "latLng": [
      "46.233333",
      "-86.35"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 25,
    "user_id": 12,
    "title": "Oriental Trading Company Inflatable Bouncy House",
    "category": "events",
    "brand": "Oriental Trading Company",
    "model": "",
    "itemDescription": "Inflatable Bouncy House -In used condition",
    "price": 84,
    "min_price": 39,
    "availableFrom": "2022-06-10T01:27:01.622Z",
    "availableTo": "2022-07-14T01:27:01.622Z",
    "address": "8247 MillPond Ct, Houghton, MI 88060",
    "latLng": [
      "46.547581",
      "-87.395592"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 26,
    "user_id": 1,
    "title": "Good Fun LLC Outdoor Wedding Chairs x50",
    "category": "events",
    "brand": "Good Fun LLC",
    "model": "",
    "itemDescription": "Outdoor Wedding Chairs x50 -In usable condition",
    "price": 32,
    "min_price": 10,
    "availableFrom": "2022-06-06T01:27:01.622Z",
    "availableTo": "2022-07-08T01:27:01.622Z",
    "address": "5430 Walnut Cir, Marquette, MI 61947",
    "latLng": [
      "46.547581",
      "-87.395592"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 27,
    "user_id": 5,
    "title": "Craftsman Car Jack",
    "category": "automotive",
    "brand": "Craftsman",
    "model": "",
    "itemDescription": "Car Jack -In usable condition",
    "price": 68,
    "min_price": 52,
    "availableFrom": "2022-06-17T01:27:01.622Z",
    "availableTo": "2022-07-31T01:27:01.622Z",
    "address": "8532 Emerson Street, Marquette, MI 96106",
    "latLng": [
      "47.121132",
      "-88.569420"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 28,
    "user_id": 9,
    "title": "Makita hedge trimmer",
    "category": "power tools",
    "brand": "Makita",
    "model": "",
    "itemDescription": "hedge trimmer -In good condition",
    "price": 95,
    "min_price": 19,
    "availableFrom": "2022-06-20T01:27:01.622Z",
    "availableTo": "2022-07-22T01:27:01.622Z",
    "address": "0515 Walnut Rd, Lansing, MI 69275",
    "latLng": [
      "46.547581",
      "-87.395592"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 29,
    "user_id": 7,
    "title": "Proto Battery Charger and Booster Cables",
    "category": "automotive",
    "brand": "Proto",
    "model": "",
    "itemDescription": "Battery Charger and Booster Cables -In excellent condition",
    "price": 73,
    "min_price": 29,
    "availableFrom": "2022-06-27T01:27:01.622Z",
    "availableTo": "2022-08-13T01:27:01.622Z",
    "address": "4543 Locust Rd, Houghton, MI 87082",
    "latLng": [
      "46.547581",
      "-87.395592"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 30,
    "user_id": 1,
    "title": "Weber Outdoor Wedding Chairs x50",
    "category": "events",
    "brand": "Weber",
    "model": "",
    "itemDescription": "Outdoor Wedding Chairs x50 -In good condition",
    "price": 51,
    "min_price": 13,
    "availableFrom": "2022-06-23T01:27:01.622Z",
    "availableTo": "2022-08-08T01:27:01.622Z",
    "address": "3215 Pine Ct, Marquette, MI 96392",
    "latLng": [
      "47.121132",
      "-88.569420"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 31,
    "user_id": 2,
    "title": "Kobalt Circular Saw",
    "category": "power tools",
    "brand": "Kobalt",
    "model": "",
    "itemDescription": "Circular Saw -In great condition",
    "price": 15,
    "min_price": 9,
    "availableFrom": "2022-06-26T01:27:01.622Z",
    "availableTo": "2022-08-01T01:27:01.622Z",
    "address": "3303 Pine Street, Menominee, MI 64287",
    "latLng": [
      "46.233333",
      "-86.35"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 32,
    "user_id": 0,
    "title": "Oreck Dry Vac",
    "category": "cleaning",
    "brand": "Oreck",
    "model": "",
    "itemDescription": "Dry Vac -In great condition",
    "price": 64,
    "min_price": 45,
    "availableFrom": "2022-06-12T01:27:01.622Z",
    "availableTo": "2022-07-15T01:27:01.622Z",
    "address": "1351 Emerson Ct, Marquette, MI 81759",
    "latLng": [
      "47.121132",
      "-88.569420"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 33,
    "user_id": 13,
    "title": "HARRIS boat",
    "category": "boating",
    "brand": "HARRIS",
    "model": "",
    "itemDescription": "boat -In usable condition",
    "price": 33,
    "min_price": 16,
    "availableFrom": "2022-06-11T01:27:01.622Z",
    "availableTo": "2022-07-19T01:27:01.622Z",
    "address": "4403 Pine Rd, Houghton, MI 69790",
    "latLng": [
      "47.121132",
      "-88.569420"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 34,
    "user_id": 10,
    "title": "VSSL Gear 4 sleeping bags",
    "category": "camping",
    "brand": "VSSL Gear",
    "model": "",
    "itemDescription": "4 sleeping bags -In excellent condition",
    "price": 12,
    "min_price": 8,
    "availableFrom": "2022-05-31T01:27:01.622Z",
    "availableTo": "2022-06-28T01:27:01.622Z",
    "address": "2264 Catherine Dr, Menominee, MI 88445",
    "latLng": [
      "47.121132",
      "-88.569420"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 35,
    "user_id": 7,
    "title": "Valspar Paint Mixer for use with cordless drill",
    "category": "home repair",
    "brand": "Valspar",
    "model": "",
    "itemDescription": "Paint Mixer for use with cordless drill -In good condition",
    "price": 47,
    "min_price": 20,
    "availableFrom": "2022-06-22T01:27:01.622Z",
    "availableTo": "2022-08-06T01:27:01.622Z",
    "address": "2417 Pine Ct, Lansing, MI 88287",
    "latLng": [
      "47.121132",
      "-88.569420"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 36,
    "user_id": 0,
    "title": "Stanley hedge trimmer",
    "category": "power tools",
    "brand": "Stanley",
    "model": "",
    "itemDescription": "hedge trimmer -In excellent condition",
    "price": 29,
    "min_price": 6,
    "availableFrom": "2022-05-09T01:27:01.622Z",
    "availableTo": "2022-05-28T01:27:01.622Z",
    "address": "1488 Pine Pkwy, Menominee, MI 74873",
    "latLng": [
      "46.547581",
      "-87.395592"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 37,
    "user_id": 5,
    "title": "Valspar Painting trays and rollers",
    "category": "home repair",
    "brand": "Valspar",
    "model": "",
    "itemDescription": "Painting trays and rollers -In usable condition",
    "price": 7,
    "min_price": 3,
    "availableFrom": "2022-06-16T01:27:01.622Z",
    "availableTo": "2022-07-21T01:27:01.622Z",
    "address": "8417 Pine Street, Houghton, MI 89871",
    "latLng": [
      "46.233333",
      "-86.35"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 38,
    "user_id": 9,
    "title": "Urban Outfitters Throw pillows",
    "category": "decorations",
    "brand": "Urban Outfitters",
    "model": "",
    "itemDescription": "Throw pillows -In used condition",
    "price": 10,
    "min_price": 7,
    "availableFrom": "2022-06-14T01:27:01.622Z",
    "availableTo": "2022-07-24T01:27:01.622Z",
    "address": "2201 Skyline Street, Menominee, MI 58210",
    "latLng": [
      "46.233333",
      "-86.35"
    ],
    "photos": [
      ""
    ]
  },
  {
    "item_id": 39,
    "user_id": 12,
    "title": "Kobalt Chainsaw",
    "category": "power tools",
    "brand": "Kobalt",
    "model": "",
    "itemDescription": "Chainsaw -In good condition",
    "price": 44,
    "min_price": 30,
    "availableFrom": "2022-06-19T01:27:01.622Z",
    "availableTo": "2022-07-25T01:27:01.622Z",
    "address": "5502 Baker Ct, Houghton, MI 51899",
    "latLng": [
      "46.547581",
      "-87.395592"
    ],
    "photos": [
      ""
    ]
  }
]'::json)
)
insert into items (item_id, user_id, title, category, brand, model, itemDescription, price, nyop, min_price, availableFrom, availableTo, address, latLng, photos)
select p.*
from items_json l
  cross join lateral json_populate_recordset(null::items, doc) as p;