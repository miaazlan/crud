import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dEmployee";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, FormControl,TableCell, Input,TableBody, withStyles, ButtonGroup, Button, FormGroup } from "@material-ui/core";
import DEmployeeForm from "./DEmployeeForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import { SearchBar } from "./SearchBar";
import { SearchResultsList } from "./searchResultsList";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'




const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})




const DEmployees = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    const[results, setResults] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPage = 5
    const lastIndex = currentPage * recordsPage
    const firstIndex = lastIndex - recordsPage
    const records = props.dEmployeeList.slice(firstIndex, lastIndex)
    const npage = Math.ceil(props.dEmployeeList.length/ recordsPage)
    const numbers =[...Array(npage +1).keys()].slice(1) 
    const [search, setSearch] = useState('')

    useEffect(() => {
        props.fetchAllDEmployees()
    }, [])//componentDidMount

    function nextPage(){
        if(currentPage !== npage){
            setCurrentPage(currentPage+1)
        }
    }
    function changeCpage(id){
        setCurrentPage(id)
    }
    
    function prePage(){
        if(currentPage !== firstIndex){
            setCurrentPage(currentPage-1)
        }
    }
    
 

    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteDEmployee(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <div class="mb-3">
  
  <input  class="form-control" onChange={(e)=> setSearch(e.target.value)} id="exampleFormControlInput1" placeholder="Search">

  </input>
</div>

            <Grid container>
                <Grid item xs={6}>
                    <DEmployeeForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    records.filter((record)=>{
                                        return search.toLowerCase() === ''
                                        ? record
                                        : record.name.toLowerCase().includes(search)
                                    }).map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.name}</TableCell>
                                            <TableCell>{record.mobile}</TableCell>
                                            <TableCell>{record.email}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                        <nav>
                            <ul className="pagination justify-content-end mt-3">
                                <li className="page-item">
                                    <a href='#' className="page-link" onClick={prePage}>Prev</a>
                                </li>
                                {
                                    numbers.map((n,i)=>(
                                        <li className="page-item ${currentPage === n? 'active':''}" key={i}>
                                            <a href='#' className="page-link" onClick={()=>changeCpage(n)}>{n}</a>

                                        </li>
                                    ))
                                }
                                <li className="page-item">
                                    <a href='#' className="page-link" onClick={nextPage}>Next</a>
                                </li>
                            </ul>
                        </nav>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}



const mapStateToProps = state => ({
    dEmployeeList: state.dEmployee.list
})

const mapActionToProps = {
    fetchAllDEmployees: actions.fetchAll,
    deleteDEmployee: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DEmployees));