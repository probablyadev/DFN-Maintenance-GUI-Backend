# Running

The following instructions require a seperate terminal instance for
running the back-end and the front-end at the same time.

If you haven't setup the database connection before now, complete the
[database](#database) section first and return back here when you're done.

## Run Back-End

```{r, engine='shell', count_lines}
$ python manage.py runserver
```

If all goes well, you should see:

```{r, engine='shell', count_lines}
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

## Run Front-End

```{r, engine='shell', count_lines}
$ cd frontend
$ npm start
```

Open your browser to http://localhost:3000/ and the maintenance GUI
should appear, from here you can log in using your account and
continue without errors (hopefully).
