import React from 'react'

import elasticsearch from 'elasticsearch'
import EditModalExperts from './editmodal'
import AddModalExperts from './addmodal'

import axios from 'axios'


import test from './test.json'



const connectionString =
  'https://search-experts-ayuwtxztr5pvnas52cxmrjbdkm.eu-west-1.es.amazonaws.com/'
const _index = 'experts'
const _type = '_doc'
let client = new elasticsearch.Client({
  host: connectionString,
})

export default class DashboardBody extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expertsData: [],
      editExpertsData: {},
      editedExpertsId: '',
    }
    this.editExpertsModal = this.editExpertsModal.bind(this)
    this.addExpertsModal = this.addExpertsModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.deleteExperts = this.deleteExperts.bind(this)
  }

  componentDidMount() {
     client
      .search({
        index: _index,
        type: _type,
        size: 5,
        body: {
         query: {
           match_all: {}
          },
          sort: {
            "UID": "desc"
          }
        },
      })
      .then(
        function(body) {
          console.log(body.hits.hits)
          this.setState({ expertsData: body.hits.hits })
        }.bind(this),
        function(error) {
          //console.trace(error.message);
        })



      test.map((val, key)=>{
          val.UID = key + 1;
      })
      console.log(test)
    
  }

  handleChange(event) {
    client
      .search({
        index: _index,
        type: _type,
        size: 10,
        body: {
          query: {
            query_string: {
              query: event.target.value + '*',
              fields: [
                'Name',
                'Email',
                'Company',
                'Country',
                'Subjects',
                'Languages',
              ],
            },
          },
        },
      })
      .then(
        function(body) {
          console.log(body)
          this.setState({ expertsData: body.hits.hits })
        }.bind(this),
        function(error) {
          //console.trace(error.message);
        }
      )
  }

  editExpertsModal(e, id) {
    var modal = document.querySelector('#editModal')
    modal.style.display = 'block'
    this.setState({ editExpertsData: e, editedExpertsId: id })
  }

  addExpertsModal(e, id) {
    client
      .search({
        index: _index,
        type: _type,
        size: 1,
        body: {
         query: {
           match_all: {}
          },
          sort: {
            "UID": "desc"
          }
        },
      })
      .then(
        function(body) {
          console.log(body.hits.hits[0])
          this.setState({ lastId: body.hits.hits[0]._source.UID })
        }.bind(this),
        function(error) {
          console.trace(error.message);
        }
      )


    var modal = document.querySelector('#addModal')
    modal.style.display = 'block'
  }

  

  deleteExperts(id) {
    axios
      .delete(
        'https://search-experts-ayuwtxztr5pvnas52cxmrjbdkm.eu-west-1.es.amazonaws.com/experts/_doc/' +
          id
      )
      .then(function(response) {
        if (typeof window !== 'undefined') {
          window.location.reload()
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  }



  render() {
    return (
      <div className="main">
        <div className="container-fluid">
          <div className="row">
            <div className="twelve column">
              <button onClick={this.addExpertsModal}>Add Expert</button>
             
              <div className="inner-addon-dashboard left-addon-dashboard">
                <i className="fa fa-search" />
                <input
                  type="text"
                  placeholder="Search"
                  className="is-fullwidth"
                  id="search-input"
                  onChange={this.handleChange}
                />
              </div>
              <table className="u-full-width">
                <thead>
                  <tr>
                    <th>Profile Image</th>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Job Title</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.expertsData.map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>
                          <img
                            className="featured-profile-image"
                            src={`https://s3-eu-west-1.amazonaws.com/globelynx-experts-images/public/${
                              val._source['Profile Image']
                            }`}
                            style={{ height: '80px' }}
                            alt={val._source['Profile Image']}
                          />
                        </td>
                        <td>{val._source.Name}</td>
                        <td>{val._source.Company}</td>
                        <td>{val._source['Job Title']}</td>
                        <td>
                          <button
                            className="button btn-dashboard is-dark"
                            onClick={() =>
                              this.editExpertsModal(val._source, val._id)
                            }
                          >
                            <i className="fa fa-edit" />
                          </button>
                          <button
                            className="button btn-dashboard"
                            style={{ background: '#d24040' }}
                            onClick={() => this.deleteExperts(val._id)}
                          >
                            <i className="fa fa-trash" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <EditModalExperts
          edited_data={this.state.editExpertsData}
          edited_id={this.state.editedExpertsId}
        />
        <AddModalExperts lastId={this.state.lastId} />
      </div>
    )
  }
}
