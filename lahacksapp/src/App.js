import React, { Component } from 'react';
import logo from './logo.svg';
import {Link, Switch, Route, HashRouter as Router } from 'react-router-dom'
import {Container, Header, Image, List, Menu, Segment,
  Button,
  Icon} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';

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
            <Menu.Item as='a' href='#'><Link to="/">Home</Link></Menu.Item>
            <Menu.Item as='a' href='#'><Link to="/editor">New Note</Link></Menu.Item>
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


class Intro extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Intro</h1>
        </header>
        <p className="App-intro">
          About notes blah blah.
        </p>
      </div>
    );
  }
}

class Editor extends Component {
    render(){
        return  (
             <Container text style={{ marginTop: '7em' }}>
         <iframe width='100%' height='500px' title="editor" src="./firepad/examples/richtext.html"></iframe>
        </Container>
            );
    }
}

class Notes extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Notes Section</h1>
        </header>
        <iframe width='80%' height='500px' title="try0" src="./firepad/examples/richtext.html"></iframe>
      </div>
    );
  }
}

class App extends React.Component {
 render(){
     return <Router><Switch>
      <Route path='/editor' render={() => <PageLayout><Editor/></PageLayout> }/>
     <Route exact path='/' render={() => <PageLayout><div><HomepageHeading/><HomeLayout/></div></PageLayout> }/>
   </Switch></Router>
 }
}

export default App;
