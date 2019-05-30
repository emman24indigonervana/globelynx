import React from 'react'
import axios from 'axios'

import companyDefaultLogo from '../../img/company-default.jpg'
import defaultProfile from '../../img/default-profile.png'

import S3FileUpload from 'react-s3';
import { uploadFile } from 'react-s3';


const config = {
    bucketName: 'globelynx-experts-images',
    dirName:'public',
    region: 'eu-west-1',
    accessKeyId: 'AKIAWB4BSDQGH7HMKFFM',
    secretAccessKey: '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',
}


export default class EditModalExperts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      file: '',
      filelogo: '',
      imagePreviewUrl: '',
      imagePreviewUrlLogo:'',
      'Profile Image': '',
      Logo: '',
      ok1: false,
      ok2: false
    }

    this.closeExpertsModal = this.closeExpertsModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeEditProfile = this.changeEditProfile.bind(this)
    this.changeEditLogo = this.changeEditLogo.bind(this)

    console.log(this.props)
  }

  handleChange(e) {
    this.props.edited_data[e.target.name] = e.target.value
    this.setState({
      [e.target.name]: e.target.value,
      employer_id: this.props.user_id,
    })
  }

changeEditProfile(e){
  e.preventDefault();

  document.querySelector('#previewprofile').style.display = 'none';

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
        .catch(err =>  console.log(err))
}

