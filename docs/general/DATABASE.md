# Database

If you decide on MySQL, install the free community edition of [MySQL](https://dev.mysql.com/downloads/mysql/),
and [MySQL Workbench](https://www.mysql.com/products/workbench/).

1. Start MySQL from the System Preferences.
2. Open MySQL Workbench and [create a database](http://stackoverflow.com/questions/5515745/create-a-new-database-with-mysql-workbench)
    called mydatabase but don't create the tables since Python will
    do that for you.
3. Install the MySQL connector for Python, add the DATABASE_URL
    configuration, and create the database and tables.

    > **Note:** You do not need to run `python manage.py db upgrade`
    > or `python manage.py db migrate` if its your first go at it.

```{r, engine='shell', count_lines}
$ sudo pip install mysql-connector-python-rf
$ export DATABASE_URL="mysql+mysqlconnector://username:password@localhost/mydatabase"
$ python manage.py create_db
```

## Database Types

If you're using a different database than mysql, or even if you are using
mysql, you must first export the database url. Here are some examples:

```{r, engine='shell', count_lines}
$ export DATABASE_URL="postgresql://username:password@localhost/mydatabase"

or

$ export DATABASE_URL="mysql+mysqlconnector://username:password@localhost/mydatabase"

or

$ export DATABASE_URL="sqlite:///your.db"
```
