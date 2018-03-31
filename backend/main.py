# [START app]
# [START imports]
import logging
from flask import Flask, render_template, request
from google.appengine.api import search

from index import Index
# import keywords
# [END imports]

# [START create_app]
app = Flask(__name__)
# [END create_app]

index = Index()

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

@app.route('/test', methods=["GET"])
def test_doc():
    global index

    doc_id = request.args.get('id')
    index.test(doc_id)
    
    return "TEST PASSED"
    # return keywords.test_sent()

@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500
# [END app]