changeEditLogo(e) {
  e.preventDefault();
   document.querySelector('#previewlogo').style.display = 'none';

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
      .catch(err =>  console.log(err))
}


  handleSubmit(e) {
    e.preventDefault()

    var id = this.props.edited_id

    var logo = '';
    var profile_img = '';
    let path = this.props.edited_data.Name.replace(/\s+/g, '-').toLowerCase()




     if (this.state.Logo === '') {
      logo = this.props.edited_data.Logo
    }else{
      logo = this.state.Logo
    }

      if (this.state['Profile Image'] === '') {
      profile_img = this.props.edited_data['Profile Image']
    }else{ 
       profile_img = this.state['Profile Image']
    }

    if (this.props.edited_data.Name === '') {
      this.props.edited_data.Name = 'no data'
    }
    if (this.props.edited_data['Address 1'] === '') {
      this.props.edited_data['Address 1'] = 'no data'
    }
    if (this.props.edited_data['Address 2'] === '') {
      this.props.edited_data['Address 2'] = 'no data'
    }
    if (this.props.edited_data.Bio === '') {
      this.props.edited_data.Bio = 'no data'
    }
    if (this.props.edited_data.Company === '') {
      this.props.edited_data.Company = 'no data'
    }
    if (this.props.edited_data.Country === '') {
      this.props.edited_data.Country = 'no data'
    }
    if (this.props.edited_data['Destination E-mail'] === '') {
      this.props.edited_data['Destination E-mail'] = 'no data'
    }
    if (this.props.edited_data['Encoder ID(s)'] === '') {
      this.props.edited_data['Encoder ID(s)'] = 'no data'
    }
    if (this.props.edited_data['Expert Email'] === '') {
      this.props.edited_data['Expert Email'] = 'no data'
    }
    if (this.props.edited_data['Full Subject Field'] === '') {
      this.props.edited_data['Full Subject Field'] = 'no data'
    }
    if (this.props.edited_data['Gallery Images'] === '') {
      this.props.edited_data['Gallery Images'] = 'no data'
    }
    if (this.props.edited_data['HD/SD'] === '') {
      this.props.edited_data['HD/SD'] = 'no data'
    }
    if (this.props.edited_data['Interviewee Detail'] === '') {
      this.props.edited_data['Interviewee Detail'] = 'no data'
    }
    if (this.props.edited_data['Job Title'] === '') {
      this.props.edited_data['Job Title'] = 'no data'
    }
    if (this.props.edited_data.Languages === '') {
      this.props.edited_data.Languages = 'no data'
    }
    if (this.props.edited_data.Postcode === '') {
      this.props.edited_data.Postcode = 'no data'
    }
    if (this.props.edited_data['Press Office Email'] === '') {
      this.props.edited_data['Press Office Email'] = 'no data'
    }
    if (this.props.edited_data['Profile Image'] === '') {
      this.props.edited_data['Profile Image'] = 'no data'
    }
    if (this.props.edited_data.Sector === '') {
      this.props.edited_data.Sector = 'no data'
    }
    if (this.props.edited_data['Service ID'] === '') {
      this.props.edited_data['Service ID'] = 'no data'
    }
    if (this.props.edited_data['Subject Line'] === '') {
      this.props.edited_data['Subject Line'] = 'no data'
    }
    if (this.props.edited_data.Subjects === '') {
      this.props.edited_data.Subjects = 'no data'
    }
    if (this.props.edited_data['Telephone 1'] === '') {
      this.props.edited_data['Telephone 1'] = 'no data'
    }
    if (this.props.edited_data['Telephone 2'] === '') {
      this.props.edited_data['Telephone 2'] = 'no data'
    }
    if (this.props.edited_data.Town === '') {
      this.props.edited_data.Town = 'no data'
    }
    if (this.props.edited_data.Videos === '') {
      this.props.edited_data.Videos = 'no data'
    }
    if (this.props.edited_data.Path === undefined || this.props.edited_data.Path === "") {
      this.props.edited_data.Path = path;
    }
    // if (this.props.edited_data.Logo === '') {
    //   this.props.edited_data.Logo = 'no data'
    // }

    axios
      .post(
        'https://search-experts-ayuwtxztr5pvnas52cxmrjbdkm.eu-west-1.es.amazonaws.com/experts/_doc/' +
          id,
        {
          Name: this.props.edited_data.Name,
          'Address 1': this.props.edited_data['Address 1'],
          'Address 2': this.props.edited_data['Address 2'],
          Bio: this.props.edited_data.Bio,
          Company: this.props.edited_data.Company,
          Country: this.props.edited_data.Country,
          'Destination E-mail': this.props.edited_data['Destination E-mail'],
          'Encoder ID(s)': this.props.edited_data['Encoder ID(s)'],
          'Expert Email': this.props.edited_data['Expert Email'],
          'Full Subject Field': this.props.edited_data['Full Subject Field'],
          'Gallery Images': this.props.edited_data['Gallery Images'],
          'HD/SD': this.props.edited_data['HD/SD'],
          'Interviewee Detail': this.props.edited_data['Interviewee Detail'],
          'Job Title': this.props.edited_data['Job Title'],
          Languages: this.props.edited_data.Languages,
          Postcode: this.props.edited_data.Postcode,
          'Press Office Email': this.props.edited_data['Press Office Email'],
          'Profile Image': profile_img,
          Sector: this.props.edited_data.Sector,
          'Service ID': this.props.edited_data['Service ID'],
          'Subject Line': this.props.edited_data['Subject Line'],
          Subjects: this.props.edited_data.Subjects,
          'Telephone 1': this.props.edited_data['Telephone 1'],
          'Telephone 2': this.props.edited_data['Telephone 2'],
          Path: this.props.edited_data.Path,
          Town: this.props.edited_data.Town,
          Videos: this.props.edited_data.Videos,
          Logo: logo,
          UID: this.props.edited_data.UID,
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

    // {"Name": "Nick Nelson","Address 1": "no data","Address 2": "This is a test","Bio": "Nick Nelson covers European Equities","Company": "UBS Wealth Management (London)","Country": "no data","Destination E-mail": "no data","Encoder ID(s)": "no data","Expert Email": "no data","Full Subject Field": "Nick%20Nelson%20","Gallery Images": "no data","HD/SD": "no data","Interviewee Detail": "no data","Job Title": "Head of European Equity Strategy","Languages": "English","Postcode": "no data","Press Office Email": "chloe.evemy@ubs.com & huw.williams@ubs.com","Profile Image": "nelson.jpeg?itok=gISqJuKX","Sector": "Finance","Service ID": "no data","Subject Line": "no data","Subjects": " European Equities","Telephone 1": "no data","Telephone 2": "+44 (0)207 567 4714","Town": "no data","Videos": "no data","Logo": "UBS%20logo_0.jpg?itok=R0gWEiDp","UID": 0}

    // const id =  this.props.edited_data.id;
    //   delete this.props.edited_data['id'];
    //   axios.put(`/api/editApplicants/${id}`,
    //     this.props.edited_data,
    //   {
    //     headers: { 'Content-Type': 'application/json' }
    //   }).then(function (response) {
    //     console.log(response);
    //     document.querySelector('#closeModal').click();
    //     window.location.reload();
    //   }).catch(function (error) {
    //     console.log(error);
    //   });
  }

  closeExpertsModal() {
    var modal = document.querySelector('#editModal')
    modal.style.display = 'none'
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
      <div id="editModal" className="modal-dashboard">
        <form method="post" onSubmit={this.handleSubmit}>
          <div className="modal-content-dashboard">
            <div className="modal-header-dashboard">
              <span
                onClick={this.closeExpertsModal}
                className="close-modal-dashboard"
              >
                &times;
              </span>
              <h5>Edit Experts</h5>
            </div>
            <div className="modal-body-dashboard">
              <div className="container-fluid">
                <div className="row">
                  <div
                    className="six columns"
                    style={{ textAlign: 'center' }}
                  >
                    <label id="InputFileUploaderbb"> Edit Profile Image
                      <input type="file" onChange={this.changeEditProfile} />
                    </label> 
                    {$imagePreview}
                      <img id="previewprofile"  style={{height:'150px', width:'150px'}} src={`https://s3-eu-west-1.amazonaws.com/globelynx-experts-images/public/${this.props.edited_data['Profile Image']}`}  onError={e => {
                                e.target.onerror = null
                                e.target.src = defaultProfile
                              }}/>
                  </div>
                  
                  <div
                    className="six columns"
                    style={{ textAlign: 'center' }}
                  >
                    <label id="InputFileUploaderbb"> Edit Company Logo
                      <input type="file" onChange={this.changeEditLogo} />
                    </label> 
                     {$imagePreviewLogo}
                     <img id="previewlogo"  style={{height:'150px', width:'150px'}} src={`https://s3-eu-west-1.amazonaws.com/globelynx-experts-images/public/${this.props.edited_data.Logo}`} 
                      onError={e => {
                                e.target.onerror = null
                                e.target.src = companyDefaultLogo
                              }}/>
                  </div>
                  <div className="six columns">
                    <label>Name</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Name"
                      onChange={this.handleChange}
                      value={this.props.edited_data.Name}
                    />
                  </div>
                  <div className="six columns">
                    <label>Company</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Company"
                      onChange={this.handleChange}
                      value={this.props.edited_data.Company}
                    />
                  </div>
                 <div className="six columns">
                    <label>Job Title</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Job Title"
                      onChange={this.handleChange}
                      value={this.props.edited_data['Job Title']}
                    />
                  </div>
                 <div className="six columns">
                  <label>Languages</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Languages"
                      onChange={this.handleChange}
                      value={this.props.edited_data.Languages}
                    />
                  </div>
                  <div className="six columns">
                    <label>Address 1</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Address 1"
                      onChange={this.handleChange}
                      value={this.props.edited_data['Address 1']}
                    />
                  </div>
                  <div className="six columns">
                    <label>Address 2</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Address 2"
                      onChange={this.handleChange}
                      value={this.props.edited_data['Address 2']}
                    />
                  </div>
                  <div className="six columns">
                    <label>Country</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Country"
                      onChange={this.handleChange}
                      value={this.props.edited_data.Country}
                    />
                  </div>
                  <div className="six columns">
                    <label>Town</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Town"
                      onChange={this.handleChange}
                      value={this.props.edited_data.Town}
                    />
                  </div>
                  <div className="six columns">
                    <label>Destination E-mail</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Destination E-mail"
                      onChange={this.handleChange}
                      value={this.props.edited_data['Destination E-mail']}
                    />
                  </div>
                  <div className="six columns">
                    <label>Press Office Email</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Press Office Email"
                      onChange={this.handleChange}
                      value={this.props.edited_data['Press Office Email']}
                    />
                  </div>
                  <div className="six columns">
                    <label>Expert Email</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Expert Email"
                      onChange={this.handleChange}
                      value={this.props.edited_data['Expert Email']}
                    />
                  </div>
                  <div className="six columns">
                    <label>Subjects/Topics</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Subjects"
                      onChange={this.handleChange}
                      value={this.props.edited_data['Subjects']}
                    />
                  </div>

                  <div className="six columns">
                    <label>Telephone 1</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Telephone 1"
                      onChange={this.handleChange}
                      value={this.props.edited_data['Telephone 1']}
                    />
                  </div>
                     <div className="six columns">
                    <label>Telephone 2</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Telephone 2"
                      onChange={this.handleChange}
                      value={this.props.edited_data['Telephone 2']}
                    />
                  </div>


                  <div className="six columns">
                    <label>Bio</label>
                    <textarea
                      className="u-full-width"
                      name="Bio"
                      rows={8}
                      onChange={this.handleChange}
                      value={this.props.edited_data['Bio']}
                    />
                  </div>

                 <div className="six columns">
                    <label>Path (URL)</label>
                    <input
                      className="u-full-width"
                      type="text"
                      name="Path"
                      onChange={this.handleChange}
                      value={this.props.edited_data.Path}
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
          </div>
        </form>
      </div>
    )
  }
}
