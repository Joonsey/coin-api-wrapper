from datetime import datetime, time
import sqlite3, random, string

conn = sqlite3.connect('cache.db')

c = conn.cursor()
"""
Making a database to cache the data for future use and to prevent frequent requests.

Can also be used to perform analysis and interesting statistical comparison.
"""

def createDB():
    with conn:
        try:
            c.execute("""CREATE TABLE rate (
                time_open text
                open integer, 
                high integer,
                low integer,
                close integer
                volume_traded integer,
                trades_count integer,
                change integer)""")

        except:
            print('database already exists.')

def insertRate(time_open, open, high, low, close, volume_traded, trades_count, change):
    with conn:

        if time_open[-3] != "T":
            time_open = time_open[0:13]
        try:
            c.execute("""INSERT INTO rates VALUES (
                :time_open,
                :open, 
                :high, 
                :low, 
                :close, 
                :volume_traded,
                :trades_count,
                :change)""", 
            {
                "time_open":time_open,   
                "open":open, 
                "high":high,
                "low":low,
                "close":close,
                "volume_traded":volume_traded,
                "trades_count":trades_count,
                "change":change})
        except ValueError:
            print("Insertion of rate failed, ticket either already exists or input is invalid.")
            raise
    return time_open

def fetchRate(time_open):
    with conn:
        try:
            c.execute("""
            SELECT * FROM rate WHERE time_open=:time_open
            """, {'time_open':time_open})
            return c.fetchall()
        except:
            print('entry does not exists or id is out of range.')
            return 0


