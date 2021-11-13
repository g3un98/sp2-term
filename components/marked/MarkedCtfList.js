import * as React from 'react';
import { ScrollView } from 'react-native';
import MarkedCtfCard from './MarkedCtfCard';

const markedCtfs = [
  {
    "organizers": [
      {
        "id": 163107,
        "name": "Security Research Summit (SRS)"
      }
    ],
    "onsite": false,
    "finish": "2021-11-15T16:00:00+00:00",
    "description": "The CTF competition hosted by Intent. The Security Research Summit.\r\nFor researchers. By researchers.",
    "weight": 0.00,
    "title": "Intent CTF 2021",
    "url": "https://ctf.intentsummit.org/",
    "is_votable_now": false,
    "restrictions": "Open",
    "format": "Jeopardy",
    "start": "2021-11-13T16:00:00+00:00",
    "participants": 37,
    "ctftime_url": "https://ctftime.org/event/1454/",
    "location": "",
    "live_feed": "https://ctftime.org/live/1454/",
    "public_votable": true,
    "duration": {"hours": 0, "days": 2},
    "logo": "https://ctftime.org//media/events/intent_i.png",
    "format_id": 1,
    "id": 1454,
    "ctf_id": 672
  },
  {"organizers": [{"id": 30003, "name": "SPbCTF"}], "onsite": false, "finish": "2021-11-14T18:00:00+00:00", "description": "Student CTF is a novice-level Capture The Flag organized by SPbCTF and supported by St. Petersburg Committee for Science and Higher Education.\r\n\r\nFree-to-play track is open to everyone, and Official track is for teams of 5 students in Saint Petersburg.\r\nBoth tracks are Jeopardy quals and Attack-Defense final round\u2014in separate scoreboards.\r\n\r\nFree-to-play track scoreboard will be uploaded to CTFtime.\r\n", "weight": 25.00, "title": "SPbCTF's Student CTF 2021 Finals", "url": "https://student.ctf.su/", "is_votable_now": false, "restrictions": "Prequalified", "format": "Attack-Defense", "start": "2021-11-14T09:00:00+00:00", "participants": 0, "ctftime_url": "https://ctftime.org/event/1379/", "location": "", "live_feed": "", "public_votable": true, "duration": {"hours": 9, "days": 0}, "logo": "https://ctftime.org//media/events/studentctf2021_1.jpg", "format_id": 2, "id": 1379, "ctf_id": 556},
  {"organizers": [{"id": 19208, "name": "Nu1L"}], "onsite": false, "finish": "2021-11-22T00:00:00+00:00", "description": "N1CTF is a 48-hour jeopardy style CTF held by members of Nu1L.", "weight": 53.54, "title": "N1CTF 2021", "url": "https://ctf2021.nu1l.com/", "is_votable_now": false, "restrictions": "Open", "format": "Jeopardy", "start": "2021-11-20T00:00:00+00:00", "participants": 43, "ctftime_url": "https://ctftime.org/event/1367/", "location": "", "live_feed": "", "public_votable": true, "duration": {"hours": 0, "days": 2}, "logo": "", "format_id": 1, "id": 1367, "ctf_id": 240},
  {"organizers": [{"id": 16978, "name": "Balsn"}], "onsite": false, "finish": "2021-11-22T02:00:00+00:00", "description": "Registration: TBD\r\nOrganizers: Balsn (https://balsn.tw/)\r\nTwitter: @balsnctf (https://twitter.com/balsnctf)", "weight": 37.00, "title": "Balsn CTF 2021", "url": "https://balsn.tw/", "is_votable_now": false, "restrictions": "Open", "format": "Jeopardy", "start": "2021-11-20T02:00:00+00:00", "participants": 34, "ctftime_url": "https://ctftime.org/event/1376/", "location": "", "live_feed": "", "public_votable": true, "duration": {"hours": 0, "days": 2}, "logo": "https://ctftime.org//media/events/circle.400dpi_2.png", "format_id": 1, "id": 1376, "ctf_id": 318},
  {"organizers": [{"id": 104940, "name": "ACISO"}], "onsite": false, "finish": "2021-11-21T09:00:00+00:00", "description": "CTF Russian Cup 2021 Quals event. Russian academic teams only.", "weight": 0, "title": "CTF Russian Cup 2021", "url": "https://aciso.timepad.ru/event/1814641/", "is_votable_now": false, "restrictions": "Academic", "format": "Jeopardy", "start": "2021-11-20T09:00:00+00:00", "participants": 8, "ctftime_url": "https://ctftime.org/event/1479/", "location": "", "live_feed": "", "public_votable": false, "duration": {"hours": 0, "days": 1}, "logo": "https://ctftime.org//media/events/cup.jpg", "format_id": 1, "id": 1479, "ctf_id": 229},
]

const MarkedCtfList = ({ navigation }) => {
  return (
    <ScrollView>
      {markedCtfs.map(markedCtf => (
        <MarkedCtfCard key={markedCtf.id} {...markedCtf} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

export default MarkedCtfList;
