import React from 'react'
import axios from 'axios'


import S3FileUpload from 'react-s3';
import { uploadFile } from 'react-s3';


const config = {
    bucketName: 'globelynx-experts-images',
    dirName:'public',
    region: 'eu-west-1',
    accessKeyId: 'AKIAWB4BSDQGH7HMKFFM',
    secretAccessKey: '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',
}

export default class AddModalExperts extends React.Component {
  constructor(props) {
    super(props)

 this.state = {
      file: '',
      filelogo: '',
      imagePreviewUrl: '',
      imagePreviewUrlLogo:'',
      ok1: false,
      ok2: false
    };

    this.closeExpertsModal = this.closeExpertsModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
   this.changeProfile = this.changeProfile.bind(this)
  this.changeLogo = this.changeLogo.bind(this)

  }

changeProfile(e){
 e.preventDefault();
    let reader = new FileReader();
    let file  = e.target.files[0];


    reader.onloadend = () => {
    this.setState({
      file: file,
       imagePreviewUrl: reader.result,
        'Profile Image': file.name
      });
    }
    reader.readAsDataURL(file)
     S3FileUpload
        .uploadFile(file, config)
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

changeLogo(e){
 e.preventDefault();
    let reader = new FileReader();
    let file  = e.target.files[0];

    reader.onloadend = () => {
    this.setState({
      filelogo: file,
       imagePreviewUrlLogo: reader.result,
       Logo: file.name
      });
    }
    reader.readAsDataURL(file)
  S3FileUpload
      .uploadFile(file, config)
      .then(data => console.log(data))
        .catch(err => console.log(err))
}

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  closeExpertsModal() {
    var modal = document.querySelector('#addModal')
    modal.style.display = 'none'
  }




  handleSubmit(e){
    e.preventDefault();

      var lastIDUID = this.props.lastId + 1;
       let path = this.state.Name.replace(/\s+/g, '-').toLowerCase()

         if (this.state.Name === '') {
          this.state.Name = 'no data'
        }
        if (this.state['Address 1'] === '') {
          this.state['Address 1'] = 'no data'
        }
        if (this.state['Address 2'] === '') {
          this.state['Address 2'] = 'no data'
        }
        if (this.state.Bio === '') {
          this.state.Bio = 'no data'
        }
        if (this.state.Company === '') {
          this.state.Company = 'no data'
        }
        if (this.state.Country === '') {
          this.state.Country = 'no data'
        }
        if (this.state['Destination E-mail'] === '') {
          this.state['Destination E-mail'] = 'no data'
        }
        if (this.state['Encoder ID(s)'] === '') {
          this.state['Encoder ID(s)'] = 'no data'
        }
        if (this.state['Expert Email'] === '') {
          this.state['Expert Email'] = 'no data'
        }
        if (this.state['Full Subject Field'] === '') {
          this.state['Full Subject Field'] = 'no data'
        }
        if (this.state['Gallery Images'] === '') {
          this.state['Gallery Images'] = 'no data'
        }
        if (this.state['HD/SD'] === '') {
          this.state['HD/SD'] = 'no data'
        }
        if (this.state['Interviewee Detail'] === '') {
          this.state['Interviewee Detail'] = 'no data'
        }
        if (this.state['Job Title'] === '') {
          this.state['Job Title'] = 'no data'
        }
        if (this.state.Languages === '') {
          this.state.Languages = 'no data'
        }
        if (this.state.Postcode === '') {
          this.state.Postcode = 'no data'
        }
        if (this.state['Press Office Email'] === '') {
          this.state['Press Office Email'] = 'no data'
        }
        if (this.state['Profile Image'] === '') {
          this.state['Profile Image'] = 'no data'
        }
        if (this.state.Sector === '') {
          this.state.Sector = 'no data'
        }
        if (this.state['Service ID'] === '') {
          this.state['Service ID'] = 'no data'
        }
        if (this.state['Subject Line'] === '') {
          this.state['Subject Line'] = 'no data'
        }
        if (this.state.Subjects === '') {
          this.state.Subjects = 'no data'
        }
        if (this.state['Telephone 1'] === '') {
          this.state['Telephone 1'] = 'no data'
        }
        if (this.state['Telephone 2'] === '') {
          this.state['Telephone 2'] = 'no data'
        }
        if (this.state.Town === '') {
          this.state.Town = 'no data'
        }
        if (this.state.Videos === '') {
          this.state.Videos = 'no data'
        }
        if (this.state.Logo === '') {
          this.state.Logo = 'no data'
        }

         if (this.state.Path === '' || this.state.Path === undefined ) {
          this.state.Path = path
        }


         axios
          .post(
            'https://search-experts-ayuwtxztr5pvnas52cxmrjbdkm.eu-west-1.es.amazonaws.com/experts/_doc/',
            {
              Name: this.state.Name,
              'Address 1': this.state['Address 1'],
              'Address 2': this.state['Address 2'],
              Bio: this.state.Bio,
              Company: this.state.Company,
              Country: this.state.Country,
              'Destination E-mail': this.state['Destination E-mail'],
              'Encoder ID(s)': this.state['Encoder ID(s)'],
              'Expert Email': this.state['Expert Email'],
              'Full Subject Field': this.state['Full Subject Field'],
              'Gallery Images': this.state['Gallery Images'],
              'HD/SD': this.state['HD/SD'],
              'Interviewee Detail': this.state['Interviewee Detail'],
              'Job Title': this.state['Job Title'],
              Languages: this.state.Languages,
              Postcode: this.state.Postcode,
              'Press Office Email': this.state['Press Office Email'],
              'Profile Image': this.state['Profile Image'],
              Sector: this.state.Sector,
              'Service ID': this.state['Service ID'],
              'Subject Line': this.state['Subject Line'],
              Subjects: this.state.Subjects,
              'Telephone 1': this.state['Telephone 1'],
              'Telephone 2': this.state['Telephone 2'],
              Town: this.state.Town,
              Path: this.state.Path,
              Videos: this.state.Videos,
              Logo: this.state.Logo,
              UID: lastIDUID,
            }
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
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
     $imagePreview = (<img src={imagePreviewUrl} style={{height:'150px', width:'150px'}} />);
    }

    let {imagePreviewUrlLogo} = this.state;
    let $imagePreviewLogo = null;
    if (imagePreviewUrlLogo) {
     $imagePreviewLogo = (<img src={imagePreviewUrlLogo} style={{height:'150px', width:'150px'}} />);
    }

    return (
      <div id="addModal" className="modal-dashboard">
          <div className="modal-content-dashboard">
            <div className="modal-header-dashboard">
              <span
                onClick={this.closeExpertsModal}
                className="close-modal-dashboard"
              >
                &times;
              </span>
              <h5>Add Experts {this.props.lastId}</h5>
            </div>
            <form onSubmit={this.handleSubmit}>
            <div className="modal-body-dashboard">
              <div className="container-fluid">
                <div className="row">
                  <div className="six columns" style={{ textAlign: 'center' }}>
                    <label id="InputFileUploaderbb"> Select Your Profile Image
                      <input type="file" onChange={this.changeProfile} ref={(ref) => { this.uploadInputProfile = ref; }}   />
                    </label> 
                   {$imagePreview}
                   {/*<button onClick={this.handleUpload}>Upload</button>*/}
                  </div>
                  <div className="six columns" style={{ textAlign: 'center' }}>
                    <label id="InputFileUploaderbb"> Enter Your Logo
                      <input type="file"  onChange={this.changeLogo} ref={(ref) => { this.uploadInputLogo = ref; }}   />
                    </label>
                    {$imagePreviewLogo}
                      {/*<button onClick={this.handleUpload}>Upload</button>*/}
                  </div>
                  <div
                    className="twelve columns"
                    style={{ textAlign: 'center' }}
                  >
                    
                  </div>
                  <div className="six columns">
                    <label>Name</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Name"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="six columns">
                    <label>Company</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Company"
                      onChange={this.handleChange}
                    />
                  </div>
                   <div className="six columns">
                    <label>Job Title</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Job Title"
                      onChange={this.handleChange}
                    />
                  </div>
                       <div className="six columns">
                  <label>Languages</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Languages"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="six columns">
                    <label>Address 1</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Address 1"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="six columns">
                    <label>Address 2</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Address 2"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="six columns">
                    <label>Country</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Country"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="six columns">
                    <label>Town</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Town"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="six columns">
                    <label>Destination E-mail</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Destination E-mail"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="six columns">
                    <label>Press Office Email</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Press Office Email"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="six columns">
                    <label>Expert Email</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Expert Email"
                      onChange={this.handleChange}
                    />
                  </div>
             
                  <div className="six columns">
                    <label>Subjects/Topics</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Subjects"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="six columns">
                    <label>Telephone 1</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Telephone 1"
                      onChange={this.handleChange}
                    />
                  </div>
                     <div className="six columns">
                    <label>Telephone 2</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Telephone 2"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="six columns">
                    <label>Bio</label>
                    <textarea
                      className="u-full-width"
                      name="Bio"
                      row={8}
                      onChange={this.handleChange}
                    />
                  </div>

                 <div className="six columns">
                    <label>Path (URL)</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Path"
                      onChange={this.handleChange}
                    />
                  </div>

                </div>
              </div>
            </div>
            <div className="modal-footer-dashboard">
              <button className="button btn-dashboard is-dark" type="submit">
                <i className="fa fa-edit" /> Save
              </button>
            </div>
            </form>
          </div>
      </div>
    )
  }
}
