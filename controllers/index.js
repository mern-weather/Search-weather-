require("dotenv").config({ path: ".env" });
const WeatherPost = require("../models/weather");
const fetch = require("node-fetch");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const emailTem = require("../emailTempalte");

//===keys===
const geocodingClient = mbxGeocoding({
  accessToken: process.env.map_Box_Token
});
const clientID = process.env.clientId,
  appId = process.env.appId,
  appCode = process.env.appCode;
const yourEmail = process.env.yourEmail;

const options = {
  auth: {
    api_user: process.env.user_Sendgrid,
    api_key: process.env.api_key_Sendgrid
  }
};

var client = nodemailer.createTransport(sgTransport(options));
//=========================

module.exports = {
  weatherGet: (req, res) => {
    WeatherPost.find()
      .limit()
      .sort({ date: -1 })
      .then(postsWeather => res.status(200).json(postsWeather))
      .catch(err =>
        res.status(500).json(err, { err: err }, console.log(err.msg))
      );
  },

  weatherGetId: (req, res) => {
    const id = req.params.id;

    WeatherPost.findById(id)
      .then(
        postsWeather => res.json(postsWeather),
        WeatherPost.findByIdAndUpdate(
          { _id: id },
          { $inc: { views: 1 } },
          (e, a) => {
            console.log(`views count: ${a.views}`);
          }
        )
      )
      .catch(err =>
        res
          .status(404)
          .json({ nopostsfound: "No posts found" }, console.log(err))
      );
  },

  weatherPost: (req, res) => {
    const { city, email } = req.body.user;

    const urls = [
      `https://api.unsplash.com/search/photos/?page=3&per_page=6&orientation=portrait&query=${city}&client_id=${clientID}`,

      `https://weather.api.here.com/weather/1.0/report.json?app_id=${appId}&app_code=${appCode}&product=observation&name=${city}`,

      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${city}&format=json`
    ];

    //=====================================
    Promise.all(urls.map(url => fetch(url).then(res => res.json()))).then(
      ([api_1, api_2, api_3]) => {
        const displayImages = [];
        const errorImage = [];
        if (api_1.total === 0 || api_1.results === []) {
          errorImage.push(
            "https://elaw.org/sites/default/files/default_images/noimage.jpg"
          );
        } else {
          for (let i = 0; i < api_1.results.length; i++) {
            displayImages.push(api_1.results[i].urls.small);
          }
        }

        const wiki = {
          info: api_3[2]
        };

        const { info } = wiki;

        const displayWeather = {
          temperature: Math.round(
            api_2.observations.location[0].observation[0].temperature
          ),
          city: api_2.observations.location[0].city,
          description:
            api_2.observations.location[0].observation[0].description,
          iconLink: api_2.observations.location[0].observation[0].iconLink,
          lat: parseInt(api_2.observations.location[0].observation[0].latitude),
          long: parseInt(
            api_2.observations.location[0].observation[0].longitude
          )
        };

        const { temperature, city, description, iconLink } = displayWeather;

        geocodingClient
          .forwardGeocode({
            query: city,
            limit: 1
          })
          .send()
          .then(response => {
            const match = response.body;
            const coordinates = match.features[0].geometry.coordinates;
            const newWeather = {
              displayImages,
              errorImage,
              temperature,
              description,
              iconLink,
              info,
              city,
              coordinates,
              email
            };

            const images = displayImages.map(item => {
              return `<img src=${item} alt="Smiley face" height="300" width="300"></img>`;
            });

            console.log(displayImages);
            let user_email = {
              to: `${email}`,
              from: `${yourEmail}`,
              subject: "Hi there",
              text: "Weather App",
              html: emailTem.emailTemplateHtml(
                city,
                images,
                iconLink,
                info,
                displayImages
              )
            };

            //=====================================
            //Sedgrid

            client.sendMail(user_email, function(err, res) {
              if (err) {
                console.error(err);
              } else {
                console.log(res);
              }
            });

            WeatherPost.create(newWeather)
              .then(newCreatedWeather => {
                res.json(newCreatedWeather);
              })
              .catch(err => {
                res.status(404).json({ notfound: "No post found(weather)" });
                console.log(err);
              });
          });
      }
    );
  }
};

// WeatherPost.findByIdAndUpdate(
//   { _id: "5cb2af461c288d605089b1d7" },
//   { $inc: { views: 1 } }
// )
//   .then(allData => {
//     console.log(allData);
//   })
//   .catch(err => {
//     console.log(err);
//   });
