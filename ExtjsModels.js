// Search field controller
Ext.define('Ext.form.SearchField', {
  extend: 'Ext.form.field.Text',
  alias: 'widget.searchfield',
  inputType: 'search',

  // Add specialkey listener
  initComponent: function() {
    this.callParent();
    this.on('specialkey', this.checkEnterKey, this);
  },

  // Handle enter key presses, execute the search if the field has a value
  checkEnterKey: function(field, e) {
    var value = this.getValue();
    if (e.getKey() === e.ENTER && !Ext.isEmpty(value)) {
        var tweet_store = Ext.getStore("tweetStore");
        tweet_store.getProxy().setUrl('http://tweetsaver.herokuapp.com/?q='+value+'&count=20');    
        tweet_store.load();
    }
  }
});

// Model for twitter feed loading json through url
Ext.define("Twitter", {
  extend:'Ext.data.Model',
  fields : [
    {
       name : 'text',
       mapping : 'text'
    },

    {
       name : 'createdAt',
       mapping : 'createdAt',
       type: 'date',
       dateFormat: 'u'
    },

    {
       name : 'name',
       mapping : 'user.name'
    },

    {
      name : 'profilePic',
      mapping : 'user.profileImageUrlHttps'
    },

    {
      name : 'tweetHandle',
      mapping : 'user.screenName'
    }
  ],
  proxy: {
    type:'jsonp',
    reader: {
      type: 'json',
      rootProperty: 'tweets'
    }
  }
});

// Model for Saved Tweets loading through localstorage
Ext.define("SaveFeed", {
  extend:'Ext.data.Model',
  fields : [
    {
      name : 'text',
    },

    {
      name : 'createdAt',
    },

    {
      name : 'name',
    },

    {
      name : 'profilePic',
    },

    {
      name : 'tweetHandle',
    }
  ],
  proxy: {
    type: 'localstorage'
  }
});
