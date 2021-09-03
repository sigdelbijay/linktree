import {Button} from 'antd'
import firebase from '../firebase'

const Login = ({history}) => {

  var provider = new firebase.auth.GoogleAuthProvider();
  const googleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(user => {
        history.push('/')
      })
      .catch(err => console.log(err))
  };
  return (
    <div className="container" style={{display: "flex", justifyContent: "center", height: "300px"}}>
      <Button
        onClick={googleLogin}
        type='primary'
        style={{margin: "auto"}}
        shape='round'
        size='large'
      >Login with Google</Button>
    </div>
  )
}

export default Login