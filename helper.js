const fs = require('fs');
const doc = './vestigingen2020.xml';
const parser = require('xml2json');


module.exports = {
    querySavedData: function (res) {
        fs.readFile(doc, function (err, data) {
            var json = JSON.parse(parser.toJson(data, { reversible: true }));
            var arr = [];
            var winkel = json["Winkels"]["Winkel"];

            console.log("Winkel Count: " + winkel.length);

            for (var i = 0; i < winkel.length; i++) {

                var street = JSON.stringify(winkel[i]["Bezoekadres"]["Straat"]);
                var huisnummer = JSON.stringify(winkel[i]["Bezoekadres"]["Huisnummer"]);
                var combined = street + " " + huisnummer;

                var adres = {
                    street: combined
                };

                arr.push(adres);
                arr.push(winkel[i]["Openingstijden"]);

            };
            res.send(arr);
        });
    },
    receiveXml: function (req, res) {
        var finalXml = req.rawBody;

        fs.writeFile(doc, finalXml, function (err) {
            if (err) {
                console.log("error has occurred")
            } else {
                console.log("Xml file successfully updated.")
            }
        });

        res.json({ status: "success", message: doc + " updated successfully" });
    }
};
