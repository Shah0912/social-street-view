import React,{useState, useEffect} from 'react'
import {
  Avatar,
  Grid,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import {useAuth0} from '@auth0/auth0-react'
import { useQuery, gql, useMutation} from '@apollo/client'
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

const GET_USER = gql `
  query getUser($email: String!) {
    User(filter: {email: $email}) {
      email
      name
      profileImg
      followers
      follows {
        name
        email
      }
      posted {
        id
      }
    }
    # query getFollows($email2: String!) {
    #   User(filter: {email:$email2}) {
    #     email
    #     name
    #     follows{
    #       email
    #       name
    #     }
    #   }
    # }
  }
`
const FOLLOW = gql `
  mutation ($email1: String!, $email2: String!) {
    MergeUserFollows(from:{email:$email1} to:{email:$email2}) {
      from{
        email
        name
      }
      to {
        email
        name
      }
    }
  }
`

const UNFOLLOW = gql `
  mutation ($email1: String!, $email2: String!) {
    RemoveUserFollows(from:{email:$email1} to:{email:$email2}) {
      from{
        email
        name
      }
      to {
        email
        name
      }
    }
  }
`


function Details({email}) {

  const {isAuthenticated, user} = useAuth0();

  const [follow] = useMutation(FOLLOW);
  const [unfollow] = useMutation(UNFOLLOW);

  const {loading, error, data} = useQuery(GET_USER, {
    variables: {email: email.email   },
    // pollInterval: 1000,
  });

  const [Email, setEmail] = useState("")

  useEffect(() => {
    if(isAuthenticated == true) {
      setEmail(user.email);
    }
}, [isAuthenticated]);

  const [Data, setData] = useState(undefined);
  useEffect(() => {
    if(loading == false && data) {
      setData(data);
    }
  }, [loading, data]);

  const [Follows, setFollows] = useState(false);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log("Data = ", data);
  if(Data) {
    {
      Data.User[1].follows.forEach(fol => {
        if(fol.email === Data.User[0].email)
          setFollows(true);
      });
      console.log("Follows = ", Follows);
    }
    // {
    //   if(Data.User[0].email === user.email)
    //     setFollows(true);
    // }


    function handleFollow() {
      follow({
        variables: {
          email1: Email,
          email2: email.email
        }
      })
    }

    function handleUnfollow() {
      unfollow({
        variables: {
          email1: Email,
          email2: email.email
        }
      })
    }


    return (
      <React.Fragment>
                    <Grid
                      container
                      justify="center"
                      spacing={1}
                      alignItems="center"
                      style={{ marginTop: '30px', paddingLeft: '50px' }}
                    >
                      <Grid item xs sm={4}>
                        <Avatar
                          // alt="MKBHD"
                          alt = {Data.User[0].name}
                          // src="https://instagram.fbom3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/119212035_239827994073834_7752811925137782806_n.jpg?_nc_ht=instagram.fbom3-1.fna.fbcdn.net&_nc_ohc=HQb7do4VVsYAX_0l7Zu&oh=fa5d4001d57b6ceb31b10b70270678c7&oe=5FB91AC9"
                          src = {Data.User[0].profileImg}
                          style={{ height: '168px', width: '168px' }}
                        />
                      </Grid>
                      <Grid item xs sm={8}>
                        <Grid container spacing="1" alignItems="center">
                          <Grid item xs>
                            {/* <h2>Sarang Shekokar</h2> */}
                            <h2>{Data.User[0].name}</h2>
                          </Grid>
                          <Grid item xs>
                            {!Follows && Data.User[0].email != user.email && (
                            <Button variant="outlined" onClick = {handleFollow}>
                              <PersonAddIcon />
                            </Button>
                            )}
                            {Follows && Data.User[0].email != user.email && (
                              <Button variant="outlined" onClick = {handleUnfollow}>
                                <PersonAddDisabledIcon />
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                        {/* <Grid container spacing="4">
            <Grid item xs={4}>
              <h4>1,000 Posts</h4>
            </Grid>
            <Grid item xs={4}>
              <h4>1,000 Following</h4>
            </Grid>
            <Grid item xs={4}>
              <h4>1,000 Followers</h4>
            </Grid>
          </Grid> */}
                      </Grid>
                    </Grid>
                    <Table style = {{marginBottom:'30px'}}>
                                  <TableHead>
                                    <TableRow>
                                      {/* <TableCell align="center">1,000 Posts</TableCell>
                                      <TableCell align="center">1,000 Following</TableCell>
                                      <TableCell align="center">1,000 Followers</TableCell> */}
                                      <TableCell align="center">{Data.User[0].posted.length} Posts</TableCell>
                                      <TableCell align="center">{Data.User[0].follows.length} Following</TableCell>
                                      <TableCell align="center">{Data.User[0].followers} Followers</TableCell>
                                    </TableRow>
                                  </TableHead>
                                </Table>
                  </React.Fragment>
    )
  } 

  return (
    <div>Error while loading...</div>
  )
}

export default Details
