import requests
import json
import re
from API_keys import *

import requests_toolbelt.adapters.appengine
requests_toolbelt.adapters.appengine.monkeypatch()

def get_keywords(doc):
    BASE_URL = "https://language.googleapis.com/v1/documents:analyzeEntities"
    doc = " ".join(re.split("[^\x20-\x7F]", doc))
    keys = {
        "key" : GCLOUD_API_KEY
    }

    data = {
        "document" : {
            "type" : "PLAIN_TEXT",
            "language" : "en",
            "content" : doc
        },
        "encodingType" : "NONE"
    }

    headers = {
        "Content-Type" : "application/json"
    }

    r = requests.post(BASE_URL, params=keys, headers=headers, json=data)
    entities = r.json()["entities"]

    keywords = []
    proper_keywords = []
    for entity in entities:
        keywords.append((entity["name"], entity["salience"]))
    return keywords

if __name__ == "__main__":
    string = """ Linear regression is attempting to minimize mean squared error
    Logistic Regression is for classification- minimize cost based on
    conditional log cost function (where we use sigmoid function as hypothesis)
    Difference between logistic loss and cross-entropy loss
    Softmax generalizes to more than 2 categories
    Regularization- ignore outliers/ prevent them from influencing results-
    allows for generality
    Penalize the size of the weights (using L2 or L1 Norm)
    Now minimizing (cost + regularization parameter)
    Ridge Regression- basically "normal equation" solution when using
    regularization
    L1 norm promotes sparsity 
    Decision Trees- series of if then statements lead to leaves that are actual
    "decisions" - categories or values
    Can define a function to grow the tree, stop criteria
    If we're supposed to stop, return a leaf with value, otherwise find split a
    and b on S, then grow tree on left and right
    To find how to split- minimize entropy (so most certainty after split-
    looking at information gain)
    Brute force solution - O(ndk) n data points, d features, k splits
    Problem is that everything is axis aligned lince making decisions based on
    feature, and can also overfit
    To avoid overfitting, should only make a decision for significant gain
    Can prune afterwards, or limit depth of trees
    Also can have random forests- make a bunch of different trees (diversity in
    finding splits)
    Can give different trees different data (with replacement)
    Or different feature sets
    Or bagging - bootstrap aggregating 
    Decides by taking majority vote, taking average, or weighted averages
    Boosting- have a random forest, have a series of weak trees that correct
    what everything before got wrong
    E.g. start by training a normal tree on all the data
    What it gets wrong- up the weight and train a new tree on the new weighted
    dataset
    2 Things keep us from fitting true Function F: bias (can't fit linear model
    to parabola) and variance: fitting to noise not actual data
    Variance of data + noise, = variance of the original data
    Error = bias + variance: so there is a trade-off between the 2
    Underfitting = too much bias, Overfitting = too much variance
    Training error only shows bias (not variance), Test error shows both:
    overfitting
    Want to get class sizes close together (e.g. finding hate speech- not that
    many actual instances) """
    result = get_keywords(string)
    print(result)
