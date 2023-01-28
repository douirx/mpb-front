# == MARIA-DB ==
import mariadb
import json
import os

from config.io import pconfig,readTxt

config=readTxt(os.path.join(pconfig,"database1.txt"))

#Get a List
def fetchList(sql):
    conn = mariadb.connect(**config)
    cur = conn.cursor()
    cur.execute(sql)
    row_headers = [x[0] for x in cur.description]
    rv = cur.fetchall()
    if cur.rowcount==0:
        L=[]
        return L
    else:
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))
        return json.dumps(json_data,indent=4, sort_keys=True, default=str)

#Post a request
def postVariable(sql):
    conn = mariadb.connect(**config)
    cur = conn.cursor()
    conn.autocommit = False
    cur.execute(sql)
    conn.commit()