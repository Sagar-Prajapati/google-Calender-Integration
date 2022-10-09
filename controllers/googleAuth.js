
import google from 'googleapis';
import dotenv from 'dotenv';


dotenv.config();

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
];


let newTokenData = {};

export const getAuthClient = () => {
  const clientSecret = process.env.CLIENT_SECRET;
  const clientId = process.env.CLIENT_ID;
  const redirectUris = process.env.REDIRECT_URIS;

  const oAuth2Client = new google.google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUris
  );

  return oAuth2Client;
};


export const googleRedirected = async (req, res) => {
  try {

    const { code, state } = req.query;

    const oAuth2Client = getAuthClient();
    const token = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(token.tokens);



    newTokenData = token.tokens;

    return res.render('googleSucess', {
      pageTitle: 'Success',
      name: state
    });

  } catch (error) {
    console.log(error);
  }
}

export const authGoogle = async (req, res) => {
  try {

    const { name } = req.body;

    const oAuth2Client = getAuthClient();

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      state: name
    });

    return res.redirect(authUrl);
  } catch (error) {
    console.log(error);
  }
}

export const getEvents = async (req, res) => {
  try {

    const oAuth2Client = getAuthClient();

    oAuth2Client.setCredentials(newTokenData);

    const calendar = google.google.calendar({
      version: 'v3',
      auth: oAuth2Client
    });


    let eventData;

    try {

      const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: '2022-10-09T10:44:06.838Z',
        timeMax: '2022-11-09T10:44:06.838Z'
      });

      eventData = response.data.items;

    } catch (error) {
      console.log(error);
    }

    return res.render('eventList', {
      pageTitle: 'Event List',
      eventData: eventData
    });

  } catch (error) {
    console.log(error);
  }
}