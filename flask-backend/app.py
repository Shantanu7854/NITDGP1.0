from flask import Flask, request, jsonify
import tensorflow as tf
from keras.models import load_model 
from PIL import Image, ImageOps 
import numpy as np
import os

import openai
chat_log=[]

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'upload'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg'}



def classify_image(image_path):

    model = load_model("keras_Model.h5", compile=False)
    class_names = open("labels.txt", "r").readlines()
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

    image = Image.open(image_path).convert("RGB")

    size = (224, 224)
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)

    image_array = np.asarray(image)

    normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1

    data[0] = normalized_image_array

    # Predicts the model
    prediction = model.predict(data)
    index = np.argmax(prediction)
    class_name = class_names[index]
    confidence_score = prediction[0][index]

    # return class_name
    return class_name[2:-1]



    # Function to send a message to the chatbot and get a response
def send_message(chat_log, message, prompt_for_image=""):
    # Append the user's message to the chat log
    openai.api_key = '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'
    

    system_prompt = f"""
    You are a general physician and you will help people with queries about their health.\
    You will ask for any problems and symptoms.\
    You can also take a look at their x-ray,CT and MRI scans so you should inform the user if you need to get proper diagnosis.\
    Answer the customer in a friendly tone.
    You will keep gathering more information by asking if are any more symptoms they are experincing.\
    Don't write long senstences.
    Lastly you will create a list of symptoms.
    You will also recommend OTC drugs permmitted by Indian goverment if required with popular brand names such as calpol 650 for fever.
    {prompt_for_image}
    Use the following format:
    <response to user>

    when the user says they have told all they want The response to user also includes probable prognosis based on the symptoms.
    Use the following format:
    Symptoms: <symptoms provided by the user in a list>
    <response to user>
    """

    chat_log.append({'role': 'user', 'content': message})

    chat_log.append({'role': 'system', 'content': system_prompt})

    # Get the response from the chatbot using the current chat log for context
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=chat_log
    )

    # Append the chatbot's response to the chat log
    chat_log.append({'role': 'assistant', 'content': response.choices[0].message['content']})

    # Return the chatbot's response content
    return response.choices[0].message['content']




@app.route('/upload', methods=['POST'])
def chat_with_gpt():


    image_file = request.files['file']

    prompt = request.form.get("prompt")

    if image_file.filename == '':
        response = send_message(chat_log, prompt)
        return jsonify(response)
        
    else:
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_file.filename)
        image_file.save(image_path)
        z = classify_image(image_path)
        image_prompt = f"from image uploaded, we found that you have {z}"
        response = send_message(chat_log, prompt, image_prompt)
        return jsonify(response)

        




if __name__ == '__main__':
    app.run(host="0.0.0.0")
