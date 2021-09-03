import { useState } from 'react'
import { Card } from 'antd';
import { Input } from 'antd';
import {EditOutlined, SaveTwoTone, DeleteTwoTone } from '@ant-design/icons'

const LinkCard = ({ linksRef, setShowCard, username }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleSave = (title, url) => {
    const key = linksRef.child(username).push().key
    const newLink = {
      id: key,
      title,
      url
    }
    linksRef.child(username).child(key).update(newLink) //
    setShowCard(false)
  }

  const handleDelete = () => setShowCard(false)

  return (
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
      <DeleteTwoTone onClick={handleDelete} className="pl-2 float-right" twoToneColor="#FF0000" />
      {(title && url) ? <SaveTwoTone onClick={() => handleSave(title, url)} className="float-right" twoToneColor="#52c41a"/>
        : <SaveTwoTone className="float-right" twoToneColor="#D3D3D3"/>}
    </Card>
  )
}

export default LinkCard