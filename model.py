"""""
 * * * * * * * * * *
 * Filename:    model.py
 *
 * Purpose:     Queries the auth database for the DFN Maintenance GUI
 *
 * Copyright:   2017 Fireballs in the Sky, all rights reserved
 *
 * * * * * * * * * *
"""""
import sqlite3
import hashlib

def loginAuth(username, password):
    """
    Checks whether login credentials are correct according to the database.
    
    Args:
        username (str): The input username.
        password (str): The input password.

    Returns:
        auth (bool): Format::
        
            True -- Authorized.
            False -- Unauthorized / invalid credentials.
    """
    auth = False

    # Connect to database
    authdb = sqlite3.connect('db/auth.db')
    curs = authdb.cursor()

    # Get salt
    curs.execute("SELECT salt FROM Authdata WHERE username =?", (username,))

    salt = curs.fetchone()

    # Hash entered PW with salt
    if salt is not None:
        hashedpw = hashlib.sha1(salt[0] + password).hexdigest()
    else:
        hashedpw = ' '

    # Query database
    dataarray = (username, hashedpw)
    check = curs.execute("SELECT * FROM Authdata WHERE username=? AND password=?", dataarray)

    # If query returned a result, return true. Otherwise, return false.
    if check.fetchone():
        auth = True

    return auth

