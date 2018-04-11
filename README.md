(Most of us) take notes on lectures, workshops, and the like. But we realized we almost never use our notes to study and that it's easy to get lost taking notes in a class you're behind in. So we decided to make an intelligent note-taking platform that annotates you notes for you on the go, making it easier to take notes and use them to study.

We created this web application with a customized text editor that allows users to create documents and take notes, save previously taken notes, and edit them. As users type their notes, the site generates annotations on the fly, which users can use to view what they previously said about certain keywords in their notes (e.g. a definition for "Divide and Conquer Algorithms"). Once a user finishes taking a note, the site will also generate and display links for a few helpful KhanAcademy or other educational videos related to the topics discussed in their notes. Users can then go back and view/edit their notes. Users can also create notes by uploading pictures, which are converted to text automatically.

Our backend, which computes the annotations, recommends educational videos, and creates notes from images, relies on a Google App Engine standard instance, which we use to compute/store data for the indexed document search api. When new documents are created, they are indexed for future searchability. When a user types, the backend is queried to produce annotations by then performing intelligent, ranked searches on indexed documents (previously taken notes). When a document is saved, the backend performs a keyword search using the Cloud Natural Language API, and then queries the youtube API to find relevant educational videos. The Cloud Vision API is used to convert images to new notes. Our frontend is built on firebase, and is inspired by firepad- an open-source text editor. Notes and annotations are stored in firebase.

Check it out at: http://noteworthy.bitballoon.com/ *you must enable cross origin resource sharing on your browser for project to work properly




