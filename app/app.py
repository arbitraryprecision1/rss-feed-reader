from cgitb import handler
import sqlite3
import http.server
import socketserver
from functools import partial

con = sqlite3.connect("db/data.db")

cur = con.cursor()

for row in cur.execute("select * from test"):
    print(row)
    
print("ok")

PORT = 8000

Handler = partial(http.server.SimpleHTTPRequestHandler, directory="web")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()