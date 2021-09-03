import { useState } from 'react'
import { Card } from 'antd';
import { Input } from 'antd';
import {EditOutlined, SaveTwoTone, DeleteTwoTone } from '@ant-design/icons'

const LinkCard = ({ link, linksRef, username }) => {
  const [title, setTitle] = useState(link.title)
  const [url, setUrl] = useState(link.url)
  const id = link.id

  const handleEdit = () => {
    const newLink = {
      id,
      title,
      url
    }
    linksRef.child(username).child(id).update(newLink)
  }

  const handleDelete = () => {
    console.log("link id", id)
    linksRef.child(username).child(id).remove()
  }

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
      {(title && url)
        ? <SaveTwoTone onClick={handleEdit} className="float-right" twoToneColor="#52c41a" />
        : <SaveTwoTone twoToneColor="#D3D3D3" />}
    </Card>
  )
}

export default LinkCard