from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=True, default=False)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }
    
class Anime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    info = db.Column(db.String)
    year = db.Column(db.String)
    genre = db.Column(db.String)
    streaming = db.Column(db.String)
    

    def serialize_name(self):
        return {
            "id": self.id,
            "name": self.name,
        }   
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "info": self.info,
            "year": self.birth_year,
            "genre": self.eye_color,
            "streaming": self.hair_color,
        }

class Manga(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    info = db.Column(db.String)
    year = db.Column(db.String)
    genre = db.Column(db.String)
    streaming = db.Column(db.String)
    

    def serialize_name(self):
        return {
            "id": self.id,
            "name": self.name,
        }   
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "info": self.info,
            "year": self.birth_year,
            "genre": self.eye_color,
            "streaming": self.hair_color,
        }
    
class FavoriteAnime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    anime_id = db.Column(db.Integer, db.ForeignKey(Anime.id))

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user_id,
            "anime": self.people_id,
        }
    
class FavoriteManga(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    manga_id = db.Column(db.Integer, db.ForeignKey(Manga.id))

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user_id,
            "manga": self.people_id,
        }