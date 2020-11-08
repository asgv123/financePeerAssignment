import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as settings from '../settings';
// import json

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Slider, Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// ########################################################
// Material UI inline styles
// ########################################################
const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "100%",
        marginTop: "15vh",
        marginBottom: "15vh",
        borderRadius: '6px',
        backgroundColor: theme.palette.action.disabledBackground,
    },
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1), paddingLeft: theme.spacing(4),
        color: theme.palette.primary.main,
    },
    table: {
        minWidth: 650,
      },
      hideLastBorder: {
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      },
    
}));



// ########################################################
// The main Home component returned by this Module
// ########################################################
function Home(props) {
    // Material UI Classes 
    const classes = useStyles();

    // React hook state variable - Prediction
    const [files, setFile] = React.useState(null)
    const [uploadStatus, setUploadState] = React.useState(null)
    let dummy_entry = {
        'userId' : 'welcome',
        'id' : 'Hi,',
        'title' : 'Please click on Refresh DB',
        'body' : 'to view the database'
    }
    const [rows, setRows] = React.useState({'data':[dummy_entry]})
    // let rows = [0.1, 0.2, 3325]

    const handleFilesChosen = event => {
        setFile(event.target.files[0]);
    }

    const handleUploadClick = event => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('file', files)
        // const csrf = this.getCookie('csrftoken');
        let headers = { 'Authorization': `Token ${props.token}`//,  "Content-Type":"multipart/form-data"
        };
        let url = settings.API_SERVER + '/api/upload/';
        let method = 'post';
        let config = { headers, method, url, data: formData };
        axios(config).then(
            res => {setUploadState(res.data)
                // call the get function
            }).catch(
                error => {alert(error)})
        
    }

    const handleUpdateDBClick = event => {
        event.preventDefault();
        
        let headers = { 'Authorization': `Token ${props.token}`//,  "Content-Type":"multipart/form-data"
        };
        let url = settings.API_SERVER + '/api/download/';
        let method = 'get';
        let config = { headers, method, url};
        axios(config).then(
            res => { 
                console.log("Check below1")
                
                // rows = res.data
                setRows(res.data)
                console.log("Check below2")
                console.log(rows)
            }).catch(
                error => {alert(error)})
    }

    return (
        <div>
            <CssBaseline />
            <Container fixed className={classes.container}>
                <Grid container alignItems="left" spacing={10} xs={12}>
                    <Grid item xs={4}>
                        <Paper className={classes.title} elevation={0}>
                            <Typography variant="h5">
                                What would you like to do?
                            </Typography>
                        </Paper>
                        <p><input
                            type="file"
                            multiple={false}
                            accept=".*"
                            onChange={handleFilesChosen}
                        /></p>
                        <Button variant="contained" color="primary" onClick={handleUploadClick}>
                            Upload
                        </Button>
                        <Paper className={classes.title} elevation={0}>
                            <Typography variant="caption" display="inline">
                                Upload status: <span>&nbsp;</span>
                            </Typography>
                            <Typography variant="body1" display="inline">
                                {uploadStatus}
                            </Typography>
                        </Paper>
                        
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" onClick={handleUpdateDBClick}>
                                Refresh DB
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        {rows.data.map((row) => 
                            (
                            <div>
                                <ul>
                                    <li>UserID : {row.userId}</li>
                                    <li>Title : {row.title}</li>
                                    <li>{row.body}</li>
                                </ul>
                               </div>  )
                        )}
                        
                    </Grid>
                     
                </Grid>
            </Container>
            
        </div>
    )
}
export default Home