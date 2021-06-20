/* eslint-disable */
import React, { FC, useState } from 'react'
import { RouteComponentProps } from "react-router";
import { makeStyles } from '@material-ui/core/styles'
import { Edit, Delete, Close } from '@material-ui/icons'
import {
    IconButton,
    Icon,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
    TableContainer,
    Divider,
    TextField,
    Button,
} from '@material-ui/core'
import { blue, red } from '@material-ui/core/colors'
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
    deleteUser
} from "./../User/userSlice";
import { getUsersOnly } from './../User/userSelector';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mbody: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        width: '80%',
        height: '80%',
    },
    root: {
        flexGrow: 1,
    },
    body: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formfield: {
        marginBottom: '1em',
        width: '90%',
    },
    heading: {
        padding: '0.5em',
        display: 'flex',
        alignItems: 'center',
    },
    container: {
        maxHeight: 450,
    },
    head: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5em',
    },
    button: {
        width: '100%',
        color: '#fff',
        backgroundColor: '#df5a28',
        height: '100%'
    },
}))

type Props = { component: FC } & RouteComponentProps;

const Users = ()=>{
    const classes = useStyles()
    const dispatch = useAppDispatch();
    const allUsers = useAppSelector(getUsersOnly);
    const [showSearch, setShowSearch] = useState(false)
    const [searchedData, setSearchedData]= useState([])
   

    const onUserSearch = (event: any, values: any) => {
       if (!values) {
            onUserSearchClose()
            return
        }
        if (allUsers.find((a: any) => a.email === values.email)) {
            setShowSearch(true)  
            setSearchedData(values)
        }
    }
    
    const onUserSearchClose = () => {
        setShowSearch(false)
        setSearchedData([])
         }

    return (
      <>
        <div className={classes.head}>
          <div>
            <Autocomplete
              id="combo-box-demo"
              options={allUsers}
              getOptionLabel={(option) => (option && option.email) || ""}
              onChange={onUserSearch}
              className="categoryTableSearch"
              noOptionsText="No Similar Searches"
              openOnFocus={false}
              style={{ width: 300, float: "right" }}
              closeIcon={
                <Close
                  fontSize="small"
                  onClickCapture={(e) => onUserSearchClose}
                />
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search"
                  variant="outlined"
                  style={{ width: "100%", float: "right" }}
                />
              )}
            />
          </div>
        </div>
        <Divider light />
        <Divider light />
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!showSearch ? (
                allUsers.length > 0 ? (
                  allUsers &&
                  allUsers.map((user: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.email} </TableCell>
                      <TableCell>{user.phone} </TableCell>
                      <TableCell>{user.address} </TableCell>
                      <TableCell align="right">
                        {/* <IconButton>
                        <Edit style={{ color: blue[500] }} />
                      </IconButton> */}
                        <IconButton
                          onClick={() => dispatch(deleteUser(user.email))}
                        >
                          <Delete style={{ color: red[500] }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={9}>
                      <h3>NO USERS FOUND</h3>
                    </TableCell>
                  </TableRow>
                )
              ) : [searchedData].length > 0 ? (
                searchedData &&
                [searchedData].map((user: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.email} </TableCell>
                    <TableCell>{user.phone} </TableCell>
                    <TableCell>{user.address} </TableCell>
                    <TableCell align="right">
                      {/* <IconButton>
                        <Edit style={{ color: blue[500] }} />
                      </IconButton> */}
                      <IconButton
                        onClick={() => {setSearchedData([]),dispatch(deleteUser(user.email))}}
                      >
                        <Delete style={{ color: red[500] }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={9}>
                    <h3>NO USERS FOUND</h3>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );}


export default Users;
