import re
import csv
from google.appengine.api import search


THRESHOLD = 0
STOPWORDS = []
with open("Stopwords.csv", "rb") as f:
    reader = csv.reader(f)
    STOPWORDS = list(reader)
STOPWORDS = set([s[0] for s in STOPWORDS])


def get_text_for_queries(tokens, queries):
    if not queries:
        return None
    queries_with_text = []
    for start,end in queries:
        query_raw_text = tokens[start:end]
        query_filtered_text = " ".join([word for word in query_raw_text if word.lower() not in STOPWORDS])
        if query_filtered_text.strip():
            queries_with_text.append((query_filtered_text, start, end))
    return queries_with_text

def generate_queries_for_line(line):
    tokens = [t for t in re.split("\W+", line) if t] #Will split acronyms with "." b/w letters into separate tokens
    if not tokens: # Can't annotate empty lines
        return None
    if len(tokens) < 5:
        queries = []
        for i in range(1, len(tokens)):
            for j in range(i-1):
                queries.append((j,i))
        return get_text_for_queries(tokens, queries)
    queries = [(0,1), (1,2), (0,2), (2,3), (1,3), (0,3), (3,4), (2,4), (1,4), (0,4)] # Assumes line has more than 5 tokens at this point
    for i in range(5, len(tokens)): #i keeps track of end of sliding window
        for j in range(i-5, i): #j keeps track of start of sliding window
            queries.append((j, i))
    return get_text_for_queries(tokens, queries)

def search_line(line, index):
    queries_with_text = generate_queries_for_line(line)
    #Generate SOrt Options Object
    sort_opts = search.SortOptions(match_scorer=search.MatchScorer())
    #Generate Query Options Object (including returned_fields)
    query_opts = search.QueryOptions(sort_options=sort_opts, ids_only=True)
    query_results = []
    #For each query Make Query and Save Results
    for query_text,start,end in queries_with_text:
        query = search.Query(query_string=query_text.strip(), options=query_opts)
        search_results = "HOHOHOHOHO"
        try:
            search_results = index.search(query)
        except search.Error:
            return None
        num_found = search_results.number_found
        num_returned = len(search_results.results)
        assert num_found == num_returned, "Too many documents"
        i = 0
        associated_docs = []
        for doc in reversed(search_results.results): # Gets 4 highest matching docs? for this query
            if i > 3:
                break
            associated_docs.append(doc)
            i += 1
        doc_scores = [doc.sort_scores[0] for doc in associated_docs]
        avg_score = sum(doc_scores)/ float(len(doc_scores)) if len(doc_scores) else 0
        good_doc_ids = [doc.doc_id for doc in associated_docs]
        query_results.append((avg_score, good_doc_ids, query_text, start, end)) # HOW TO RETREIVE SCORES USED FOR SORTING? NEED THEM TO DETERMINE BEST QUERY
    #Choose best query
    best_query = max(query_results, key=lambda x: x[0])
    #Make another query for this query, saving the snippet from each text_field
    final_query = search.Query(query_string=best_query[2].strip(),
            options=search.QueryOptions(sort_options=sort_opts,
                returned_fields=["doc_id_text"], snippeted_fields=["doc_text"]))
    #Get doc ID's, snippets, and start/stop num and return them
    #CAN ALSO DO ALL OF THE BELOW BY SIMPLY ADDING SNIPPET FIELD TO ORIGINLA QUERIES?
    best_result = None
    try:
        best_results = index.search(final_query)
    except search.Error:
        return None
    i = 0
    associated_docs = []
    for doc in reversed(best_results.results): # Gets 4 highest matching docs? for this query
        if i > 3:
            break
        associated_docs.append(doc)
        i += 1
    doc_scores = [doc.sort_scores[0] for doc in associated_docs]
    avg_score = sum(doc_scores)/ float(len(doc_scores)) if len(doc_scores) else 0
    ids_and_blurbs = []
    for doc in associated_docs:
        for expr in doc.expressions:
            if expr.name == docs.notes.doc_text:
                description_snippet = expr.value
                ids_and_blurbs.append((doc.doc_id, description_snippet))
                break
    final_ret_val = [avg_score, ids_and_blurbs, best_query[3], best_query[4]]#still need to add KhanAcademy here
    return final_ret_val
