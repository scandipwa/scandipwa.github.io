---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Connecting to the GraphQL resolver
description: Important step to promote your server data on to your application presentation layer.

# Micro navigation
micro_nav:
  enabled: true
  url: '/docs/cookbook'
  title: Cookbook

# Page navigation
page_nav:
    prev:
        content: Creating resolver
        url: '/docs/cookbook/creating-resolver'
    next:
        content: Granular caching
        url: '/docs/cookbook/caching'

---

## Watch the tutorial

<div class="video">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/zoioI81yOWI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## A step-by-step algorithm of creating a query
> **TODO**: Complete the guide with references to helpers used in the video

ScandiPWA is provided with functionality that allows writing GraphQL queries quickly and easily. You will learn to implement a simple query.

Imagine having a following GraphQL schema:

```graphql
type Mutation {
    sendMessage(input: SendMessageInput!): SendMessageOutput
}

input SendMessageInput {
    chat_id: String!
    message_text: String!
    message_image_id: String
}

type SendMessageOutput {
    success: Boolean
    sent_message_info: SentMessageInformation
}

type SentMessageInformation {
    message_id: Int
    sender_id: Int
}
```

1. Create a file in `src/app/query` folder. Call it `<FunctionalityPartName>.query.js`.

2. In there create a class called `<FunctionalityPartName>Query`.

3. Implement query retrieval functionality. Do not forget to add export to the `src/query/index.js` file.
>**Note: ScandiPWA provides `Field` class as a helper to write GraphQL queries. It is strongly recommended to stick to it as to the only possible way of query implementation**


```javascript
// Chat.query.js
import { Field } from 'Util/Query';

export class ChatQuery {
    // The query itself
    sendMessage(input) {
        return new Field('sendMessage')
            // Set query's arguments
            .addArgument('input', 'SendMessageInput!', input)
            // Add fields to query (Field instance)
            .addFieldList(this._getSendMessageFields());
    }

    // Option 1: setting fields with addFieldList from array
    _getSendMessageFields() {
        return [
            'success',
            this._getSentMessageInfoField()
        ];
    }

    // Option 2: setting each field manually
    _getSentMessageInfoField() {
        return new Field('sent_message_info')
            .addField('message_id')
            .addField('sender_id');
    }
}

export default new ChatQuery();
```

4. Use the query!

Natural question should arise at this point: what does `input` contain?

Answer is pretty trivial. It is a simple JS object, which has exactly the same structure as defined in `SendRmaMessageInput` type in the schema. This case it should be the following:

```javascript
{
    chat_id: '1BC2',
    message_text: 'My awesome chat API works perfectly fine!',
    message_image_id: '5DF1' // Optional because in input type it is defined as optional
}
```

Generally, there are two options how data can be fetched in ScandiPWA: through Service Worker (in most cases you want to use this option) or around it.

To use SW you need to create a dispatcher in `src/app/store/<FunctionalityPartName>` that inherits from `QueryDispatcher`, as follows:

```javascript
import { QueryDispatcher } from 'Util/Request';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';
import { SomeQuery } from 'Query';

export class SomeDispatcher extends QueryDispatcher {
    constructor() {
        /**
            About super(name, cacheTTL) - QueryDispatcher constructor
            @param name — Name of model for ServiceWorker to send BroadCasts updates to
            @param cacheTTL — Cache TTL (in seconds) for ServiceWorker to cache responses
        */
        super('Some', ONE_MONTH_IN_SECONDS);
    }

    onSuccess(options, dispatch) {
        // Dispatch action with new data
    }

    onError(error, dispatch) {
        // Handle error
    }

    prepareRequest(options) {
        return [
            SomeQuery.getQuery(options)
        ];
    }
}

export default new SomeDispatcher();
```

To ignore SW functionality functions `fetchQuery` and `fetchMutation` can be used as in example below. Simple promise-based workflow.

```javascript
import { SomeQuery } from 'Query';
import { fetchQuery } from 'Util/Request';

//...

fetchQuery(SomeQuery.getQuery(options))
    .then((result) => {
        // handle result
    })
    .catch((err) => {
        // handle error
    })
```
