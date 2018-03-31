from google.appengine.api import search

class Index(object):
    def __init__(self):
        self.index = search.Index(name='notes')

    # Creates and fills out new documents
    def create_document(self, doc_id, doc_name, doc_date, doc_text):
        document = search.Document(
            doc_id = doc_id,
            fields = [
                search.TextField(name='doc_id_text', value = doc_id),
                search.TextField(name='doc_name', value = doc_name),
                search.TextField(name='doc_text', value = doc_text)
            ])

        return document

    def insert_document(self, doc_id, doc_name, doc_date, doc_text):
        document = self.create_document(doc_id, doc_name, doc_date, doc_text)
        self.index.put(document)

    def get_document_by_id(self, doc_id):
        document = self.index.get(doc_id)
        return document

    def search(self, query):
        documents = self.index.search(query)
        for document in documents:
            print(document)

    def test(self, doc_id):
        print(search.get_indexes())
        print(self.get_document_by_id(doc_id))
        self.search("HI")
