const models = require('../models/messages.models.js');

module.exports = {

  threads: {

    get: async ( req, res ) => {
      const result = await models.threads.get( req.query.email );
      const newThreads = [];
      let newThread, threadMessages, productInfo, ownerInfo, renterInfo;

      for ( let thread of result.rows ) {
        threadMessages = await models.messages.get( thread.thread_id );
        productInfo = await models.productInfo.get( thread.item_id );
        ownerInfo = await models.userInfo.get( thread.owner_id );
        renterInfo = await models.userInfo.get( thread.renter_id );

        newThread = {
          threadId: thread.thread_id,
          itemName: productInfo.rows[0].title,
          itemImageUrl: productInfo.rows[0].photos[0],
          itemId: thread.item_id,
          ownerId: thread.owner_id,
          ownerName: `${ ownerInfo.rows[0].firstname } ${ ownerInfo.rows[0].lastname }`,
          ownerImageUrl: ownerInfo.rows[0].userphoto,
          renterId: thread.renter_id,
          renterName: `${ renterInfo.rows[0].firstname } ${ renterInfo.rows[0].lastname }`,
          renterImageUrl: renterInfo.rows[0].userphoto,
          email: ownerInfo.rows[0].email.toLowerCase(),
          userRole: 'user role',
          lastMessage: thread.last_message === 'null' ? null : thread.last_message,
          timeUpdated: parseInt( thread.time_updated ),
          viewed: false,
          messages: threadMessages.rows
        };

        newThreads.push( newThread );
      }
      res.send( newThreads );
    },

    post: async ( req, res ) => {
      await models.threads.post ( req.body );
      res.end();
    },

    put: ( req, res ) => {
      models.threads.put();
      res.send( 'test' );
    }
  },

  messages: {

    post: ( message ) => {
      models.messages.post( message );
    }
  },

  user: {

    get: async ( req, res ) => {
      const result = await models.userInfo.get( null, req.query.email );
      const userInfo = {
        username: `${ result.rows[0].firstname } ${ result.rows[0].lastname }`,
        userId: result.rows[0].user_id
      };
      res.send( userInfo );
    }
  }
};