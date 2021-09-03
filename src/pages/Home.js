import {useState, useEffect} from 'react'
import { Avatar, Image } from 'antd';
import { Button, Input } from 'antd';
import { EditOutlined, LogoutOutlined, CheckCircleTwoTone, CodeSandboxCircleFilled } from '@ant-design/icons'

import firebase from '../firebase'
import EditLinkCard from '../component/EditLinkCard'
import AddLinkCard from '../component/AddLinkCard'
import profile from '../images/profile.jpeg'

function Home({history}) {

  const [links, setLinks] = useState([])
  const [showCard, setShowCard] = useState(false)
  const [username, setUsername] = useState('test')
  const [name, setName] = useState('test')
  const website = 'https://linktree-test-1.web.app/'

  const linksRef = firebase.database().ref('links')

  useEffect(() => {

    linksRef.once('value', snap => {
      const key = Object.keys(snap.val())[0]
      setUsername(key)
      setName(key)
    })

    let loadedLinks = []
    linksRef.child(username).on('child_added', snap => {
      loadedLinks.push(snap.val())
      // console.log("loadedLinks--------------", loadedLinks)
      setLinks([...loadedLinks])
    })

    linksRef.child(username).on('child_removed', snap => {
      loadedLinks = loadedLinks.filter(link => link.id !== snap.key)
      setLinks([...loadedLinks])
    })

    return() => linksRef.child(username).off()
  }, [username])

  const createNewCard = () => setShowCard(true)
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => history.push('/login'))
  }

  const changeUsername = () => {
    let oldLinks = []
    linksRef.child(username).once('value', snap => {
      // console.log("snap.val()", snap.val())
      oldLinks.push(snap.val())
    })
    //remove old user profile
    linksRef.child(username).remove()

    // console.log("oldlinks", oldLinks)
    //add new user profile
    linksRef.child(name).update(oldLinks[0])
    setUsername(name)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-3" style={{ backgroundColor: "#FFEDDA", minHeight: "600px"}}>
          <div className="row">

            <div className="col-md-3">
              <Avatar
                size={80}
                src={<Image src={profile} />}
              />
            </div>
            <div className="col-md-9 mt-3">
              <Input
                placeholder="Username"
                bordered={false}
                value={name}
                suffix={<CheckCircleTwoTone onClick={changeUsername} className="mr-1"/>}
                onChange={e => setName(e.target.value)}
              />

              <a href={`${website}${username}`} target='_blank'>{`${website}${username}`}</a>
              <LogoutOutlined onClick={logout} className="btn btn-danger float-right"/>

            </div>
          </div>

          <Button type="primary" block shape="round" className="mt-3" onClick={createNewCard}>
            Add New Link
          </Button>
          {showCard && <AddLinkCard linksRef={linksRef} setShowCard={setShowCard} username={username}/>}
          {links.length > 0 && links.map((link) => (<EditLinkCard key={link.id} link={link} linksRef={linksRef} username={username}/>))}
          
        </div>
      </div>
    </div>
  );
}



export default Home;