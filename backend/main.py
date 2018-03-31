# [START app]
# [START imports]
import logging
from flask import Flask, render_template, request
# [END imports]

# [START create_app]
app = Flask(__name__)
# [END create_app]

@app.route('/')
def root():
    return "Server Up!"

"""
JSON structure
{
    "name": "NAME",
    "doc_id": "ID",
    "date": "date-string",
    "full_text": "LONG TEXT"
}
"""
@app.route('/index', methods=["POST"])
def index_doc():
    pass

@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500
# [END app]
