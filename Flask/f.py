import boto3
import movie, caption
import AWSs3
#from .m_config import AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY
#from .m_config import AWS_S3_BUCKET_NAME, AWS_S3_BUCKET_REGION
from flask import Flask, request, jsonify, send_file, render_template
from werkzeug.utils import secure_filename
from moviepy.editor import *
from flask_cors import CORS
import cv2

app = Flask(__name__)
CORS(app, supports_credentials=True)

# def s3_connection():
#   try:
#     s3 = boto3.client(
#       service_name="s3",
#       region_name="ap-northeast-2",
#       aws_access_key_id='',
#       aws_secret_access_key=''
#     )
#   except Exception as e:
#     print(e)
#   else:
#     print("s3 bucket connected!")
#     return s3

s3 = AWSs3.s3_connection()

# def s3_put_video(s3, bucket, file, filename):
#   try:
#     s3.put_object(
#       Body=file,
#       Bucket=bucket,
#       Key=f'videos/{filename}',
#       ContentType=file.content_type,
#       ACL='public-read',
#     )
#   except Exception as e:
#     return False
#   return True

# def s3_get_gif_url(filename):
#   return f"https://penterest.s3.ap-northeast-2.amazonaws.com/gifs/{filename}"
 

path = 'C:/Users/hufs0/OneDrive/바탕 화면/moviepy/frontEnd/'
@app.route("/upload", methods=['GET', 'POST'])
def upload_file():
  if request.method == 'POST':
    file = request.files['file']
    start = int(request.form['start'])
    end = int(request.form['end'])
    speed = bool(request.form['speed'])
    print(start, end)
    print(speed)
    print(file)
    title = file.filename
    AWSs3.s3_put_video(s3, 'penterest', file, title)
    movie.make(title, start, end, speed)
    caption_txt = caption.inference(title, "COCO")
    print(caption_txt)
    
    return jsonify([caption_txt, AWSs3.s3_get_gif_url(title.replace("mp4","gif"))])
    #return jsonify(['hi', 'hello'])

if __name__ == '__main__':
  app.run(host="0.0.0.0", port="5000", debug=True)
