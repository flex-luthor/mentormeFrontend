import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import io from "socket.io-client";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { ChatFeed, Message } from 'react-chat-ui'

import javascriptImg from '../../assets/img/Unofficial_JavaScript_logo_2.svg'
import reactImg from '../../assets/img/React-icon.svg'
import angular from '../../assets/img/Node.js_logo.svg'
import Avatar from '@material-ui/core/Avatar';
import fire from "../../fire.js";
import firebase from 'firebase'
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';



const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(['authToken']);
  const [messages, setMessages] = React.useState([new Message({ id: 1, message: "Bye" }),
  new Message({ id: 1, message: "Hi there" }),
  new Message({ id: 0, message: "Hey yeah!" }),
  new Message({ id: 1, message: "Wassup?" }), new Message({ id: 1, message: "Lets learn React" }),
  new Message({ id: 0, message: "Yeah sure" }),]);
  const [is_typing, setIs_typing] = React.useState(false);
  const [mentors, setMentors] = React.useState([]);
  const [msg, setMsg] = React.useState("");

  // React.useEffect(() => {
  //   /* Create reference to messages in Firebase Database */
  //   let messagesRef = fire.database().ref('mentorme-efa7c/chats/menteeIdmentorId/timestamp/menteeId').orderByKey().limitToLast(100);

  //   messagesRef.on('value', snapshot => {
  //     const message = snapshot.val();
  //     console.log(message);
  //   })
  // })

  const socket = io.connect("http://localhost:7000");

  const onMessageSubmit = () => {
    socket.emit("chat message", msg);
    setMsg("");
  };

  const handleMsg = (e) => {
    setMsg(e.target.value);
  }

  if (!cookies.authToken) {
    return <Redirect to="/login" />
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={5}>
        <Card style={{ height: '100%' }}>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Mentors</h4>
            <p className={classes.cardCategoryWhite}>
              {mentors.length} active mentors.
            </p>
          </CardHeader>
          <CardBody style={{ height: '100%' }}>

          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={7}>
        <Card style={{ height: '100%' }}>
          <CardBody style={{ height: '100%' }}>
            <div style={{ borderBottom: '1px solid #aaa' }}>
              <GridContainer>
                <GridItem xs={1} sm={1} md={1}>
                  <Avatar alt="Arpit Bhardwaj" src={javascriptImg} style={{ width: "50px", height: "50px", marginTop: "5px" }} />
                </GridItem>
                <GridItem xs={11} sm={11} md={11}>
                  <h4 style={{ fontWeight: "400", margin: "5px 5px 0px 5px" }}>Arpit Bhardwaj</h4>
                  <p style={{ margin: "0px 5px 20px 5px" }} > Last message 5 hrs ago</p>

                </GridItem>

              </GridContainer>
            </div>
            <ChatFeed
              messages={messages} // Boolean: list of message objects
              isTyping={is_typing} // Boolean: is the recipient typing
              hasInputField={false} // Boolean: use our input, or use your own
              showSenderName // show the name of the user who sent the message
              bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
              // JSON: Custom bubble styles
              bubbleStyles={
                {
                  text: {
                    fontSize: 15
                  },
                  chatbubble: {
                    borderRadius: 20,
                    padding: 10
                  }
                }
              }
            />
            <div>      <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handleMsg} value={msg} />
              <Button variant="contained" color="primary" onClick={onMessageSubmit}>
                Send
</Button>
            </div>
          </CardBody>
        </Card>

      </GridItem>
    </GridContainer >
  );
}
