from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dev.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)


class User(db.Model):
	__tablename__ = 'user'

	id = db.Column(db.Integer(), primary_key = True)
	username = db.Column(db.String(255), unique = True)
	password = db.Column(db.String(255))

	def __init__(self, username, password):
		self.username = username
		self.active = True
		self.password = generate_password_hash(password)

	def __repr__(self):
		return '{} {}'.format(self.username, self.password)


# Create db and tables.
db.create_all()

# Insert a User in the user table
# NOTE: If a DB already exists with users, if a username is not unique an error will be thrown.
db.session.add(User(username = 'test@test.test', password = 'test'))
db.session.add(User(username = 'test', password = 'test'))

# Save
db.session.commit()



# Print DB contents.
count = User.query.count()
result = User.query.all()

data = []

for user in result:
	data.append([user.username, user.password])

# Padding
id_column_width = len(str(count)) + 1
first_column_width = id_column_width + 2

username_column_width = max(len(user[0]) for user in data)
second_column_width = username_column_width + 2

password_column_width = max(len(user[1]) for user in data)
third_column_width = password_column_width + 2

# Printing
## Header
print('|{}|{}|{}|'.format('-' * first_column_width, '-' * second_column_width, '-' * third_column_width))
print('| {} | {} | {} |'.format('ID'.ljust(id_column_width), 'Username'.ljust(username_column_width), 'Password'.ljust(password_column_width)))
print('|{}|{}|{}|'.format('-' * first_column_width, '-' * second_column_width, '-' * third_column_width))

## Body
id = 0

for user in data:
	print('| {} | {} | {} |'.format(str(id).ljust(id_column_width), user[0].ljust(username_column_width), user[1].ljust(username_column_width)))
	id = id + 1

## Footer
print('|{}|{}|{}|'.format('-' * first_column_width, '-' * second_column_width, '-' * third_column_width))

