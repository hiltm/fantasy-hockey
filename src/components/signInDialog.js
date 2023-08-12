import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import PropTypes from 'prop-types';
import { Box, Typography, Tabs, Tab } from '@mui/material';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';

const provider = new GoogleAuthProvider();

export default function SignInDialog({ parentCallback, handleClickOpen }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('Cat in the Hat');
  const [value, setValue] = React.useState(1);

  handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    parentCallback(name);
    setOpen(false);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const getDB = async (email) => {
    const db = getFirestore();
    const q = query(collection(db, 'users'), where('email', '==', `${email}`));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // email does not exist
      const usersRef = collection(db, 'users');
      await setDoc(doc(usersRef, `${uuidv4()}`), {
        id: `${uuidv4()}`,
        players: [{ id: 1, name: 'test', position: 'F' }],
        email: `${email}`,
      });
    } else {
      // email does exist
      console.log('does exist');
    }
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
  };

  const googleSignIn = () => {
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // console.log(user);

        getDB(user.email);

        //TODO: store token in local storage? Not sure about this one.

        // TODO: On sign in check database to see if the person exists. If not, direct them to fill out a roster (optional) and other details
        // If person exists, pull database data to state
        // console.log(token);
        // console.log(result);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
        // ...
      });
  };

  const signUp = () => {
    console.log('send data to firebase auth ');
  };

  const signIn = () => {
    console.log('send data to firebase auth ');
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div style={{ margin: 'auto' }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Sign Up" {...a11yProps(0)} />
              <Tab label="Sign In" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="password"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={name}
              onChange={handleChange}
            />
            <Button onClick={signUp}>Sign Up</Button>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="password"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={name}
              onChange={handleChange}
            />
            <Button onClick={signIn}>Sign In</Button>
            <Button onClick={googleSignIn}>Sign In With Google</Button>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}