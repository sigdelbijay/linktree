import {useState, useEffect} from 'react'

import 'antd/dist/antd.css'
import { Avatar, Image } from 'antd';
import { Button } from 'antd';
import { Card } from 'antd';
import { Input } from 'antd';
import {EditOutlined, SaveOutlined, SaveTwoTone, DeleteOutlined } from '@ant-design/icons'
import firebase from './firebase'
// import { getDatabase } from "firebase/database"

function App() {

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [links, setLinks] = useState([])
  const linkRefs = firebase.database().ref('links')

  useEffect(() => {
    let loadedLinks = []
    linkRefs.on('child_added', snap => {
      loadedLinks.push(snap.val())
      setLinks(loadedLinks)
    })
  }, [])
  
  const handleSave = (e) => {
    e.preventDefault()
    linkRefs.set({ title, url})
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-3" style={{ backgroundColor: "#FFEDDA" }}>
          <Avatar
            size={80}
            src={<Image src="profile.jpeg" />}
          />
          <Button type="primary" block shape="round" className="mt-3">
            Add New Link
          </Button>
          <Card bordered={false} style={{ width: "100%" }} className="mt-3">
            <div style={{display: "flex"}}>
              <Input
                placeholder="Title"
                bordered={false}
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <EditOutlined />
            </div>
            <div style={{display: "flex"}}>
              <Input
                placeholder="Url"
                bordered={false}
                value={url}
                onChange={e => setUrl(e.target.value)}
              />
              <EditOutlined />
            </div>
            {(title && url) ? <SaveTwoTone onClick={handleSave} className="float-right" twoToneColor="#52c41a"/>
              : <SaveTwoTone onClick={handleSave} className="float-right" twoToneColor="#D3D3D3"/>}
          </Card>
          {/* <Link url="https://www.facebook.com/sigdelbjay/" name="Facebook" />
          <Link url="https://www.linkedin.com/in/sigdelbijay/" name="LinkedIn" />
          <Link url="https://github.com/sigdelbijay" name="Github" /> */}
        </div>
      </div>
    </div>
  );
}



export default App;