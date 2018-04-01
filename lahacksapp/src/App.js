import React, { Component } from 'react';
import logo from './logo.svg';
import {Link, Switch, Route, HashRouter as Router } from 'react-router-dom'
import {Container, Header, Image, List, Menu, Segment,
  Button,Input,Label,
  Icon} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import * as firebase from 'firebase';
import CodeMirror from 'codemirror';
import Firepad from 'firepad';

const config = {
    apiKey: "AIzaSyBHvYqbcGu2MWc3NiIhsoEejfEKMo2rzl0",
    authDomain: "noteworthy-a7cc3.firebaseapp.com",
    databaseURL: "https://noteworthy-a7cc3.firebaseio.com",
    projectId: "noteworthy-a7cc3",
    storageBucket: "noteworthy-a7cc3.appspot.com",
    messagingSenderId: "501950428377",
};

let fb=firebase.initializeApp(config)


const HomepageHeading = ({ mobile }) => (
   <Menu inverted style={{
    background: 'linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url("notetaking.jpg")'
   }}>
   <Container text >
    <div><Header
      as='h1'
      content='Note Marking'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: '2em',
      }}
    />
    <Header
      as='h2'
      content="Remember the important things the easy way."
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em'
      }}
    />
    <Link to="/editor">
    <Button primary size='huge' style={{
        marginTop: mobile ? '0.5em' : '1.5em',
        marginBottom: mobile ? '1em' : '1.5em'
      }}>
      Create New Note
      <Icon name='right arrow' />
    </Button></Link>
    </div>
  </Container>
  </Menu>

)


const NotespageHeading = ({ mobile }) => (
   <Menu inverted style={{
    background: 'linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url("notebooks.jpg")'
   }}>
   <Container text >
    <div><Header
      as='h1'
      content='The Notes Collection'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: '2em',
      }}
    />
    <Header
      as='h2'
      content="Find a past note to work with."
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
        marginBottom: mobile ? '1.5em' : '1.5em'
      }}
    />
    </div>
  </Container>
  </Menu>

)


class NotesList extends Component {

constructor(props){
super(props);
this.state = {
        title: [],
        key: [],
        data: [],
        post: '',
        activeItem: ''
    };
}
//todo
  handleItemClick = (e, { key }) => this.setState({ activeItem: key })

  componentDidMount(){

    const rootRef = fb.database().ref();
    const post = rootRef.orderByKey();


   post.once('value', snap => {
       snap.forEach(child => {
            let childRef = firebase.database().ref('/'+child.key);
            let codeMirror = CodeMirror(document.getElementById('firepad'), { lineWrapping: true });
            let firepad = Firepad.fromCodeMirror(childRef, codeMirror, {
                richTextShortcuts: false,
                richTextToolbar: false
              });

            console.log('text!: '+firepad.getText());

            childRef.once('value', snapshot => {
                let name= snapshot.child('metadata/name').val();

                console.log(child.key + " "+name);

                this.setState({
                   key: this.state.key.concat([child.key]),
                   title: this.state.title.concat([name])
                });
//
               const postList = this.state.key.map((dataList, index) =>
                  <Link to={'/editor/'+dataList} >
                  <Menu.Item key={index} active={this.state.activeItem === index} onClick={this.handleItemClick}>
                        {this.state.title[index]}

                    </Menu.Item></Link>

                );

                this.setState({
                    post: postList
                });
            });
        });
    });
}


  render() {

    return (
        <div>
        <div id="firepad"></div>
        <Menu vertical>{this.state.post}</Menu>
      </div>
    )
  }
}



class HomeLayout extends Component {
    render(){
        return (
        <Container text style={{ marginTop: '4em' }}>
          <p>Do you ever feel like you’re struggling to remember everything going on in your life?</p>
          <p>You're not the only one — and that's why it's important to take notes. Write something down, and you're ten times more likely to remember it.As author Tim Ferriss says, “I trust the weakest pen more than the strongest memory.”
</p>
<p>
There are plenty of ways to take notes. You can carry a notebook and pen in your pocket, or scribble thoughts on a napkin at lunch. Or, better yet, you could use a notebook app, so you always have a way to store your thoughts—even if there's not a pen nearby.
</p>
<p>
Notebook apps come in all shapes and sizes. From simple plain-text notebooks to apps that recognize your handwriting and record audio, you can find a notebook app for anything you want to remember.
</p>
<p>
NoteWorthy helps you save time by indexing and auto-marking your notes!
</p>

  </Container>

      );
    }
}


class PageLayout extends Component {

    render(){
        return ( <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image
                size='mini'
                src='./icon.png'
                style={{ marginRight: '1.5em' }}
              />
              NoteWorthy
            </Menu.Item>
            <Menu.Item><Link to="/">Home</Link></Menu.Item>
            <Menu.Item ><Link to="/folder">My Notes</Link></Menu.Item>
            <Menu.Item ><Link to="/editor">New Note</Link></Menu.Item>
          </Container>
        </Menu>

        {this.props.children}
        <Segment
          inverted
          vertical
          style={{ margin: '5em 0em 0em', padding: '2em 0em' }}
        >
          <Container textAlign='center'>
          <List inverted link>
            <List.Item as='a' href='https://github.com/lucamatsumoto/Noteworthy'>  <Image
              centered
              size='mini'
              src='./octocat.png'
            /></List.Item>
             </List>

            <List horizontal inverted divided link>
              <List.Item as='a' href='#'>   &copy; NoteWorthy, LAHacks 2018</List.Item>
            </List>
          </Container>
        </Segment>
      </div>
      );
    }
}

class Folder extends Component {
    render(){
        return  (
             <div>
              <Container text style={{ marginTop: '7em'}}>
             <NotesList/>
          </Container>
           </div>
            );
    }
}

class Editor extends Component {
    render(){
        return  (
             <Container align="center"  style={{ marginTop: '7em', width: '70%'}}>
         <iframe align="center" style= {{ overflow:'visible'}}  width='100%' height='600px' title="editor" src="./firepad/examples/richtext.html"></iframe>
        </Container>
        );
    }
}

class Editor2 extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let url="./firepad/examples/richtext.html#"+this.props.match.params.id;
        console.log(url);
        return  (
        <Container align="center"  style={{ marginTop: '7em', width: '70%'}}>
         <iframe align="center" style= {{ overflow:'visible'}}  width='100%' height='600px' title="editor" src={url}></iframe>
        </Container>
        );
    }
}



class App extends React.Component {
 render(){
     return <Router><Switch>
      <Route exact path='/editor' render={() => <PageLayout><Editor/></PageLayout> }/>
      <Route path='/editor/:id' render={(props) => <PageLayout><Editor2 {...props}/></PageLayout> }/>
      <Route path='/folder' render={() => <PageLayout><div><NotespageHeading/><Folder/></div></PageLayout> }/>
     <Route exact path='/' render={() => <PageLayout><div><HomepageHeading/><HomeLayout/></div></PageLayout> }/>
   </Switch></Router>
 }
}

export default App;



