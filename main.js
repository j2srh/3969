var feed = require("feed-read-parser");
var jsonfile = require('jsonfile')
var Client = require('node-rest-client').Client;

var keyword = "overlook";

/// Fetch "Pre-Application Conferences" https://www.portlandoregon.gov/bds/47126
feed("https://www.portlandoregon.gov/rss.cfm?c=47126", function (err, articles) {
    if (err) throw err;
    var file = '/Users/steveheard/Desktop/foobproj/preapplications.json'
    jsonfile.writeFile(file, articles, function (err) {
        console.error(err)
    })

    //for each article look and see if the title matches our key word 
    articles.forEach(function (article, index) {
        if (article.title.toUpperCase().includes(keyword.toUpperCase())) {
            console.log(article.title);
           
        }
    });
});

//Fetch public notices https://www.portlandoregon.gov/bds/35625
feed("https://www.portlandoregon.gov/rss.cfm?c=35625", function (err, articles) {
    if (err) throw err;
    var file = '/Users/steveheard/Desktop/foobproj/publicnotices.json'
    jsonfile.writeFile(file, articles, function (err) {
        console.error(err)
    })

    //for each article look and see if the title matches our key word 
    articles.forEach(function (article, index) {
        if (article.title.toUpperCase().includes(keyword.toUpperCase())) {
            console.log(article.title);
        }
    });
});

//Fetch Land Use Grants https://www.portlandoregon.gov/bds/46429
feed("https://www.portlandoregon.gov/rss.cfm?c=46429", function (err, articles) {
    if (err) throw err;
    var file = '/Users/steveheard/Desktop/foobproj/landusegrants.json'
    jsonfile.writeFile(file, articles, function (err) {
        console.error(err)
    })

    //for each article look and see if the title matches our key word 
    articles.forEach(function (article, index) {
        if (article.title.toUpperCase().includes(keyword.toUpperCase())) {
            console.log(article.title);
        }
    });
});

var client = new Client();
var args = {
    data: {},
    headers: { "Accept": "application/json" }
};

// permits for 3969
client.get("https://www.portlandmaps.com/api/permit/?property_id=R316018&format=json&api_key=8E8716FCC3D5BCBB04E1615C41C94479", args, function (data, response) {
    var file = '/Users/steveheard/Desktop/foobproj/3969permits.json'
    jsonfile.writeFile(file, data.results, function (err) {
        console.error(err)
    })

    //details for each permit 
    data.results.forEach(function (permit, index) {
        var permitDetail = "https://www.portlandmaps.com/api/detail.cfm?detail_type=permit&detail_id=" + permit.ivr_number + "&sections=*&format=json&expand=1&api_key=8E8716FCC3D5BCBB04E1615C41C94479"
        var permitClient = new Client();
        permitClient.get(permitDetail, args, function (detailData, response) {
            var file = "/Users/steveheard/Desktop/foobproj/permit" + permit.ivr_number + ".json"
            jsonfile.writeFile(file, detailData, function (err) {
                console.error(err)
            })
        });
    });
});

//permits for back lot
client.get("https://www.portlandmaps.com/api/permit/?property_id=R316028&format=json&api_key=8E8716FCC3D5BCBB04E1615C41C94479", args, function (data, response) {
    console.log(data.total);
    var file = '/Users/steveheard/Desktop/foobproj/3969_backlot_permits.js'
    jsonfile.writeFile(file, data.results, function (err) {
        console.error(err)
    })

    //details for each permit 
    data.results.forEach(function (permit, index) {
        var permitDetail = "https://www.portlandmaps.com/api/detail.cfm?detail_type=permit&detail_id=" + permit.ivr_number + "&sections=*&format=json&expand=1&api_key=8E8716FCC3D5BCBB04E1615C41C94479"
        var permitClient = new Client();
        permitClient.get(permitDetail, args, function (detailData, response) {
            var file = "/Users/steveheard/Desktop/foobproj/permit" + permit.ivr_number + ".json"
            jsonfile.writeFile(file, detailData, function (err) {
                console.error(err)
            })
        });
    });
});

//permits for front lot 
client.get("https://www.portlandmaps.com/api/permit/?property_id=R316019&format=json&api_key=8E8716FCC3D5BCBB04E1615C41C94479", args, function (data, response) {
    var file = '/Users/steveheard/Desktop/foobproj/3969_frontlot_permits.js'
    jsonfile.writeFile(file, data.results, function (err) {
        console.error(err)
    })

    //details for each permit 
    //https://www.portlandmaps.com/api/detail.cfm?detail_type=permit&detail_id=4031072&sections=*&format=json&expand=1&api_key=8E8716FCC3D5BCBB04E1615C41C94479
    data.results.forEach(function (permit, index) {
        var permitDetail = "https://www.portlandmaps.com/api/detail.cfm?detail_type=permit&detail_id=" + permit.ivr_number + "&sections=*&format=json&expand=1&api_key=8E8716FCC3D5BCBB04E1615C41C94479"
        var permitClient = new Client();
        permitClient.get(permitDetail, args, function (detailData, response) {
            var file = "/Users/steveheard/Desktop/foobproj/permit" + permit.ivr_number + ".json"
            jsonfile.writeFile(file, detailData, function (err) {
                console.error(err)
            })
        });
    });
});


//land use notices for all of overlook
var landuse = "https://www.portlandmaps.com/api/landuse/?property_id=R316018&format=json&api_key=8E8716FCC3D5BCBB04E1615C41C94479&neighborhood=Overlook Neighborhood Association"
landuse = encodeURI(landuse);
client.get(landuse, args, function (data, response) {
    var jsonfile = require('jsonfile')
    var file = '/Users/steveheard/Desktop/foobproj/overlookLandUse.json'
    jsonfile.writeFile(file, data.results, function (err) {
        console.error(err)
    })

});


