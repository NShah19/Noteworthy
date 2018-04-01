import requests
from API_keys import *

import requests_toolbelt.adapters.appengine
requests_toolbelt.adapters.appengine.monkeypatch()

# Uses YT to search Khan Academy
def search_KA(query):
    BASE_URL = "https://www.googleapis.com/youtube/v3/search"
    keys = {
        "part": "snippet",
        "q": "Khan Academy " + query,
        "type": "video",
        "key": GCLOUD_API_KEY
    }
    
    r = requests.get(BASE_URL, params=keys)

    video = r.json()["items"][0]
    return video
