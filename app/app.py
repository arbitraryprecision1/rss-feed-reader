import sqlite3
import requests
from flask import Flask, render_template

app = Flask("app")

def get_rss(params):
    r = requests.get("http://rss-bridge:80/"+params)
    return r.json()['items'][0]

def create_db(cur):
    cur.execute("DROP TABLE IF EXISTS feeds") # remove
    cur.execute("DROP TABLE IF EXISTS posts") # remove

    cur.execute(
        '''
        CREATE TABLE IF NOT EXISTS feeds (
            id INTEGER, 
            name TEXT, 
            params TEXT, 
            latest_retrieval DATETIME,
            PRIMARY KEY (id),
            UNIQUE (params)
        )
        '''
    )
    cur.execute(
        '''
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER, 
            feed_id INTEGER, 
            date_posted DATETIME, 
            title TEXT, 
            url TEXT,
            PRIMARY KEY (id),
            FOREIGN KEY (feed_id) REFERENCES feeds (id),
            UNIQUE (date_posted, url)
        )
        '''
    )

    cur.execute(
        "INSERT INTO feeds VALUES (null,?,?,datetime('now'))", 
        [
            "3b1b", 
            "?action=display&bridge=Youtube&context=By+channel+id&c=UCYO_jab_esuFRV4b17AJtAw&duration_min=&duration_max=&format=Json"
        ]
    )

def write_db(cur):
    # get feeds that need updating
    to_update = cur.execute("SELECT * FROM feeds WHERE latest_retrieval <= datetime('now', '-720 minutes')")



@app.route("/")
def hello_world():
    con = sqlite3.connect("db/data.db")
    cur = con.cursor()
    # init db if not found
    create_db(cur)

    # if last retrieval was >=12h ago then run rssbridge
    # else just return db contents
    write_db(cur)

    rows = cur.execute("select * from feeds")
    return render_template("index.html", name=[i for i in rows], name2=get_rss("?action=display&bridge=Youtube&context=By+channel+id&c=UCYO_jab_esuFRV4b17AJtAw&duration_min=&duration_max=&format=Json"))