
## Overview

This repository provides scripts and instructions for generating test data for Redis, importing it into Redis using RedisInsight, and creating a Redis index using RediSearch.

### Prerequisites

- Node.js installed on your machine
- Redis server running locally or accessible over the network
- RedisInsight installed (optional, for data import)

### Use case

Track searches in a web site for car brands, store data into Redis db and display most popular brands for the last 30 days.

### Steps

#### 1. Generate Redis Test Data

Execute the following command to generate Redis test data:

```sh
node.exe index.js > test.redis
```

This command will run the *index.js* script and output the generated test data to a file named **test.redis**.<br />
Each record of test data generated is imported with following commands:
```sh
HSET brandRankMonth:1712420300717 timestamp 1712420300717 brand "Nissan"
EXPIRE brandRankMonth:1712420300717 86400 NX
```
The first command will set the *timestamp* field to *1712420300717* and the *brand* field to "*Nissan*" within the hash named *brandRankMonth:1712420300717*.<br />
The second command (EXPIRE) will set the timeout for this hash key to 86400 seconds (1 month).

#### 2. Import Test Data into Redis

Import the generated test data into Redis using RedisInsight or any other preferred method.|<br />To import data using RedisInsight:

- Open RedisInsight and connect to your Redis server.
- Navigate to the "Bulk Actions" tab then "Upload Data".
- Select the **test.redis** file generated in the previous step.
- Follow the prompts to complete the import process.

#### 3. Create Redis Index with RediSearch
Once the test data is imported into Redis, create a Redis index using RediSearch (FT.CREATE). You can use Redis CLI or any Redis client that supports RediSearch commands. For example, to create a simple index:

```sh
FT.CREATE rankCarsIdx ON HASH PREFIX 1 brandRankMonth: SCHEMA timestamp NUMERIC brand TEXT
```

#### 4. Search for most popupar brands for the last 30 days

Run a search query on an index and perform aggregate transformations on the results:

```sh
FT.AGGREGATE rankCarsIdx "*" GROUPBY 1 @brand REDUCE COUNT 0 AS viewCount SORTBY 4 @viewCount DESC @brand ASC LIMIT 0 10
```

### Additional commands

List all indexes
```sh
FT._LIST
```
Display info about the index
```sh
FT.INFO rankCarsIdx
```
Delete index:
```sh
FT.DROPINDEX rankCarsIdx
# or
FT.DROPINDEX rankCarsIdx DD
```

### Resources
- https://redis.io/commands/hset
- https://redis.io/commands/expire
- https://redis.io/commands/ft.create/
- https://redis.io/commands/ft.aggregate/
- https://redis.io/commands/ft._list/
- https://redis.io/commands/ft.info/
- https://redis.io/commands/ft.dropindex/
- https://redis.com/redis-enterprise/redis-insight/
- https://nodejs.org/en/download/

