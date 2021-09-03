import {useState, useEffect} from 'react'
import { Avatar, Image, Button } from 'antd';

import firebase from '../firebase'
import profile from '../images/profile.jpeg'

function Profile({match}) {

  const [links, setLinks] = useState([])
  const linksRef = firebase.database().ref('links')
  const username = match.params.username

  useEffect(() => {
    linksRef.child(username).once('value', snap => {
      console.log("snap", snap.val())
      setLinks([...Object.values(snap.val())])
    })

    return() => linksRef.off()
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-3" style={{ backgroundColor: "#FFEDDA", minHeight: "500px"}}>
          <Avatar
            size={80}
            src={<Image src={profile} />}
            style={{margin: "auto"}}
          />
          {links.length > 0 && links.map((link) => (
            <a key={link.id} href={`http://${link.url}`} target="_blank">
              <Button type="primary" block shape="round" className="mt-3" >
                {link.title}
              </Button>
            </a>
            
          ))}
          
        </div>
      </div>
    </div>
  );
}



export default Profile;