import requests
from API_keys import *

# Uses YT to search Khan Academy
BASE_URL = "https://www.googleapis.com/youtube/v3/search"
def search_KA(query):
    keys = {
        "part": "snippet",
        "q": "Khan Academy " + query,
        "type": "video",
        "key": GCLOUD_API_KEY
    }
    
    r = requests.get(BASE_URL, params=keys)

    video = r.json()["items"][0]
    return video
