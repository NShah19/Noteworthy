# [START app]
# [START imports]
import logging
import json
from flask import Flask, render_template, request, jsonify
import google.appengine
from google.appengine.api import search

from index import Index
from Query import *

import keywords
# [END imports]

# [START create_app]
app = Flask(__name__)
# [END create_app]

index = Index()

# PRODUCTION ROUTES
@app.route('/')
def root():
    return "Server Up!"

"""
JSON structure
{
    "doc_name": "NAME",
    "doc_id": "ID",
    "doc_date": "date-string",
    "doc_text": "LONG TEXT"
}
"""
@app.route('/index', methods=["POST"])
def index_doc():
    global index

    content = request.get_json()
    print(content)

    index.insert_document(content['doc_id'], content['doc_name'], 
            content['doc_date'], content['doc_text'])
    return "JSON PARSED"

# Each query is one line
@app.route('/query', methods=["POST"])
def query():
    global index
    line = request.get_json()['line']
    print(line, type(line))

    annotation = search_line(line, index)
    return jsonify(annotation = annotation)


# TESTING ROUTES

@app.route('/test', methods=["GET"])
def test_doc():
    global index

    doc_id = request.args.get('id')
    index.test(doc_id)
    
    return "TEST PASSED"
    # return keywords.test_sent()

@app.route('/setup', methods=["GET"])
def setup():
    global index

    with open('test.json', 'r') as f:
        data = json.load(f)

    for doc in data["docs"]:
        index.insert_document(doc['doc_id'], doc['doc_name'], doc['doc_date'],
                doc['doc_text'])
    return "SETUP COMPLETE"

@app.route('/language', methods=["GET"])
def language():
    keywords.language()

@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500
# [END app]
if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
