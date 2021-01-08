import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image'
import axios from 'axios';
const API_URL = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json";

export function refreshPage() {
  window.location.reload(false);
}

class CandidateDisplay extends React.Component {
    constructor(props){

   super(props);
   this.shortlist = this.shortlist.bind(this)
    }
    state = {
        users: []
    }

   
    
    MarkUpdate=(id,message)=> {
      const result = window.prompt("If you have any Feedback for Candidate, if not remain it blank [Optional]",message);
        let userObject = {
            communication: result
        
        };
     
           
      axios.put(`${API_URL}/api/mark_lead/${id}`, userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        this.setState ({
            communication : " "

        })
        setTimeout(refreshPage, 700)
    }  
  
    shortlist(id) {
      axios.put(`${API_URL}/${id}`)
          .catch(err => console.warn(err));
         
        }
componentDidMount() {
        const url = `${API_URL}`;
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ users: data })
          console.log(this.state.users)
          
         })
      } 
    render() {
        return ( 
                      <div className="container">
              <div className="py-4">
                <h1></h1>
                <table class="table border shadow">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col"> ID</th>
                      <th scope="col">Photo</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.users.map((user) => (
                      <tr>
                        <td>{user.name}</td>
                  <td>{user.id}</td>
                        <td> <Image src={user.Image} thumbnail /></td>
                  <td>{user.location_type}</td>
                  <td>{user.location_string}</td>
                        <td><button type="button"  class="btn btn-success" data-toggle="modal" data-target="delete"
                         button onClick={(e) => { if (window.confirm('Do you wish to Shortlist ?')
                         ) this.shortlist(user.id);setTimeout(refreshPage, 2000);}}
                                                  >Shortlist</button>
                                                  &nbsp;&nbsp;&nbsp;
                                                  
                        <button type="button"  class="btn btn-danger" data-toggle="modal"
                         data-target="Update"
                         button onClick={(e) => {this.MarkUpdate(user.id,user.communication);}}
                                                  > Reject&nbsp;&nbsp;&nbsp;&nbsp;</button> </td>
                                                  
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );}}
export default CandidateDisplay
