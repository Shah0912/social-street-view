import React from 'react'
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

function Details() {
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
                        alt="MKBHD"
                        src="https://instagram.fbom3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/119212035_239827994073834_7752811925137782806_n.jpg?_nc_ht=instagram.fbom3-1.fna.fbcdn.net&_nc_ohc=HQb7do4VVsYAX_0l7Zu&oh=fa5d4001d57b6ceb31b10b70270678c7&oe=5FB91AC9"
                        style={{ height: '168px', width: '168px' }}
                      />
                    </Grid>
                    <Grid item xs sm={8}>
                      <Grid container spacing="1" alignItems="center">
                        <Grid item xs>
                          <h2>Sarang Shekokar</h2>
                        </Grid>
                        <Grid item xs>
                          <Button variant="outlined">
                            <PersonAddIcon />
                          </Button>
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
                                    <TableCell align="center">1,000 Posts</TableCell>
                                    <TableCell align="center">1,000 Following</TableCell>
                                    <TableCell align="center">1,000 Followers</TableCell>
                                  </TableRow>
                                </TableHead>
                              </Table>
                </React.Fragment>
  )
}

export default Details
