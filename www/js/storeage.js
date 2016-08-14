angular.module('starter.service')
  .factory('cache', function($cacheFactory) {
    db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
  var feedDatabase= "FEED";
    db.transaction(function(tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS ? (id, title,content,isRead)',[feedDatabase])

    }, function(error) {
      console.log('Transaction ERROR: ' + error.message);
    }, function() {
      alert('Populated database OK');
    });

    return {

      exeSql:function(query,params){
        db.transaction(function(tx) {
          tx.executeSql(query, params, function(tx, rs) {
            console.log('Record count (expected to be 2): ' , rs.rows);

          }, function(tx, error) {
            console.log('SELECT error: ' + error.message);
          });
        });
      },

      isRead:function(id){

      },
      setRead:function(){
        this.exeSql("")

      }


    }

  });
