var http = require('http'),
    bl   = require('bl');

http.get(process.argv[2], function(res){
  res.setEncoding('utf-8');

  res.pipe(bl(function(err,data){
    if(err) {
      console.log(err);
      process.exit(1);
    }

    var str = data.toString();
    console.log(str.length);
    console.log(str);
  }));

});
