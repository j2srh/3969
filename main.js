
var keyword = "richmond";
var feed = require("feed-read-parser");

/// Fetch "Pre-Application Conferences" https://www.portlandoregon.gov/bds/47126
feed("https://www.portlandoregon.gov/rss.cfm?c=47126", function (err, articles) {
    if (err) throw err;

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

    //for each article look and see if the title matches our key word 
    articles.forEach(function (article, index) {
        if (article.title.toUpperCase().includes(keyword.toUpperCase())) {
            console.log(article.title);
        }
    });


});

var permitDetail = { "status": "success", "general": [{ "permit": "Early Assistance", "application_number": "2017-144628-000-00-EA", "type": "PC - PreApplication Conference", "work": null, "status": "Completed", "last_action": "May, 12 2017 09:14:16", "ivr_number": 3990834, "address": "3969 N OVERLOOK TER" }, { "permit": "Code Compliance", "application_number": "2015-233559-000-00-CC", "type": "Zoning", "work": null, "status": "Under Inspection", "last_action": "September, 24 2015 15:09:10", "ivr_number": 3697216, "address": "3969 N OVERLOOK TER" }, { "permit": "Plumbing Permit", "application_number": "2006-163197-000-00-PT", "type": "Residential 1 & 2 Family", "work": "Addition/Alteration/Replacement", "status": "Final", "last_action": "September, 28 2006 11:22:18", "ivr_number": 2604131, "address": "3969 N OVERLOOK TER" }] };
for (var permit in permitDetail.general) {
    console.log("key:" + permit + ", value:" + permitDetail.general[permit].address);
}


//Example POST method invocation 
var Client = require('node-rest-client').Client;

var client = new Client();
var jsonfile = require('jsonfile')

// set content-type header and data as json in args parameter 
var args = {
    data: {},
    headers: { "Accept": "application/json" }
};

// permits for 3969
client.get("https://www.portlandmaps.com/api/permit/?property_id=R316018&format=json&api_key=8E8716FCC3D5BCBB04E1615C41C94479", args, function (data, response) {
    console.log(data.total);
    var file = '/Users/steveheard/Desktop/foobproj/3969permits.js'
    jsonfile.writeFile(file, data.results, function (err) {
        console.error(err)
    })

    //details for each permit 
    //https://www.portlandmaps.com/api/detail.cfm?detail_type=permit&detail_id=4031072&sections=*&format=json&expand=1&api_key=8E8716FCC3D5BCBB04E1615C41C94479
    data.results.forEach(function (permit, index) {
        console.log(permit.ivr_number);
        var permitDetail = "https://www.portlandmaps.com/api/detail.cfm?detail_type=permit&detail_id=" + permit.ivr_number + "&sections=*&format=json&expand=1&api_key=8E8716FCC3D5BCBB04E1615C41C94479"
        var permitClient = new Client();
        permitClient.get(permitDetail, args, function (detailData, response) {
            console.log("xxxx:"+permit.ivr_number);
            var file = "/Users/steveheard/Desktop/foobproj/permit" + permit.ivr_number + ".js"
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
});

//permits for front lot 
client.get("https://www.portlandmaps.com/api/permit/?property_id=R316019&format=json&api_key=8E8716FCC3D5BCBB04E1615C41C94479", args, function (data, response) {
    console.log(data.total);
    var file = '/Users/steveheard/Desktop/foobproj/3969_frontlot_permits.js'
    jsonfile.writeFile(file, data.results, function (err) {
        console.error(err)
    })
});


var landuse = "https://www.portlandmaps.com/api/landuse/?property_id=R316018&format=json&api_key=8E8716FCC3D5BCBB04E1615C41C94479&neighborhood=Overlook Neighborhood Association"
landuse = encodeURI(landuse);
client.get(landuse, args, function (data, response) {
    // parsed response body as js object 
    console.log(data.total);

    var jsonfile = require('jsonfile')
    var file = '/Users/steveheard/Desktop/foobproj/overlookLandUse.js'

    jsonfile.writeFile(file, data.results, function (err) {
        console.error(err)
    })

});


//neighborhood:Overlook Neighborhood Association
