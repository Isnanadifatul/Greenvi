import pandas as pd
from flask import Flask, request, jsonify
import pandas as pd
import pymysql
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

def get_data_from_sql():
    pass


def recommendation_new_product(product, top_n = 5):
    product_vector = vectorizer.transform([product])
    similarity_scores = cosine_similarity(product_vector, tfid_matrix).flatten()
    top_indices = similarity_scores.argsort()[::-1][:top_n]
    recommendded_product = df.loc[top_indices, ['nama_product', 'id_product', 'category', 'id_category','harga', 'deskripsi', 'new_description']].values 
    return recommendded_product



df = pd.read_csv('Capstone Dataset - product.csv')
df = df.drop('Unnamed: 0', axis=1)
df = df.drop('Unnamed: 7', axis=1)
df = df.drop('Unnamed: 8', axis=1)
df = df.drop('Unnamed: 9', axis=1)
df = df.drop('Unnamed: 10', axis=1)
df = df.drop('Unnamed: 11', axis=1)
df = df.drop('Unnamed: 12', axis=1)
df = df.drop('Unnamed: 13', axis=1) 

df['new_description'] = df['category'] + " " + df['deskripsi']


vectorizer = TfidfVectorizer()
tfid_matrix = vectorizer.fit_transform(df['new_description'])
    
@app.route("/")
def home():
    return "tes"

# Route untuk menerima aktivitas input dan memberikan rekomendasi


@app.route('/recommend', methods=['GET'])
def get_recommendations():
    input_activity = request.args.get('activity')
    recommended_activities = recommendation_new_product(input_activity)
    recommendations = []
    for activity in recommended_activities:
        recommendations.append({
            'nama_product': activity[0],
            'id_product': activity[1],
            'category': activity[2],
            'id_category' : activity[3],
            'harga': activity[4],
            'deskripsi' : activity[5],
        })
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
    