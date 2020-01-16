var db = require('mongodb').db;
db.articles.aggregate([

  {
    $bucketAuto: {
      groupBy: '$race',
      buckets: 200,
      output: {
        'count': { $sum: 1 },
        'people':
                {
                  $push: {
                    'name': '$fullName',
                    'race': '$race'
                  }
                }
      }
    }
  }]
);



