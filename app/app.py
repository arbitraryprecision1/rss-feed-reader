import sqlite3
import requests
import datetime
import traceback
import sys
from flask import Flask, render_template, request

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
            name TEXT NOT NULL, 
            params TEXT NOT NULL, 
            latest_retrieval DATETIME NOT NULL,
            PRIMARY KEY (id),
            UNIQUE (params) ON CONFLICT IGNORE
        )
        '''
    )
    cur.execute(
        '''
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER, 
            feed_id INTEGER, 
            date_posted DATETIME NOT NULL, 
            title TEXT NOT NULL, 
            url TEXT NOT NULL,
            is_read INTEGER DEFAULT 0 NOT NULL,
            is_bookmarked INTEGER DEFAULT 0 NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (feed_id) REFERENCES feeds (id),
            UNIQUE (date_posted, url) ON CONFLICT IGNORE,
            CHECK (is_read IN (0,1)),
            CHECK (is_bookmarked IN (0,1))
        )
        '''
    )
    # temp for updating existing table instead of creating new table
    # cur.execute(
    #     '''
    #     ALTER TABLE posts ADD COLUMN is_read INTEGER DEFAULT 0 NOT NULL CHECK (is_read IN (0,1))
    #     '''
    # )
    # cur.execute(
    #     '''
    #     ALTER TABLE posts ADD COLUMN is_bookmarked INTEGER DEFAULT 0 NOT NULL CHECK (is_bookmarked IN (0,1))
    #     '''
    # )

    # cur.execute(
    #     "INSERT INTO feeds VALUES (null,?,?,datetime('now'))", 
    #     [
    #         "3b1b", 
    #         "?action=display&bridge=Youtube&context=By+channel+id&c=UCYO_jab_esuFRV4b17AJtAw&duration_min=&duration_max=&format=Json"
    #     ]
    # )


@app.route("/")
def hello_world():
    con = sqlite3.connect("db/data.db")
    cur = con.cursor()
    # init db if not found
    create_db(cur)
    
    need_updating = [i for i in cur.execute("select name from feeds where latest_retrieval <= datetime('now', '-720 minutes')")]
    posts = [i for i in cur.execute(
        "select posts.id,posts.feed_id,posts.date_posted,posts.title,posts.url,posts.is_read,posts.is_bookmarked,feeds.name " + 
        "from posts join feeds on posts.feed_id = feeds.id order by date_posted desc"
    )]

    con.commit()
    con.close()
    return render_template("index.html", posts=posts, updates=need_updating)

@app.route("/<feedname>")
def by_name(feedname):
    con = sqlite3.connect("db/data.db")
    cur = con.cursor()
    
    feeddata = [ i for i in cur.execute("SELECT * FROM feeds WHERE name=?", [feedname]) ]
    
    if len(feeddata) == 0: return "Error: feed '"+feedname+"' not recognised."
    if len(feeddata) > 1: return "Error: feed '"+feedname+"' is duplicated, reset the feeds list."

    # if last retrieval was >=12h ago or forceupdate set to true then run rssbridge and update db
    # else just use db
    if (request.args.get('forceupdate', default='false') == 'true'
        or [i for i in cur.execute("SELECT datetime(?) <= datetime('now', '-720 minutes')", [feeddata[0][3]])][0][0] == 1):

        # TODO: this will fail the unique constraint
        data = get_rss(feeddata[0][2])
        for item in data:
            # handle issues from the rss query
            # TODO: some hackernews posts do not link to an article so have no 'url' param, in this case 
            #       should link to the comments?
            try:
                queryparams = [feeddata[0][0], item['date_modified'], item['title'], item['url']]
            except KeyError as e:
                print(e, file=sys.stderr)
                print(traceback.format_exc(), file=sys.stderr)
                print(item, file=sys.stderr)
                break

            # handle issues from the db
            try:
                cur.execute("INSERT INTO posts VALUES (null,?,datetime(?),?,?,0,0)", queryparams)
            except sqlite3.Error as e:
                print(e, file=sys.stderr)
                print(traceback.format_exc(), file=sys.stderr)
                print(queryparams, file=sys.stderr)
                break


        # update the latest_retrieval for this feed
        cur.execute("UPDATE feeds SET latest_retrieval = datetime('now') WHERE id=?", [feeddata[0][0]])

    posts = [ i for i in cur.execute("SELECT * FROM posts WHERE feed_id=? order by date_posted desc", [feeddata[0][0]]) ]
    
    con.commit()
    con.close()
    return render_template("feed.html", data=posts)

@app.route("/feeds", methods=["GET", "POST"])
def feeds():
    con = sqlite3.connect("db/data.db")
    cur = con.cursor()

    if request.method == "GET":
        return render_template("feeds.html", data=[ i for i in cur.execute("SELECT * FROM feeds") ])
    
    else:
        cur.execute("INSERT INTO feeds VALUES (null,?,?,datetime(0))", [request.form['feedname'], request.form['feedparams']])

        con.commit()
        con.close()
        return(str(request.form))

@app.route("/api/setpostread")
def setPostRead():
    con = sqlite3.connect("db/data.db")
    cur = con.cursor()
    
    cur.execute("UPDATE posts SET is_read = 1 WHERE id=?", [request.args.get('postid')])

    con.commit()
    con.close()
    return "ok"