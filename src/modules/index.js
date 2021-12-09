import { createAction, handleActions } from "redux-actions";
import SQLite from "react-native-sqlite-storage";
import fetch from "node-fetch";

SQLite.enablePromise(true);

const DB_SUCCESS = "db/SUCCESS";
const DB_FAIL = "db/FAIL";
const CTF_SELECT = "ctf/SELECT";
const CTF_TOGGLE = "ctf/TOGGLE";

export const dbSuccess = createAction(DB_SUCCESS);
export const dbFail = createAction(DB_FAIL);
export const ctfSelect = createAction(CTF_SELECT);
export const ctfToggle = createAction(CTF_TOGGLE);

export const createDb = () => async (dispatch) => {
  const sqls = [
    `CREATE TABLE 'organizer' (
      'id'    INTEGER  NOT NULL  UNIQUE,
      'name'	TEXT     NOT NULL,
      PRIMARY KEY('id', 'name')
    )`,
    `CREATE TABLE 'event' (
      'oid'             INTEGER  NOT NULL  UNIQUE,
      'onsite'          INTEGER  NOT NULL,
      'finish'          TEXT,
      'description'     TEXT,
      'weight'          REAL     NOT NULL,
      'title'           TEXT,
      'url'             TEXT,
      'is_votable_now'  INTEGER,
      'restrictions'    TEXT,
      'format'          TEXT,
      'start'           TEXT,
      'participants'    NUMERIC,
      'ctftime_url'     TEXT,
      'location'        TEXT,
      'live_feed'       TEXT,
      'public_votable'  INTEGER,
      'duration'        INTEGER  NOT NULL,
      'logo'            TEXT,
      'format_id'       INTEGER  NOT NULL,
      'id'              INTEGER  NOT NULL,
      'ctf_id'          INTEGER  NOT NULL,
      'is_marked'       INTEGER  NOT NULL,
      PRIMARY           KEY('ctf_id'),
      FOREIGN           KEY('oid')
      REFERENCES        'organizer'('id')
    )`,
  ];

  let db;
  try {
    db = await SQLite.openDatabase({ name: "ctf_db" });
    await db.transaction((txn) => {
      sqls.map(async (sql) => {
        await txn.executeSql(
          sql,
          [],
          () => dispatch(dbReady),
          () => {},
        );
      });
    });
  } catch (err) {
    dispatch(dbFail(err.message));
  } finally {
    if (db) {
      await db.close();
    }
  }
};

export const fetchCtf =
  (limit, start = "", finish = "") =>
  async (dispatch) => {
    const uri = `https://ctftime.org/api/v1/events/?limit=${limit}&start=${start}&finish=${finish}`;

    let db;
    try {
      const res = await fetch(uri);
      const ctfs = await res.json();

      db = await SQLite.openDatabase({ name: "ctf_db" });
      await db.transaction((txn) => {
        ctfs.map((ctf, idx) => {
          const sqls = [];

          ctf.organizers.map((organizer) => {
            sqls.push(`INSERT OR IGNORE INTO organizer VALUES(
            ${organizer.id},
            '${organizer.name.replace(/\'/gm, "''")}'
          )`);
          });

          let duration = 0;
          duration += Number(ctf.duration.hours);
          duration += Number(ctf.duration.days) * 12;

          sqls.push(`INSERT OR IGNORE INTO event VALUES(
          ${ctf.organizers[0].id},
          ${ctf.onsite ? 1 : 0},
          '${ctf.finish.replace(/\'/gm, "''")}',
          '${ctf.description.replace(/\'/gm, "''")}',
          ${ctf.weight},
          '${ctf.title.replace(/\'/gm, "''")}',
          '${ctf.url.replace(/\'/gm, "''")}',
          ${ctf.is_votable_now ? 1 : 0},
          '${ctf.restrictions.replace(/\'/gm, "''")}',
          '${ctf.format.replace(/\'/gm, "''")}',
          '${ctf.start.replace(/\'/gm, "''")}',
          ${ctf.participants},
          '${ctf.ctftime_url.replace(/\'/gm, "''")}',
          '${ctf.location.replace(/\'/gm, "''")}',
          '${ctf.live_feed.replace(/\'/gm, "''")}',
          ${ctf.public_votable ? 1 : 0},
          ${duration},
          '${ctf.logo.replace(/\'/gm, "''")}',
          ${ctf.format_id},
          ${ctf.id},
          ${ctf.ctf_id},
          0
        )`);

          sqls.map(async (sql) => {
            await txn.executeSql(
              sql,
              [],
              () => {},
              (err) => console.error(err),
            );
          });
          dispatch(dbSuccess(`INSERT: ${idx}`));
        });
      });
    } catch (err) {
      dispatch(dbFail(err.message));
    } finally {
      if (db) {
        await db.close();
      }
    }
  };

export const selectCtf = () => async (dispatch) => {
  let db;
  try {
    db = await SQLite.openDatabase({ name: "ctf_db" });
    await db.transaction(async (txn) => {
      await txn.executeSql(
        "SELECT * FROM event ORDER BY start, finish",
        [],
        (_, res) => {
          dispatch(ctfSelect(res.rows.raw()));
        },
        (err) => console.error(err),
      );
    });
  } catch (err) {
    dispatch(dbFail(err.message));
  } finally {
    if (db) {
      await db.close();
    }
  }
};

export const toggleCtf = (id, isMark) => async (dispatch) => {
  let db;
  try {
    db = await SQLite.openDatabase({ name: "ctf_db" });
    await db.transaction(async (txn) => {
      await txn.executeSql(
        `UPDATE event SET is_marked=${isMark ? 0 : 1} WHERE id=${id}`,
        [],
        () => dispatch(ctfToggle({ id, isMark })),
        (err) => console.error(err),
      );
    });
  } catch (err) {
    dispatch(dbFail(err.message));
  } finally {
    if (db) {
      await db.close();
    }
  }
};

export default handleActions(
  {
    [DB_SUCCESS]: (state, action) => ({
      ...state,
      response: action.payload,
      isError: false,
    }),
    [DB_FAIL]: (state, action) => ({
      ...state,
      response: action.payload,
      isError: true,
    }),
    [CTF_SELECT]: (state, action) => ({
      ...state,
      ctfs: action.payload,
    }),
    [CTF_TOGGLE]: (state, action) => {
      const { ctfs } = state;
      const idx = ctfs.findIndex((ctf) => ctf.id == action.payload.id);
      const ctf = ctfs[idx];

      ctf.is_marked = action.payload.isMark ? 0 : 1;

      return {
        ...state,
        ctfs: [...ctfs.slice(0, idx), ctf, ...ctfs.slice(idx + 1, ctfs.length)],
      };
    },
  },
  {
    response: "",
    isError: false,
    ctfs: [],
  },
);
