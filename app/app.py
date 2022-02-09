import sqlite3
import requests
import datetime
from flask import Flask, render_template

app = Flask("app")

def get_rss(params):
    r = requests.get("http://rss-bridge:80/"+params)
    return r.json()['items']

def create_db(cur):
    # cur.execute("DROP TABLE IF EXISTS feeds") # remove
    # cur.execute("DROP TABLE IF EXISTS posts") # remove

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

    # cur.execute(
    #     "INSERT INTO feeds VALUES (null,?,?,datetime('now'))", 
    #     [
    #         "3b1b", 
    #         "?action=display&bridge=Youtube&context=By+channel+id&c=UCYO_jab_esuFRV4b17AJtAw&duration_min=&duration_max=&format=Json"
    #     ]
    # )

def write_db(cur):
    # get feeds that need updating
    to_update = cur.execute("SELECT * FROM feeds WHERE latest_retrieval <= datetime('now', '-720 minutes')")



@app.route("/")
def hello_world():
    con = sqlite3.connect("db/data.db")
    cur = con.cursor()
    # init db if not found
    create_db(cur)

    write_db(cur)

    rows = cur.execute("select * from feeds")
    name = [i for i in rows]

    con.commit()
    con.close()
    return render_template("index.html", name=name, name2="test")

@app.route("/<feedname>")
def by_name(feedname):
    con = sqlite3.connect("db/data.db")
    cur = con.cursor()
    
    feeddata = [ i for i in cur.execute("SELECT * FROM feeds WHERE name=?", [feedname]) ]
    
    if len(feeddata) == 0: return "Error: feed '"+feedname+"' not recognised."
    if len(feeddata) > 1: return "Error: feed '"+feedname+"' is duplicated, reset the feeds list."

    # if last retrieval was >=12h ago then run rssbridge and update db
    # else just use db
    # TODO: allow force retrieval elsewhere

    elapsedtime = datetime.datetime.now() - datetime.datetime.strptime(feeddata[0][3], "%Y-%m-%d %H:%M:%S")
    if (elapsedtime.days * 24 * 60 * 60 + elapsedtime.seconds) / 3600 >= 12:

        # TODO: this will fail the unique constraint
        
        data = get_rss(feeddata[0][2])
        for item in data:
            cur.execute("INSERT INTO posts VALUES (null,?,datetime(?),?,?)", [feeddata[0][0], item['date_modified'], item['title'], item['url']])

    posts = [ i for i in cur.execute("SELECT * FROM posts WHERE feed_id=?", [feeddata[0][0]]) ]
    
    con.commit()
    con.close()
    return render_template("feed.html", data=posts)
    return render_template("feed.html", data=get_rss(feeddata[0][2]))